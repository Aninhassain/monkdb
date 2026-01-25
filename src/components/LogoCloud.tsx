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

const getSuitColor = (suit: string) => {
  return suit === "heart" || suit === "diamond" ? "text-red-500" : "text-foreground";
};

const PlayingCard = ({ company, index, isInView }: { company: typeof companies[0]; index: number; isInView: boolean }) => {
  const suitSymbol = suits[company.suit as keyof typeof suits];
  const suitColor = getSuitColor(company.suit);

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
      className="relative flex-shrink-0 cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        marginLeft: index > 0 ? "-40px" : "0"
      }}
    >
      {/* Card */}
      <div className="relative w-44 h-64 rounded-xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-slate-100 dark:via-white dark:to-slate-50 shadow-2xl border-2 border-gray-200 overflow-hidden">
        {/* Card Inner Pattern */}
        <div className="absolute inset-2 rounded-lg border border-gray-200/50 pointer-events-none" />

        {/* Top Left Corner */}
        <div className={`absolute top-3 left-3 flex flex-col items-center ${suitColor}`}>
          <span className="text-xl font-bold leading-none">{company.rank}</span>
          <span className="text-xl leading-none">{suitSymbol}</span>
        </div>

        {/* Bottom Right Corner (inverted) */}
        <div className={`absolute bottom-3 right-3 flex flex-col items-center rotate-180 ${suitColor}`}>
          <span className="text-xl font-bold leading-none">{company.rank}</span>
          <span className="text-xl leading-none">{suitSymbol}</span>
        </div>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          {/* Company Logo */}
          <div className="w-16 h-16 mb-3 flex items-center justify-center">
            <img
              src={company.logo}
              alt={company.name}
              className="w-14 h-14 object-contain"
            />
          </div>

          {/* Large Suit Symbol */}
          <span className={`text-4xl ${suitColor} opacity-20 absolute`}>{suitSymbol}</span>

          {/* Company Name */}
          <span className="text-gray-800 font-semibold text-sm text-center mt-2">
            {company.name}
          </span>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
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

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-8 mt-12 text-4xl opacity-20"
        >
          <span className="text-foreground">♠</span>
          <span className="text-red-500">♥</span>
          <span className="text-red-500">♦</span>
          <span className="text-foreground">♣</span>
        </motion.div>
      </div>
    </section>
  );
};
