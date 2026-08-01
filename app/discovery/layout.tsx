import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RouteGuard } from "@/components/auth/RouteGuard";

export const metadata: Metadata = {
  title: "Discovery — Valiyo",
  description: "Kenali kekuatan dan gaya belajar unik anak Anda.",
};

export default function DiscoveryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="no-print">
        <Navbar />
      </div>
      <main className="flex-1">
        <RouteGuard>
          <div className="px-6 py-10">{children}</div>
        </RouteGuard>
      </main>
      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
