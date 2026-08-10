import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { RadarChartSvg } from "@/components/discovery/pdf/RadarChartSvg";
import type { DiscoveryAssessment } from "@/types/discoveryAssessment";

const COLORS = {
  primary: "#5b3df5",
  secondary: "#ffd447",
  accent: "#63d5c7",
  bg: "#fffbf2",
  text: "#272640",
  muted: "#6b6a85",
  border: "#ece6d8",
};

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    color: COLORS.text,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    paddingBottom: 14,
    borderBottom: `1.5pt solid ${COLORS.primary}`,
  },
  brand: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
  },
  brandSub: {
    fontSize: 8,
    color: COLORS.muted,
  },
  childName: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
  },
  childMeta: {
    fontSize: 9,
    color: COLORS.muted,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
    marginTop: 16,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  paragraph: {
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  card: {
    backgroundColor: "#fbf9f3",
    border: `0.75pt solid ${COLORS.border}`,
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
  },
  cardBody: {
    fontSize: 8.5,
    color: COLORS.muted,
    marginTop: 2,
    lineHeight: 1.4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  scoreTable: {
    flex: 1,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2.5,
    borderBottom: `0.5pt solid ${COLORS.border}`,
  },
  bullet: {
    fontSize: 9.5,
    lineHeight: 1.5,
    marginBottom: 3,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 36,
    right: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.5,
    color: COLORS.muted,
    borderTop: `0.5pt solid ${COLORS.border}`,
    paddingTop: 6,
  },
});

function Footer({ pageLabel }: { pageLabel: string }) {
  return (
    <View style={styles.footer} fixed>
      <Text>Valiyo Discovery — Laporan Penilaian Perkembangan Anak</Text>
      <Text
        render={({ pageNumber, totalPages }) => `${pageLabel} · Hal ${pageNumber}/${totalPages}`}
      />
    </View>
  );
}

export function DiscoveryReportPdf({
  report,
  assessmentDateLabel,
}: {
  report: DiscoveryAssessment;
  assessmentDateLabel: string;
}) {
  const child = report.childProfileSnapshot;
  const sortedScores = [...(report.radarData ?? [])].sort((a, b) => b.score - a.score);

  return (
    <Document title={`Laporan Discovery - ${child?.name ?? "Anak"}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>Valiyo Discovery</Text>
            <Text style={styles.brandSub}>Laporan Penilaian Perkembangan Anak</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.childName}>{child?.name ?? "Anak"}</Text>
            <Text style={styles.childMeta}>
              {child?.age} tahun · {child?.school}
              {child?.className ? ` · ${child.className}` : ""}
            </Text>
            <Text style={styles.childMeta}>Tanggal Penilaian: {assessmentDateLabel}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ringkasan</Text>
        <Text style={styles.paragraph}>{report.aiSummary}</Text>

        <Text style={styles.sectionTitle}>Peta Domain Perkembangan</Text>
        <View style={styles.radarRow}>
          <RadarChartSvg data={report.radarData ?? []} />
          <View style={styles.scoreTable}>
            {sortedScores.map((d, i) => (
              <View key={i} style={styles.scoreRow}>
                <Text>{d.subject}</Text>
                <Text style={{ fontFamily: "Helvetica-Bold", color: COLORS.primary }}>
                  {d.score}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Footer pageLabel={child?.name ?? "Laporan"} />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Kekuatan Utama</Text>
        {report.topStrengths?.map((s, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.cardTitle}>{s.title}</Text>
              <Text style={{ fontFamily: "Helvetica-Bold", color: COLORS.accent }}>{s.score}</Text>
            </View>
            <Text style={styles.cardBody}>{s.description}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Area yang Perlu Dikembangkan</Text>
        {report.skillsToDevelop?.map((s, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardTitle}>{s.title}</Text>
            <Text style={styles.cardBody}>{s.guidance}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Rekomendasi Aktivitas</Text>
        {report.recommendedActivities?.map((a, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardTitle}>{a.title}</Text>
            <Text style={styles.cardBody}>{a.description}</Text>
          </View>
        ))}

        <Footer pageLabel={child?.name ?? "Laporan"} />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>10 Aktivitas Edukatif di Rumah</Text>
        {report.homeActivities?.map((a, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardTitle}>{a.title}</Text>
            <Text style={styles.cardBody}>Bahan: {a.itemNeeded}</Text>
            <Text style={styles.cardBody}>{a.instruction}</Text>
          </View>
        ))}

        <Footer pageLabel={child?.name ?? "Laporan"} />
      </Page>

      {report.roadmap && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Peta Jalan 90 Hari Pertama</Text>

          {report.roadmap.phase1ThisWeek && (
            <>
              <Text style={styles.cardTitle}>
                Minggu Ini: {report.roadmap.phase1ThisWeek.goal}
              </Text>
              {(report.roadmap.phase1ThisWeek.actions ?? []).map((action, i) => (
                <Text key={i} style={styles.bullet}>
                  • {action}
                </Text>
              ))}
            </>
          )}

          {report.roadmap.phase2Month1To3 && (
            <>
              <Text style={[styles.cardTitle, { marginTop: 10 }]}>
                Bulan 1-3: {report.roadmap.phase2Month1To3.goal}
              </Text>
              {(report.roadmap.phase2Month1To3.activities ?? []).map((item, i) => (
                <View key={i} style={styles.card}>
                  <Text style={styles.cardTitle}>{item.activity}</Text>
                  <Text style={styles.cardBody}>{item.why}</Text>
                </View>
              ))}
            </>
          )}

          {report.roadmap.aiInsight && (
            <>
              <Text style={styles.sectionTitle}>Kesimpulan AI</Text>
              <Text style={styles.paragraph}>{report.roadmap.aiInsight.summaryText}</Text>
            </>
          )}

          <Footer pageLabel={child?.name ?? "Laporan"} />
        </Page>
      )}
    </Document>
  );
}
