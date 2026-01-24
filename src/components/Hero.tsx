import { motion } from "framer-motion";
import { ArrowRight, Database, Cloud, Cpu, Lock, Zap, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingIcons = [
  { icon: Database, label: "Database", x: 85, y: 15, delay: 0, color: "text-cyan-400" },
  { icon: Cloud, label: "Cloud", x: 75, y: 35, delay: 0.2, color: "text-purple-400" },
  { icon: Cpu, label: "AI", x: 90, y: 55, delay: 0.4, color: "text-pink-400" },
  { icon: Lock, label: "Secure", x: 70, y: 70, delay: 0.6, color: "text-green-400" },
  { icon: Zap, label: "Fast", x: 85, y: 85, delay: 0.8, color: "text-yellow-400" },
  { icon: BarChart, label: "Analytics", x: 95, y: 40, delay: 1, color: "text-blue-400" },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden pt-32 pb-20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-8"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Transform Your Data Infrastructure</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-foreground">The </span>
              <span className="gradient-text">AI-Native</span>
              <br />
              <span className="text-foreground">Unified Database</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              NexusDB supports Vector, Time-Series, Geo-Spatial, Document, Full-Text Search, 
              and Streaming SQL — all in a single, high-performance engine built for modern enterprises.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary group px-8"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary/50 hover:border-primary/50"
              >
                View Documentation
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-12 flex items-center gap-8 text-muted-foreground text-sm"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-400" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Sub-ms Latency</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual - Floating Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[500px] hidden lg:block"
          >
            {/* Central Hub */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full glass-card border-2 border-primary/50 flex items-center justify-center glow-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-xl font-bold gradient-text">NexusDB</span>
            </motion.div>

            {/* Floating Icons */}
            {floatingIcons.map((item, index) => (
              <motion.div
                key={item.label}
                className="absolute"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -15, 0],
                }}
                transition={{
                  opacity: { delay: item.delay + 0.5, duration: 0.5 },
                  scale: { delay: item.delay + 0.5, duration: 0.5 },
                  y: { delay: item.delay + 1, duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <div className="glass-card p-4 rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
                  <item.icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform`} />
                </div>
              </motion.div>
            ))}

            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(280, 100%, 65%)" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {floatingIcons.map((item, index) => (
                <motion.line
                  key={`line-${index}`}
                  x1="50%"
                  y1="50%"
                  x2={`${item.x}%`}
                  y2={`${item.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: item.delay + 0.8, duration: 0.8 }}
                />
              ))}
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L48 110C96 100 192 80 288 75C384 70 480 80 576 85C672 90 768 90 864 85C960 80 1056 70 1152 70C1248 70 1344 80 1392 85L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="hsl(222, 47%, 8%)"
          />
        </svg>
      </div>
    </section>
  );
};
