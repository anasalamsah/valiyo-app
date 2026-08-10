import { pdf } from "@react-pdf/renderer";
import { deleteObject, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { requireFirebaseStorage } from "@/lib/firebase/storage";
import { DiscoveryReportPdf } from "@/components/discovery/pdf/DiscoveryReportPdf";
import type { DiscoveryAssessment } from "@/types/discoveryAssessment";

function formatAssessmentDate(report: DiscoveryAssessment): string {
  const millis = report.completedAt?.toMillis?.();
  const date = millis ? new Date(millis) : new Date();
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Races a promise against a timeout so a hang surfaces as a clear,
 * catchable error instead of leaving a caller (here: the download button)
 * stuck in a loading state forever with nothing in the UI to explain why.
 */
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`${label} tidak selesai dalam ${ms / 1000} detik. Coba lagi.`)),
      ms
    );
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

/**
 * Renders the report to a PDF blob (client-side, via @react-pdf/renderer),
 * uploads it to Firebase Storage at discovery-reports/{uid}/{reportId}.pdf,
 * and returns the download URL. Does NOT write the URL back to Firestore —
 * callers persist it via lib/firestore/discovery.ts's savePdfUrl() so this
 * function stays focused on the PDF/Storage half only.
 *
 * `requireFirebaseStorage()` runs FIRST, before the (slower) PDF render —
 * previously it ran only right before the upload, so a missing/misconfigured
 * Storage bucket wouldn't surface until after paying the full render cost,
 * and if the render itself ever hung, that config problem would never even
 * be reached. Failing fast here means a config issue is reported
 * immediately rather than being masked by render time.
 */
export async function generateAndUploadDiscoveryPdf(report: DiscoveryAssessment): Promise<string> {
  const storage = requireFirebaseStorage();

  const dateLabel = formatAssessmentDate(report);
  const blob = await withTimeout(
    pdf(<DiscoveryReportPdf report={report} assessmentDateLabel={dateLabel} />).toBlob(),
    25000,
    "Pembuatan PDF"
  );

  const fileRef = ref(storage, `discovery-reports/${report.uid}/${report.id}.pdf`);
  await withTimeout(
    uploadBytes(fileRef, blob, { contentType: "application/pdf" }),
    25000,
    "Unggah PDF"
  );

  return getDownloadURL(fileRef);
}

/**
 * Removes a report's generated PDF from Storage, e.g. when the report
 * itself is deleted (see History → Delete). Safe to call even if no PDF
 * was ever generated for this report — a "not found" failure is ignored
 * rather than thrown, since there's nothing to clean up in that case.
 */
export async function deleteDiscoveryPdf(uid: string, reportId: string): Promise<void> {
  const storage = requireFirebaseStorage();
  const fileRef = ref(storage, `discovery-reports/${uid}/${reportId}.pdf`);
  try {
    await deleteObject(fileRef);
  } catch (err) {
    console.error("Failed to delete discovery PDF (non-fatal):", err);
  }
}
