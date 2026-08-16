import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Valiyo",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            Legal
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-text sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-base leading-relaxed text-text-muted">
            We&rsquo;re preparing our full Privacy Policy. It will explain
            what information Valiyo collects, how it&rsquo;s used, and how
            you can manage it — check back soon.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
