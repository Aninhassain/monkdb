import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const suits = {
  spade: "♠",
  heart: "♥",
  diamond: "♦",
  club: "♣",
};

const companies = [
  { name: "Microsoft", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", rank: "A", suit: "spade" },
  { name: "Google", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", rank: "K", suit: "heart" },
  { name: "Amazon", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", rank: "Q", suit: "diamond" },
  { name: "Slack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg", rank: "J", suit: "club" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", rank: "10", suit: "spade" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", rank: "9", suit: "heart" },
];

// Full class strings for Tailwind JIT - light and dark mode colors for each suit
const suitClasses = {
  spade: "text-gray-900 dark:text-cyan-400 dark:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]",
  heart: "text-red-500 dark:text-pink-500 dark:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]",
  diamond: "text-red-500 dark:text-purple-400 dark:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]",
  club: "text-gray-900 dark:text-emerald-400 dark:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]",
};

const PlayingCard = ({ company, index, isInView }: { company: typeof companies[0]; index: number; isInView: boolean }) => {
  const suitSymbol = suits[company.suit as keyof typeof suits];
  const suitColorClass = suitClasses[company.suit as keyof typeof suitClasses];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -180 }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        rotateY: 0,
        rotate: (index - 2.5) * 5,
      } : { opacity: 0, y: 50, rotateY: -180 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        y: -20,
        rotate: 0,
        scale: 1.05,
        zIndex: 50,
        transition: { duration: 0.2 }
      }}
      className="relative flex-shrink-0 cursor-pointer group"
      style={{
        transformStyle: "preserve-3d",
        marginLeft: index > 0 ? "-40px" : "0"
      }}
    >
      {/* Card - Light mode: white, Dark mode: dark with neon border */}
      <div className="relative w-44 h-64 rounded-xl overflow-hidden
        bg-gradient-to-br from-white via-gray-50 to-gray-100 border-2 border-gray-200 shadow-xl
        dark:from-[hsl(222,47%,12%)] dark:via-[hsl(222,47%,10%)] dark:to-[hsl(222,47%,8%)]
        dark:border-cyan-500/30 dark:shadow-[0_0_30px_rgba(0,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]
        dark:group-hover:border-cyan-400/60 dark:group-hover:shadow-[0_0_40px_rgba(0,255,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]
        transition-all duration-300"
      >
        {/* Card Inner Pattern - Neon border in dark mode */}
        <div className="absolute inset-2 rounded-lg border border-gray-200/50 dark:border-cyan-500/20 pointer-events-none" />

        {/* Corner decorative lines - only in dark mode */}
        <div className="hidden dark:block absolute top-0 left-0 w-16 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent" />
        <div className="hidden dark:block absolute top-0 left-0 w-[1px] h-16 bg-gradient-to-b from-cyan-500/50 to-transparent" />
        <div className="hidden dark:block absolute bottom-0 right-0 w-16 h-[1px] bg-gradient-to-l from-purple-500/50 to-transparent" />
        <div className="hidden dark:block absolute bottom-0 right-0 w-[1px] h-16 bg-gradient-to-t from-purple-500/50 to-transparent" />

        {/* Top Left Corner */}
        <div className={`absolute top-3 left-3 flex flex-col items-center ${suitColorClass}`}>
          <span className="text-xl font-bold leading-none">{company.rank}</span>
          <span className="text-xl leading-none">{suitSymbol}</span>
        </div>

        {/* Bottom Right Corner (inverted) */}
        <div className={`absolute bottom-3 right-3 flex flex-col items-center rotate-180 ${suitColorClass}`}>
          <span className="text-xl font-bold leading-none">{company.rank}</span>
          <span className="text-xl leading-none">{suitSymbol}</span>
        </div>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          {/* Company Logo */}
          <div className="w-16 h-16 mb-3 flex items-center justify-center relative">
            {/* Glow behind logo in dark mode */}
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl opacity-0 dark:opacity-100" />
            <img
              src={company.logo}
              alt={company.name}
              className="w-14 h-14 object-contain relative z-10 dark:brightness-110"
            />
          </div>

          {/* Large Suit Symbol */}
          <span className={`text-4xl opacity-10 dark:opacity-20 absolute ${suitColorClass}`}>
            {suitSymbol}
          </span>

          {/* Company Name */}
          <span className="text-gray-800 dark:text-gray-200 font-semibold text-sm text-center mt-2 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            {company.name}
          </span>
        </div>

        {/* Shine Effect - adjusted for dark mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/5 dark:via-transparent dark:to-purple-500/5 pointer-events-none" />

        {/* Animated glow pulse on hover - dark mode only */}
        <div className="hidden dark:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-purple-500/10" />
        </div>
      </div>
    </motion.div>
  );
};

export const LogoCloud = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-background relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
            Our Winning Hand
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Trusted by innovative teams worldwide
          </h2>
        </motion.div>

        {/* Playing Cards Display */}
        <div className="flex justify-center items-end min-h-[320px] py-8">
          <div className="flex items-end justify-center" style={{ perspective: "1000px" }}>
            {companies.map((company, index) => (
              <PlayingCard
                key={company.name}
                company={company}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Decorative Elements - Neon styled in dark mode */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-8 mt-12 text-4xl"
        >
          <span className="text-gray-400 dark:text-cyan-400/50 dark:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">♠</span>
          <span className="text-red-400/50 dark:text-pink-500/50 dark:drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">♥</span>
          <span className="text-red-400/50 dark:text-purple-400/50 dark:drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]">♦</span>
          <span className="text-gray-400 dark:text-emerald-400/50 dark:drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">♣</span>
        </motion.div>
      </div>
    </section>
  );
};
