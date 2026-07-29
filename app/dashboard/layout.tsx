import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RouteGuard } from "@/components/auth/RouteGuard";

export const metadata: Metadata = {
  title: "Dashboard — Valiyo",
  description: "Your family's Valiyo learning and discovery journey.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <RouteGuard>{children}</RouteGuard>
      </main>
      <Footer />
    </div>
  );
}
