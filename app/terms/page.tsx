import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Valiyo",
};

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            Legal
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-text sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-6 text-base leading-relaxed text-text-muted">
            We&rsquo;re preparing our full Terms of Service. It will explain
            the rules for using Valiyo&rsquo;s products — check back soon.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
