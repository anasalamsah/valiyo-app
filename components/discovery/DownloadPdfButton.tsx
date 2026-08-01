"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { generateAndUploadDiscoveryPdf } from "@/lib/pdf/generateDiscoveryPdf";
import { savePdfUrl } from "@/lib/firestore/discovery";
import type { DiscoveryAssessment } from "@/types/discoveryAssessment";

/**
 * Generates the PDF once and reuses it on subsequent visits — if
 * `report.pdfUrl` is already set, this just opens that existing file
 * instead of re-rendering and re-uploading a new one every click.
 */
export function DownloadPdfButton({ report }: { report: DiscoveryAssessment }) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState(report.pdfUrl);

  async function handleClick() {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
      return;
    }

    setGenerating(true);
    setError(null);
    try {
      const url = await generateAndUploadDiscoveryPdf(report);
      await savePdfUrl(report.id, url);
      setPdfUrl(url);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal membuat PDF.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-1 sm:items-end">
      <button
        type="button"
        onClick={handleClick}
        disabled={generating}
        className="no-print inline-flex items-center justify-center gap-2 self-start rounded-pill bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {generating ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
        {generating ? "Membuat PDF…" : pdfUrl ? "Download PDF" : "Buat PDF"}
      </button>
      {error && <p className="no-print text-xs text-red-500">{error}</p>}
    </div>
  );
}
