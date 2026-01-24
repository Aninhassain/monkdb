import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const nodes = [
  { id: 1, x: 50, y: 20, label: "Vector", color: "from-cyan-400 to-blue-500" },
  { id: 2, x: 20, y: 50, label: "Time Series", color: "from-purple-400 to-pink-500" },
  { id: 3, x: 80, y: 50, label: "Document", color: "from-orange-400 to-red-500" },
  { id: 4, x: 35, y: 80, label: "Geo", color: "from-green-400 to-emerald-500" },
  { id: 5, x: 65, y: 80, label: "Graph", color: "from-yellow-400 to-orange-500" },
];

const connections = [
  { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 },
  { from: 3, to: 5 }, { from: 4, to: 5 }, { from: 2, to: 3 },
];

export const DatabaseVisual = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [dataParticles, setDataParticles] = useState<Array<{ id: number; path: number; progress: number }>>([]);
  const particleId = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomConnection = Math.floor(Math.random() * connections.length);
      setDataParticles(prev => [
        ...prev.slice(-10),
        { id: particleId.current++, path: randomConnection, progress: 0 }
      ]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animationFrame = setInterval(() => {
      setDataParticles(prev => 
        prev
          .map(p => ({ ...p, progress: p.progress + 0.02 }))
          .filter(p => p.progress < 1)
      );
    }, 16);

    return () => clearInterval(animationFrame);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      {/* Glowing Background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(280, 100%, 65%)" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Connection Lines */}
        {connections.map((conn, i) => {
          const from = nodes.find(n => n.id === conn.from)!;
          const to = nodes.find(n => n.id === conn.to)!;
          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#lineGrad)"
              strokeWidth="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
            />
          );
        })}

        {/* Data Particles */}
        {dataParticles.map(particle => {
          const conn = connections[particle.path];
          const from = nodes.find(n => n.id === conn.from)!;
          const to = nodes.find(n => n.id === conn.to)!;
          const x = from.x + (to.x - from.x) * particle.progress;
          const y = from.y + (to.y - from.y) * particle.progress;
          
          return (
            <motion.circle
              key={particle.id}
              cx={x}
              cy={y}
              r="0.8"
              fill="hsl(180, 100%, 60%)"
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5 }}
            />
          );
        })}

        {/* Center Node */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <circle cx="50" cy="50" r="8" fill="hsl(222, 47%, 10%)" stroke="url(#lineGrad)" strokeWidth="0.5" />
          <text x="50" y="51" textAnchor="middle" fill="hsl(180, 100%, 50%)" fontSize="3" fontWeight="bold">
            NexusDB
          </text>
        </motion.g>

        {/* Outer Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
            onHoverStart={() => setActiveNode(node.id)}
            onHoverEnd={() => setActiveNode(null)}
            style={{ cursor: "pointer" }}
          >
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={activeNode === node.id ? "6" : "5"}
              fill="hsl(222, 47%, 12%)"
              stroke={activeNode === node.id ? "hsl(180, 100%, 50%)" : "hsl(222, 30%, 25%)"}
              strokeWidth="0.4"
              animate={{ 
                scale: activeNode === node.id ? 1.2 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            <text 
              x={node.x} 
              y={node.y + 0.8} 
              textAnchor="middle" 
              fill="hsl(210, 40%, 98%)" 
              fontSize="2.2"
              fontWeight="500"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* Orbiting Ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="hsl(180, 100%, 50%)"
          strokeWidth="0.15"
          strokeDasharray="5 3"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 50px" }}
        />
      </svg>
    </div>
  );
};
