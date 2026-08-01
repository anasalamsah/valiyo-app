"use client";

import { useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Printer, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { useAsyncData } from "@/lib/hooks/useAsyncData";
import { getAssessmentById } from "@/lib/firestore/discovery";
import { RadarChartCard } from "@/components/discovery/report/RadarChartCard";
import { DomainBarChart } from "@/components/discovery/report/DomainBarChart";
import { ReadinessCards } from "@/components/discovery/report/ReadinessCards";
import { LearningStyleCard } from "@/components/discovery/report/LearningStyleCard";
import { ActivitiesSection } from "@/components/discovery/report/ActivitiesSection";
import { NextStepsSection } from "@/components/discovery/report/NextStepsSection";
import { RoadmapSection, AiGrowthInsight } from "@/components/discovery/report/RoadmapSection";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function Section({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}

export function ReportView({ id }: { id: string }) {
  const fetcher = useCallback(() => getAssessmentById(id), [id]);
  const { data: report, loading, error } = useAsyncData(fetcher, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-32 animate-pulse rounded-[28px] bg-surface" />
        <div className="h-96 animate-pulse rounded-[28px] bg-surface" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="rounded-[28px] bg-surface p-7 text-center shadow-sm shadow-black/5">
        <p className="text-sm text-red-500">{error ?? "Laporan tidak ditemukan."}</p>
        <Link
          href="/dashboard"
          className="mt-4 inline-block text-sm font-semibold text-primary hover:text-primary-hover"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div id="discovery-report" className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 rounded-[28px] bg-grow-bg p-7 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            Laporan Discovery
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-text sm:text-3xl">
            {report.childProfileSnapshot?.name ?? "Anak"}
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Usia {report.childProfileSnapshot?.age} tahun · {report.childProfileSnapshot?.school}
            {report.childProfileSnapshot?.className ? ` · ${report.childProfileSnapshot.className}` : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="no-print inline-flex items-center justify-center gap-2 self-start rounded-pill border border-primary/30 bg-surface px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
        >
          <Printer size={14} /> Cetak / Simpan PDF
        </button>
      </motion.div>

      {/* Warm opening summary */}
      <Section delay={0.05}>
        <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles size={16} />
            <p className="text-xs font-bold uppercase tracking-wider">Ringkasan AI</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text">{report.aiSummary}</p>
        </div>
      </Section>

      {/* 1. Gaya belajar utama */}
      {report.learningStyle && (
        <Section>
          <LearningStyleCard style={report.learningStyle} />
        </Section>
      )}

      {/* 2. Visualisasi pemetaan radar domain kecerdasan */}
      {report.radarData?.length > 0 && (
        <Section delay={0.05}>
          <RadarChartCard data={report.radarData} />
        </Section>
      )}

      {/* Extra chart: ranked bar view of the same 18 domains */}
      {report.radarData?.length > 0 && (
        <Section delay={0.1}>
          <DomainBarChart data={report.radarData} />
        </Section>
      )}

      {/* 3. Kesiapan talent & domain khusus */}
      <Section>
        <ReadinessCards
          readiness={{
            olympiadReadiness: report.olympiadReadiness,
            codingReadiness: report.codingReadiness,
            creativityPotential: report.creativityPotential,
            scienceCuriosity: report.scienceCuriosity,
            mathematicalThinking: report.mathematicalThinking,
            languageDevelopment: report.languageDevelopment,
          }}
        />
      </Section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section>
          <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
            <div className="flex items-center gap-2 text-accent">
              <TrendingUp size={16} />
              <p className="text-xs font-bold uppercase tracking-wider">Kekuatan Utama</p>
            </div>
            <ul className="mt-3 space-y-3">
              {report.topStrengths?.map((s, i) => (
                <li key={i} className="rounded-2xl border border-border bg-bg px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-text">{s.title}</p>
                    <span className="text-xs font-semibold text-accent">{s.score}</span>
                  </div>
                  <p className="mt-1 text-xs text-text-muted">{s.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section delay={0.05}>
          <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
            <div className="flex items-center gap-2 text-secondary">
              <TrendingDown size={16} />
              <p className="text-xs font-bold uppercase tracking-wider">Area Bertumbuh</p>
            </div>
            <ul className="mt-3 space-y-3">
              {report.skillsToDevelop?.map((s, i) => (
                <li key={i} className="rounded-2xl border border-border bg-bg px-4 py-3">
                  <p className="text-sm font-semibold text-text">{s.title}</p>
                  <p className="mt-1 text-xs text-text-muted">{s.guidance}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </div>

      {/* 4-7. Aktivitas terarah, akademi, aktivitas rumah, kolaborasi guru */}
      <Section>
        <ActivitiesSection
          recommendedActivities={report.recommendedActivities}
          homeActivities={report.homeActivities}
          schoolRecommendations={report.schoolRecommendations}
          suggestedAcademy={report.suggestedAcademy}
          teacherTips={report.teacherTips}
        />
      </Section>

      {/* 8-9. Target eksplorasi bulan depan & tips parenting */}
      <Section>
        <NextStepsSection nextMonthGoals={report.nextMonthGoals} parentTips={report.parentTips} />
      </Section>

      {/* 10-11. Personalized Growth Strategy — peta jalan 6 bulan + quick wins */}
      {report.roadmap && (
        <>
          <Section>
            <RoadmapSection roadmap={report.roadmap} />
          </Section>

          {/* 12. AI Growth Insight & Kesimpulan (penutup) */}
          <Section>
            <AiGrowthInsight roadmap={report.roadmap} />
          </Section>
        </>
      )}

      <Link
        href="/dashboard"
        className="no-print inline-block text-sm font-semibold text-primary hover:text-primary-hover"
      >
        ← Kembali ke Dashboard
      </Link>
    </div>
  );
}
