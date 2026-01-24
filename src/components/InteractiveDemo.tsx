import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Loader2, CheckCircle, Database, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const demoSteps = [
  { 
    label: "Connect", 
    icon: Database, 
    code: `const db = await NexusDB.connect("cluster.nexusdb.io");`,
    output: "✓ Connected to cluster in 23ms"
  },
  { 
    label: "Insert", 
    icon: Zap, 
    code: `await db.vectors.insert("products", embeddings);`,
    output: "✓ Inserted 10,000 vectors in 145ms"
  },
  { 
    label: "Search", 
    icon: Search, 
    code: `const results = await db.vectors.search("wireless headphones", 10);`,
    output: "✓ Found 10 matches in 0.8ms"
  },
];

export const InteractiveDemo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [outputs, setOutputs] = useState<string[]>([]);

  const runDemo = async () => {
    setIsRunning(true);
    setOutputs([]);
    setCurrentStep(0);

    for (let i = 0; i < demoSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOutputs(prev => [...prev, demoSteps[i].output]);
    }

    setIsRunning(false);
    setCurrentStep(-1);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,255,0.05)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6">
            <span className="text-sm text-primary font-medium">Live Demo</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            See It in <span className="gradient-text">Action</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the speed and simplicity of NexusDB with our interactive demo
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-muted-foreground font-mono">nexusdb-demo.js</span>
              <Button
                size="sm"
                onClick={runDemo}
                disabled={isRunning}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isRunning ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {isRunning ? "Running..." : "Run Demo"}
              </Button>
            </div>

            {/* Code Area */}
            <div className="p-6 font-mono text-sm">
              {demoSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: currentStep >= i || outputs[i] ? 1 : 0.3,
                    x: currentStep === i ? 10 : 0
                  }}
                  className="mb-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {outputs[i] ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : currentStep === i ? (
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    ) : (
                      <step.icon className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-muted-foreground">{`// Step ${i + 1}: ${step.label}`}</span>
                  </div>
                  <code className={`block pl-7 ${currentStep === i ? "text-primary" : "text-foreground/80"}`}>
                    {step.code}
                  </code>
                  {outputs[i] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pl-7 mt-2 text-green-400 text-xs"
                    >
                      {outputs[i]}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Result Summary */}
            {outputs.length === demoSteps.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 pb-6"
              >
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-green-400">Demo Complete!</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Total time: <span className="text-green-400 font-mono">168.8ms</span> — 
                    10,000 vectors indexed and queried in under 200ms
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
