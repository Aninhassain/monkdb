import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Database, Server, Cloud, Cpu, Network, HardDrive } from "lucide-react";

const technologies = [
  {
    id: "vector",
    icon: Cpu,
    title: "Vector Search",
    description: "Lightning-fast similarity search with billion-scale vector indexing. Power your AI applications with semantic search capabilities.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    stats: { metric: "10B+", label: "Vectors indexed" },
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "timeseries",
    icon: Network,
    title: "Time-Series Analytics",
    description: "Ingest millions of data points per second with automatic compression and real-time aggregations.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    stats: { metric: "1M+", label: "Points/second" },
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "document",
    icon: Database,
    title: "Document Store",
    description: "Flexible schema-less storage with powerful querying. Store JSON documents with full ACID compliance.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
    stats: { metric: "99.99%", label: "Availability" },
    color: "from-orange-500 to-red-600",
  },
  {
    id: "geo",
    icon: Server,
    title: "Geo-Spatial",
    description: "Built-in location intelligence with polygon queries, distance calculations, and spatial indexing.",
    image: "https://images.unsplash.com/photo-1476304884326-cd2c88572c5f?w=800&q=80",
    stats: { metric: "< 1ms", label: "Query latency" },
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "graph",
    icon: HardDrive,
    title: "Graph Queries",
    description: "Traverse complex relationships with native graph support. Perfect for social networks and recommendation engines.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    stats: { metric: "6 hops", label: "Depth traversal" },
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "stream",
    icon: Cloud,
    title: "Streaming SQL",
    description: "Real-time stream processing with SQL syntax. Build event-driven architectures without complexity.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    stats: { metric: "Real-time", label: "Processing" },
    color: "from-indigo-500 to-purple-600",
  },
];

export const TechShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeTech, setActiveTech] = useState(technologies[0]);

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.03)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6">
            <span className="text-sm text-primary font-medium">Multi-Modal Database</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            One Engine, <span className="gradient-text">Infinite Possibilities</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Support every data type in a single unified platform
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Tech Selector */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            {technologies.map((tech, index) => (
              <motion.button
                key={tech.id}
                onClick={() => setActiveTech(tech)}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4 group ${
                  activeTech.id === tech.id
                    ? "glass-card border-primary/50"
                    : "hover:bg-secondary/30"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tech.color} p-0.5 flex-shrink-0`}>
                  <div className="w-full h-full rounded-lg bg-card flex items-center justify-center">
                    <tech.icon className="w-5 h-5 text-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold transition-colors ${
                    activeTech.id === tech.id ? "text-primary" : "text-foreground group-hover:text-primary"
                  }`}>
                    {tech.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {tech.description}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                  {tech.stats.metric}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Right - Visual Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTech.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={activeTech.image}
                    alt={activeTech.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Floating Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full glass-card bg-gradient-to-r ${activeTech.color} text-white text-xs font-bold`}>
                    {activeTech.stats.label}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${activeTech.color} p-0.5`}>
                      <div className="w-full h-full rounded-lg bg-card flex items-center justify-center">
                        <activeTech.icon className="w-5 h-5 text-foreground" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{activeTech.title}</h3>
                      <p className={`text-sm font-semibold bg-gradient-to-r ${activeTech.color} bg-clip-text text-transparent`}>
                        {activeTech.stats.metric} {activeTech.stats.label}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {activeTech.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
