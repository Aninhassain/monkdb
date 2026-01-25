import { Navbar } from "@/components/Navbar";
import { VideoHero } from "@/components/VideoHero";
import { LogoCloud } from "@/components/LogoCloud";
import { AnimatedMetrics } from "@/components/AnimatedMetrics";
import { Features } from "@/components/Features";
import { EmpoweringDataRetrieval } from "@/components/EmpoweringDataRetrieval";
import { TechShowcase } from "@/components/TechShowcase";
import { UseCases } from "@/components/UseCases";
import { Stats } from "@/components/Stats";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { CodeSnippet } from "@/components/CodeSnippet";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <VideoHero />
      <LogoCloud />
      <AnimatedMetrics />
      <Features />
      <EmpoweringDataRetrieval />
      <TechShowcase />
      <UseCases />
      <Stats />
      <InteractiveDemo />
      <CodeSnippet />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
};

export default Index;
