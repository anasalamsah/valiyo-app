import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { JourneyNav } from "@/components/home/JourneyNav";
import { JourneyCards } from "@/components/home/JourneyCards";
import { GrowSection } from "@/components/home/GrowSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <JourneyNav />
        <JourneyCards />
        <GrowSection />
      </main>
      <Footer />
    </div>
  );
}
