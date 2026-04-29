import { TopNav } from "@/components/landing/TopNav";
import { Hero } from "@/components/landing/Hero";
import { RoiCalculator } from "@/components/landing/RoiCalculator";
import { StepsSection } from "@/components/landing/StepsSection";
import { LeadForm } from "@/components/landing/LeadForm";
import { LiveFeed } from "@/components/landing/LiveFeed";
import { StickyCta } from "@/components/landing/StickyCta";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative">
      <TopNav />
      <Hero />
      <RoiCalculator />
      <StepsSection />
      <LeadForm />
      <Footer />
      <LiveFeed />
      <StickyCta />
    </main>
  );
};

export default Index;
