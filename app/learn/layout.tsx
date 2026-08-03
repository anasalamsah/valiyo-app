import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RouteGuard } from "@/components/auth/RouteGuard";

export const metadata: Metadata = {
  title: "Learn — Valiyo",
  description: "Progres belajar coding, AI, dan keterampilan masa depan.",
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <RouteGuard>
          <div className="px-6 py-10">{children}</div>
        </RouteGuard>
      </main>
      <Footer />
    </div>
  );
}
