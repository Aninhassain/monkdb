import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Rocket, 
  RefreshCw, 
  Terminal, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";

const useCases = [
  {
    icon: Rocket,
    title: "Blazing Performance",
    description: "Handle 1.5M+ queries per second with sub-millisecond latency. Built for real-time analytics and instant responses at any scale.",
    gradient: "from-cyan-500 to-blue-600",
    stats: "1.5M+ QPS",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Sync",
    description: "Stream data changes instantly across your entire infrastructure. Perfect for live dashboards, collaborative apps, and IoT systems.",
    gradient: "from-purple-500 to-pink-600",
    stats: "<1ms Latency",
  },
  {
    icon: Terminal,
    title: "Simple API",
    description: "One unified API for all data types. Reduce complexity, eliminate data silos, and accelerate development with intuitive SDKs.",
    gradient: "from-orange-500 to-red-600",
    stats: "10+ SDKs",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description: "Zero-trust architecture with end-to-end encryption, SOC2 compliance, and granular access controls. Your data stays yours.",
    gradient: "from-green-500 to-emerald-600",
    stats: "99.99% SLA",
  },
];

export const UseCases = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="use-cases" className="py-24 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,255,255,0.03)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6">
            <span className="text-sm text-primary font-medium">Why Monk DB</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for <span className="gradient-text">Modern Applications</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From startups to Fortune 500, teams choose Monk DB for these core advantages
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-8 h-full hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                {/* Gradient Accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${useCase.gradient}`} />
                
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${useCase.gradient} p-0.5 flex-shrink-0`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <useCase.icon className="w-6 h-6 text-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {useCase.title}
                      </h3>
                      <span className={`text-sm font-bold bg-gradient-to-r ${useCase.gradient} bg-clip-text text-transparent`}>
                        {useCase.stats}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {useCase.description}
                    </p>
                    <a 
                      href="#" 
                      className="inline-flex items-center text-sm text-primary hover:gap-3 gap-2 transition-all duration-300"
                    >
                      Learn more <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
