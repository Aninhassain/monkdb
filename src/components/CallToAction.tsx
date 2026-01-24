import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse-glow" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-8"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Start Building Today</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Ready to Transform Your{" "}
            <span className="gradient-text">Data Infrastructure?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Join thousands of developers and enterprises who have already made the switch. 
            Get started for free with our generous free tier.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary group px-8 text-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-secondary/50 hover:border-primary/50 px-8 text-lg"
            >
              Schedule Demo
            </Button>
          </motion.div>

          {/* Trust Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            No credit card required • Free forever tier • Setup in under 5 minutes
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
