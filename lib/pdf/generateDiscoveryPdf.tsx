import { pdf } from "@react-pdf/renderer";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { requireFirebaseStorage } from "@/lib/firebase/storage";
import { DiscoveryReportPdf } from "@/components/discovery/pdf/DiscoveryReportPdf";
import type { DiscoveryAssessment } from "@/types/discoveryAssessment";

function formatAssessmentDate(report: DiscoveryAssessment): string {
  const millis = report.completedAt?.toMillis?.();
  const date = millis ? new Date(millis) : new Date();
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Renders the report to a PDF blob (client-side, via @react-pdf/renderer),
 * uploads it to Firebase Storage at discovery-reports/{uid}/{reportId}.pdf,
 * and returns the download URL. Does NOT write the URL back to Firestore —
 * callers persist it via lib/firestore/discovery.ts's savePdfUrl() so this
 * function stays focused on the PDF/Storage half only.
 */
export async function generateAndUploadDiscoveryPdf(report: DiscoveryAssessment): Promise<string> {
  const dateLabel = formatAssessmentDate(report);
  const blob = await pdf(
    <DiscoveryReportPdf report={report} assessmentDateLabel={dateLabel} />
  ).toBlob();

  const storage = requireFirebaseStorage();
  const fileRef = ref(storage, `discovery-reports/${report.uid}/${report.id}.pdf`);
  await uploadBytes(fileRef, blob, { contentType: "application/pdf" });

  return getDownloadURL(fileRef);
}
