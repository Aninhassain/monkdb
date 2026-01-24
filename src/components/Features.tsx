import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Database, 
  Cpu, 
  Zap, 
  Shield, 
  Code2, 
  Layers, 
  Clock, 
  Lock, 
  TrendingUp,
  Plug
} from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Unified Data Engine",
    description: "One platform for all data types — vectors, time-series, documents, and more.",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Cpu,
    title: "AI-Native by Design",
    description: "Built-in AI capabilities with native vector search and ML pipelines.",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "1.5M+ queries per second with sub-millisecond latency at scale.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Zero-trust architecture with end-to-end encryption and compliance.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Code2,
    title: "Developer First",
    description: "Intuitive SDKs, comprehensive APIs, and excellent documentation.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: Layers,
    title: "Multi-Modal Support",
    description: "Vector, Time-Series, Geo-Spatial, and full-text search in one engine.",
    color: "from-pink-400 to-rose-500",
  },
  {
    icon: Clock,
    title: "Lightning Fast",
    description: "Optimized for real-time analytics and instant query responses.",
    color: "from-teal-400 to-cyan-500",
  },
  {
    icon: Lock,
    title: "Data Privacy",
    description: "Complete data sovereignty with on-premise and cloud deployment options.",
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Scalable Architecture",
    description: "Horizontal scaling built-in — grow from prototype to enterprise.",
    color: "from-orange-400 to-red-500",
  },
  {
    icon: Plug,
    title: "Seamless Integration",
    description: "Connect with your existing tools, frameworks, and workflows.",
    color: "from-emerald-400 to-green-500",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="glass-card rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 mb-4`}>
          <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
            <feature.icon className="w-5 h-5 text-foreground" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {feature.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

export const Features = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="features" className="py-24 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.03)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6">
            <span className="text-sm text-primary font-medium">Why Choose NexusDB</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted Features & <span className="gradient-text">Capabilities</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the power of a unified database platform built for modern enterprises
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
