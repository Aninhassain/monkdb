import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  { 
    label: "Queries Processed", 
    value: 847293847, 
    suffix: "", 
    color: "from-cyan-400 to-blue-500",
    increment: 127
  },
  { 
    label: "Data Points Ingested", 
    value: 2847291038, 
    suffix: "", 
    color: "from-purple-400 to-pink-500",
    increment: 847
  },
  { 
    label: "Active Connections", 
    value: 142847, 
    suffix: "", 
    color: "from-green-400 to-emerald-500",
    increment: 3
  },
];

const formatNumber = (num: number) => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(2) + "B";
  if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

export const AnimatedMetrics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [values, setValues] = useState(metrics.map(m => m.value));

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setValues(prev => 
        prev.map((v, i) => v + metrics[i].increment)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section className="py-8 bg-secondary/30 border-y border-border overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${metric.color} animate-pulse`} />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {metric.label}
                </span>
              </div>
              <motion.span
                className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent font-mono`}
                key={values[i]}
              >
                {formatNumber(values[i])}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
