import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { UseCases } from "@/components/UseCases";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { CodeSnippet } from "@/components/CodeSnippet";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <UseCases />
      <Stats />
      <CodeSnippet />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
};

export default Index;
