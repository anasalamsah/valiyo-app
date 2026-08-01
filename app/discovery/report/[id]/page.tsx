import { ReportView } from "@/components/discovery/ReportView";

export default async function DiscoveryReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ReportView id={id} />;
}
