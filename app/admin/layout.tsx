import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminRouteGuard } from "@/components/auth/AdminRouteGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin — Valiyo",
  description: "Manage product access for Valiyo families.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <AdminRouteGuard>
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 lg:flex-row">
            <AdminSidebar />
            <div className="flex-1">{children}</div>
          </div>
        </AdminRouteGuard>
      </main>
      <Footer />
    </div>
  );
}
