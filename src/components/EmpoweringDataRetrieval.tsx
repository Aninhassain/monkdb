import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Layers, Zap, Shield, Code, Cloud, Check } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Native by Design",
    description:
      "Built ground-up for AI workloads with native vector processing, embedding models, and hybrid search capabilities integrated at the core.",
    checklist: ["Native vector support", "Real-time inference"],
  },
  {
    icon: Layers,
    title: "Unified Multi-Modal Engine",
    description:
      "One powerful engine supporting vector, time-series, geospatial, document, blob, and streaming data types — all through a single query layer.",
    checklist: ["7+ data modalities", "Single query interface", "Zero integration overhead"],
  },
  {
    icon: Zap,
    title: "Enterprise-Grade Performance",
    description:
      "Achieves 1.5M+ QPS with distributed architecture optimized for low-latency analytics and real-time processing at scale.",
    checklist: ["Sub-2-4 ms latency", "Horizontal scaling", "High availability"],
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description:
      "Built-in enterprise security with on-premises deployment, VPN-secured control plane, and comprehensive access controls.",
    checklist: ["Zero-trust architecture", "Data sovereignty", "Audit compliance"],
  },
  {
    icon: Code,
    title: "Developer First",
    description:
      "Modern SDKs, intuitive APIs, and comprehensive documentation to help teams build intelligent applications faster.",
    checklist: ["Python & TypeScript SDKs", "REST & SQL APIs", "Rich documentation"],
  },
  {
    icon: Cloud,
    title: "Flexible Deployment",
    description:
      "Deploy anywhere with our EKS-based control plane — works seamlessly across AWS, Azure, GCP, and on-premises environments.",
    checklist: ["Multi-cloud ready", "Kubernetes native", "Easy orchestration"],
  },
];

const FeatureCard = ({
  feature,
  index,
  isInView,
}: {
  feature: (typeof features)[0];
  index: number;
  isInView: boolean;
}) => {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Card */}
      <div
        className="h-full p-6 rounded-2xl transition-all duration-300
        bg-white border border-gray-200 shadow-sm hover:shadow-lg
        dark:bg-[hsl(222,47%,10%)] dark:border-cyan-500/20
        dark:shadow-[0_0_20px_rgba(0,255,255,0.05)]
        dark:hover:border-cyan-500/40 dark:hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]"
      >
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5
          bg-blue-50 text-blue-600
          dark:bg-cyan-500/10 dark:text-cyan-400
          dark:shadow-[0_0_20px_rgba(0,255,255,0.2)]
          transition-all duration-300
          group-hover:scale-110"
        >
          <Icon className="w-6 h-6" />
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold mb-3
          text-gray-900 dark:text-white
          dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
          {feature.description}
        </p>

        {/* Checklist */}
        <ul className="space-y-2">
          {feature.checklist.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
                bg-emerald-100 text-emerald-600
                dark:bg-emerald-500/20 dark:text-emerald-400"
              >
                <Check className="w-3 h-3" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
            </li>
          ))}
        </ul>

        {/* Hover glow effect - dark mode only */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
          transition-opacity duration-300 pointer-events-none
          dark:bg-gradient-to-br dark:from-cyan-500/5 dark:via-transparent dark:to-purple-500/5"
        />
      </div>
    </motion.div>
  );
};

export const EmpoweringDataRetrieval = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden
        bg-gray-50 dark:bg-background"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_top,rgba(0,255,255,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_bottom,rgba(128,0,255,0.05)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4
            text-gray-900 dark:text-white
            dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Empowering Data Retrieval
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            MONKDB enhances data management with AI, enabling organizations to unify their data for
            smarter, real-time insights.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Decorative neon line - dark mode only */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="hidden dark:block mt-16 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent
            shadow-[0_0_20px_rgba(0,255,255,0.5)]"
        />
      </div>
    </section>
  );
};
