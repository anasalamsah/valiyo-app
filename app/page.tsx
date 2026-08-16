import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { WhatIsValiyo } from "@/components/home/WhatIsValiyo";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { KidsSection } from "@/components/home/KidsSection";
import { JourneyNav } from "@/components/home/JourneyNav";
import { JourneyCards } from "@/components/home/JourneyCards";
import { GrowSection } from "@/components/home/GrowSection";
import { WhyValiyoSection } from "@/components/home/WhyValiyoSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhatIsValiyo />
        <EcosystemSection />
        <KidsSection />
        <JourneyNav />
        <JourneyCards />
        <GrowSection />
        <WhyValiyoSection />
        <HowItWorksSection />
        <SocialProofSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}