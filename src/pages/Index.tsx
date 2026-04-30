import { useState } from "react";
import { TopNav } from "@/components/landing/TopNav";
import { Hero } from "@/components/landing/Hero";
import { RoiCalculator } from "@/components/landing/RoiCalculator";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { StepsSection } from "@/components/landing/StepsSection";
import { LeadForm } from "@/components/landing/LeadForm";
import { LiveFeed } from "@/components/landing/LiveFeed";
import { StickyCta } from "@/components/landing/StickyCta";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const [monthlyBill, setMonthlyBill] = useState(250);

  return (
    <main id="main-content" className="min-h-screen bg-background relative">
      <TopNav />
      <Hero />
      <RoiCalculator bill={monthlyBill} onBillChange={setMonthlyBill} />
      <SocialProofSection />
      <StepsSection />
      <LeadForm initialBill={monthlyBill} />
      <Footer />
      <LiveFeed />
      <StickyCta />
    </main>
  );
};

export default Index;
