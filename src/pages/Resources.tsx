import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, FileText, Video, BookOpen, Calendar, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type ResourceType = "all" | "pdf" | "video";

interface Resource {
  id: number;
  type: "pdf" | "video";
  title: string;
  description: string;
  tags: string[];
  date: string;
  duration: string;
  coverGradient: string;
  coverTitle: string;
  link: string;
}

const resources: Resource[] = [
  {
    id: 1,
    type: "video",
    title: "MonkDB - Multi Agent Orchestration",
    description: "Dive into the fascinating world of parallel AI agent orchestration using MonkDB.",
    tags: ["Multi Agent", "AI"],
    date: "Nov 24, 2025",
    duration: "12 min watch",
    coverGradient: "from-slate-900 via-slate-800 to-slate-900",
    coverTitle: "Orchestrating Multi AI Agents",
    link: "#",
  },
  {
    id: 2,
    type: "video",
    title: "Agentic AI with MonkDB for Analytics",
    description: "Learn how to leverage agentic AI with MonkDB for powerful analytics.",
    tags: ["monkdb", "agentic ai"],
    date: "Nov 22, 2025",
    duration: "5 min watch",
    coverGradient: "from-blue-900 via-slate-800 to-blue-900",
    coverTitle: "Powering Retail Agents with AI-Ready Data",
    link: "#",
  },
  {
    id: 3,
    type: "video",
    title: "FleetMonk - Fleet Management Solution",
    description: "Meet FleetMonk, powered by MonkDB, an AI native multi-model solution.",
    tags: ["monkdb", "fleetmonk"],
    date: "Nov 22, 2025",
    duration: "4 min watch",
    coverGradient: "from-indigo-900 via-slate-800 to-indigo-900",
    coverTitle: "Fleet Monk Powered By MonkDB",
    link: "#",
  },
  {
    id: 4,
    type: "pdf",
    title: "MonkDB AI-Native Playbook",
    description: "Moving Enterprises from Hype to Production to Value with AI-native databases.",
    tags: ["mongodb", "atlas"],
    date: "Nov 22, 2025",
    duration: "24 min read",
    coverGradient: "from-cyan-900 via-slate-900 to-cyan-900",
    coverTitle: "The MonkDB AI-Native Playbook",
    link: "#",
  },
  {
    id: 5,
    type: "pdf",
    title: "MonkDB Indexing Strategies",
    description: "Comprehensive guide to MonkDB indexing for optimal query performance.",
    tags: ["mongodb", "indexes"],
    date: "Nov 22, 2025",
    duration: "27 min read",
    coverGradient: "from-emerald-900 via-slate-900 to-emerald-900",
    coverTitle: "Geo-Data Types & Spatial Indexing",
    link: "#",
  },
  {
    id: 6,
    type: "pdf",
    title: "MonkDB Aggregation Framework",
    description: "Master the MonkDB aggregation framework for complex data operations.",
    tags: ["mongodb", "aggregation"],
    date: "Nov 22, 2025",
    duration: "35 min read",
    coverGradient: "from-purple-900 via-slate-900 to-purple-900",
    coverTitle: "Data Pipeline Management",
    link: "#",
  },
  {
    id: 7,
    type: "pdf",
    title: "MonkDB Sharding for Enterprise Scale",
    description: "Complete guide to MonkDB sharding for horizontal scaling in enterprise environments.",
    tags: ["mongodb", "sharding"],
    date: "Nov 22, 2025",
    duration: "32 min read",
    coverGradient: "from-rose-900 via-slate-900 to-rose-900",
    coverTitle: "Enterprise Sharding Guide",
    link: "#",
  },
  {
    id: 8,
    type: "pdf",
    title: "MonkDB Replication & High Availability",
    description: "Learn about MonkDB replication and how to set up replica sets for high availability.",
    tags: ["mongodb", "replication"],
    date: "Nov 22, 2025",
    duration: "28 min read",
    coverGradient: "from-amber-900 via-slate-900 to-amber-900",
    coverTitle: "Replication & HA Setup",
    link: "#",
  },
  {
    id: 9,
    type: "pdf",
    title: "MonkDB Security Best Practices",
    description: "Essential security practices to keep your MonkDB database secure and compliant.",
    tags: ["mongodb", "security"],
    date: "Nov 22, 2025",
    duration: "25 min read",
    coverGradient: "from-red-900 via-slate-900 to-red-900",
    coverTitle: "Security Best Practices",
    link: "#",
  },
];

const Book = ({ resource, index }: { resource: Resource; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Spine colors based on type
  const spineColor = resource.type === "pdf"
    ? "from-cyan-700 via-cyan-600 to-cyan-700 dark:from-cyan-600 dark:via-cyan-500 dark:to-cyan-600"
    : "from-rose-700 via-rose-600 to-rose-700 dark:from-pink-600 dark:via-pink-500 dark:to-pink-600";

  const coverColor = resource.type === "pdf"
    ? "from-cyan-800 to-cyan-900 dark:from-cyan-700 dark:to-cyan-800"
    : "from-rose-800 to-rose-900 dark:from-pink-700 dark:to-pink-800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative cursor-pointer"
      style={{ perspective: "2000px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Book Container - expanded width on hover to show open book */}
      <motion.div
        className="relative h-72"
        animate={{ width: isHovered ? 420 : 170 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Back Cover (visible when open) */}
        <motion.div
          className={`absolute left-0 top-0 w-[200px] h-full rounded-l-md bg-gradient-to-br ${coverColor}
            shadow-2xl dark:shadow-[0_0_30px_rgba(0,255,255,0.2)]`}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Back cover texture */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]" />
        </motion.div>

        {/* Inner Pages (Left Page - visible when open) */}
        <motion.div
          className="absolute left-0 top-2 w-[195px] h-[calc(100%-16px)] rounded-l-sm
            bg-white dark:bg-white
            shadow-inner"
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 3 : 0,
          }}
          transition={{ duration: 0.4, delay: isHovered ? 0.1 : 0 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Page texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-l-sm" />

          {/* Left page content */}
          <div className="relative h-full p-5 flex flex-col">
            {/* Chapter marker */}
            <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3 font-medium">
              Overview
            </div>

            {/* Decorative title */}
            <h3 className="text-base font-serif font-bold text-gray-800 mb-4 leading-snug">
              {resource.coverTitle}
            </h3>

            {/* Decorative divider */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-gray-300 to-transparent" />
            </div>

            {/* Fake paragraph lines */}
            <div className="space-y-2.5 flex-1">
              <div className="h-[6px] bg-gray-200 rounded w-full" />
              <div className="h-[6px] bg-gray-200 rounded w-[95%]" />
              <div className="h-[6px] bg-gray-200 rounded w-full" />
              <div className="h-[6px] bg-gray-200 rounded w-[88%]" />
              <div className="h-[6px] bg-gray-200 rounded w-full" />
              <div className="h-[6px] bg-gray-200 rounded w-[92%]" />
              <div className="h-[6px] bg-gray-200 rounded w-[70%]" />
            </div>

            {/* Page number */}
            <div className="text-[10px] text-gray-300 text-center mt-3 font-serif italic">— i —</div>
          </div>

          {/* Page edge shadow */}
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-gray-200/80 to-transparent rounded-r-sm" />
        </motion.div>

        {/* Inner Pages (Right Page - Content Page) */}
        <motion.div
          className="absolute top-2 w-[195px] h-[calc(100%-16px)] rounded-r-sm
            bg-white dark:bg-white
            shadow-lg"
          animate={{
            opacity: isHovered ? 1 : 0,
            left: isHovered ? 200 : 10,
          }}
          transition={{ duration: 0.5, delay: isHovered ? 0.15 : 0 }}
        >
          {/* Page texture */}
          <div className="absolute inset-0 bg-gradient-to-bl from-gray-50 to-white rounded-r-sm" />

          {/* Right page content - Main Info */}
          <div className="relative h-full p-5 flex flex-col">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[10px] rounded-full font-semibold
                    bg-gradient-to-r from-cyan-500 to-cyan-600 text-white
                    shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h4 className="text-sm font-bold text-gray-900 mb-2 leading-snug">
              {resource.title}
            </h4>

            {/* Description */}
            <p className="text-xs text-gray-600 leading-relaxed mb-4 flex-1">
              {resource.description}
            </p>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-[10px] text-gray-500 border-t border-gray-100 pt-3 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span>{resource.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <span>{resource.duration}</span>
              </div>
            </div>

            {/* Read More Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                window.open(resource.link, "_blank");
              }}
              className="w-full py-2.5 rounded-lg text-xs font-bold
                bg-gradient-to-r from-cyan-500 to-blue-600
                text-white shadow-lg shadow-cyan-500/25
                flex items-center justify-center gap-2
                transition-all duration-200"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,200,255,0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {resource.type === "pdf" ? "Read Document" : "Watch Video"}
            </motion.button>

            {/* Page number */}
            <div className="text-[10px] text-gray-300 text-center mt-3 font-serif italic">— ii —</div>
          </div>

          {/* Page edge shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-gray-100 to-transparent rounded-l-sm" />
        </motion.div>

        {/* Spine */}
        <motion.div
          className={`absolute top-0 w-7 h-full bg-gradient-to-r ${spineColor}
            shadow-lg dark:shadow-[0_0_20px_rgba(0,255,255,0.3)]
            rounded-l-[3px]`}
          animate={{
            left: isHovered ? 193 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Spine decoration */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-white/50 rounded" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-[1px] bg-white/30 rounded" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-white/50 rounded" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-2 h-[1px] bg-white/30 rounded" />

          {/* Spine highlight */}
          <div className="absolute inset-y-0 left-0 w-[2px] bg-white/30 rounded-l" />
          <div className="absolute inset-y-0 right-0 w-[1px] bg-black/20" />
        </motion.div>

        {/* Front Cover */}
        <motion.div
          className={`absolute top-0 w-[156px] h-full rounded-r-md
            bg-gradient-to-br ${resource.coverGradient}
            shadow-xl dark:shadow-[0_0_25px_rgba(0,255,255,0.2)]
            border-r border-t border-b border-white/10`}
          animate={{
            rotateY: isHovered ? -165 : 0,
            left: isHovered ? 193 : 7,
            x: isHovered ? 7 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
        >
          {/* Front Cover Content */}
          <div
            className="absolute inset-0 p-4 flex flex-col justify-between"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Type Badge */}
            <div className={`self-start px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-lg
              ${resource.type === "pdf"
                ? "bg-cyan-500 text-white"
                : "bg-rose-500 text-white"}`}
            >
              {resource.type === "pdf" ? <FileText className="w-3 h-3" /> : <Video className="w-3 h-3" />}
              {resource.type.toUpperCase()}
            </div>

            {/* Cover Title */}
            <div className="flex-1 flex items-center justify-center px-2">
              <h3 className="text-white text-sm font-bold text-center leading-snug drop-shadow-lg">
                {resource.coverTitle}
              </h3>
            </div>

            {/* MonkDB Logo */}
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-[10px] font-bold tracking-wider">MONKDB</span>
              <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="w-4 h-4 text-white/80" />
              </div>
            </div>
          </div>

          {/* Cover shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none rounded-r-md" style={{ backfaceVisibility: "hidden" }} />

          {/* Inside of front cover (shown when flipped) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 p-4 rounded-l-md"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="h-full border-2 border-white/10 rounded p-3 flex flex-col items-center justify-center">
              <BookOpen className="w-8 h-8 text-white/20 mb-2" />
              <span className="text-white/30 text-xs text-center font-medium">Property of<br/>MONKDB Library</span>
            </div>
          </div>
        </motion.div>

        {/* Page edges (visible when closed) */}
        <motion.div
          className="absolute top-3 bottom-3 w-4 bg-gradient-to-r from-gray-50 via-white to-gray-100
            rounded-r-sm shadow-sm"
          animate={{
            right: isHovered ? "auto" : 0,
            left: isHovered ? 400 : "auto",
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Page lines */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute right-0 h-[1px] bg-gray-200"
              style={{ top: `${8 + i * 9}%`, width: "3px" }}
            />
          ))}
        </motion.div>

        {/* Hover instruction */}
        <motion.div
          className="absolute -bottom-7 left-0 right-0 text-center"
          animate={{ opacity: isHovered ? 0 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Hover to open</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Shelf = ({ children, shelfIndex }: { children: React.ReactNode; shelfIndex: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: shelfIndex * 0.2 }}
      className="relative mb-20"
    >
      {/* Books container */}
      <div className="flex justify-center items-end gap-16 md:gap-20 flex-wrap px-4 pb-10 min-h-[340px]">
        {children}
      </div>

      {/* Shelf */}
      <div className="relative max-w-5xl mx-auto">
        {/* Shelf back panel */}
        <div className="absolute -top-2 left-4 right-4 h-3 bg-gradient-to-b from-amber-900/50 to-transparent
          dark:from-slate-800/50 rounded-t-lg" />

        {/* Shelf top surface with wood grain effect */}
        <div className="h-5 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800
          dark:from-amber-800 dark:via-amber-900 dark:to-slate-900
          rounded-t-sm shadow-[0_-8px_20px_rgba(0,0,0,0.2)]
          dark:shadow-[0_-8px_25px_rgba(0,255,255,0.08),0_-4px_15px_rgba(0,0,0,0.4)]
          relative overflow-hidden">
          {/* Wood grain texture */}
          <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent
            dark:via-cyan-400/30" />
        </div>

        {/* Shelf front face */}
        <div className="h-8 bg-gradient-to-b from-amber-700 to-amber-900
          dark:from-amber-900 dark:to-slate-950
          border-b-4 border-amber-950 dark:border-slate-950
          shadow-[0_8px_20px_rgba(0,0,0,0.3)]
          dark:shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_30px_rgba(0,255,255,0.05)]
          relative overflow-hidden">
          {/* Wood grain texture */}
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_3px,rgba(0,0,0,0.1)_3px,rgba(0,0,0,0.1)_6px)]" />
          {/* Front edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-amber-500/30 dark:bg-cyan-500/20" />
        </div>

        {/* Shelf decorative molding */}
        <div className="absolute -bottom-1 left-2 right-2 h-2 bg-gradient-to-b from-amber-800 to-amber-950
          dark:from-slate-800 dark:to-slate-950 rounded-b-sm" />

        {/* Neon line accent - dark mode only */}
        <div className="hidden dark:block absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent
          shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
      </div>

      {/* Shelf brackets - ornate design */}
      <div className="absolute -bottom-1 left-[10%] w-6 h-12">
        <div className="w-full h-full bg-gradient-to-b from-amber-600 to-amber-900
          dark:from-slate-600 dark:to-slate-900 rounded-b-md
          shadow-lg dark:shadow-[0_0_15px_rgba(0,255,255,0.1)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-amber-500/50 dark:bg-cyan-500/30 rounded-b-sm" />
      </div>
      <div className="absolute -bottom-1 right-[10%] w-6 h-12">
        <div className="w-full h-full bg-gradient-to-b from-amber-600 to-amber-900
          dark:from-slate-600 dark:to-slate-900 rounded-b-md
          shadow-lg dark:shadow-[0_0_15px_rgba(0,255,255,0.1)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-amber-500/50 dark:bg-cyan-500/30 rounded-b-sm" />
      </div>
    </motion.div>
  );
};

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ResourceType>("all");
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === "all" || resource.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Split resources into shelves (3 books per shelf for better spacing when open)
  const booksPerShelf = 3;
  const shelves: Resource[][] = [];
  for (let i = 0; i < filteredResources.length; i += booksPerShelf) {
    shelves.push(filteredResources.slice(i, i + booksPerShelf));
  }

  const filterCounts = {
    all: resources.length,
    pdf: resources.filter((r) => r.type === "pdf").length,
    video: resources.filter((r) => r.type === "video").length,
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100
      dark:from-[hsl(222,47%,6%)] dark:via-[hsl(222,47%,8%)] dark:to-[hsl(222,47%,6%)]">
      <Navbar />

      {/* Library Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Warm library glow - light mode */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.1)_0%,transparent_50%)] dark:opacity-0" />
        {/* Neon glow - dark mode */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 bg-[radial-gradient(ellipse_at_top,rgba(0,255,255,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-0 dark:opacity-100 bg-[radial-gradient(ellipse_at_bottom,rgba(128,0,255,0.05)_0%,transparent_50%)]" />
      </div>

      {/* Header Section */}
      <section ref={headerRef} className="pt-32 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Library Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isHeaderInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6
                bg-amber-100 dark:bg-cyan-500/10
                border border-amber-200 dark:border-cyan-500/30
                shadow-lg dark:shadow-[0_0_30px_rgba(0,255,255,0.2)]"
            >
              <BookOpen className="w-10 h-10 text-amber-600 dark:text-cyan-400" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4
              text-gray-900 dark:text-white
              dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Resource Library
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our collection of technical documentation, videos, and industry insights.
              Pull a book from the shelf to learn more.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources, videos, or documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl
                  bg-white dark:bg-[hsl(222,47%,10%)]
                  border border-gray-200 dark:border-cyan-500/30
                  text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-cyan-500
                  shadow-sm dark:shadow-[0_0_20px_rgba(0,255,255,0.1)]
                  transition-all duration-300"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center gap-2">
              {(["all", "video", "pdf"] as ResourceType[]).map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full transition-all duration-300
                    ${activeFilter === filter
                      ? "bg-amber-600 dark:bg-cyan-500 text-white dark:text-black hover:bg-amber-700 dark:hover:bg-cyan-400"
                      : "bg-white dark:bg-transparent border-gray-200 dark:border-cyan-500/30 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-cyan-500/10"
                    }`}
                >
                  {filter === "all" ? "All Resources" : filter === "video" ? "Videos" : "Documents"}
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs
                    bg-white/20 dark:bg-black/20">
                    {filterCounts[filter]}
                  </span>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Library Shelves */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          {shelves.length > 0 ? (
            shelves.map((shelfBooks, shelfIndex) => (
              <Shelf key={shelfIndex} shelfIndex={shelfIndex}>
                {shelfBooks.map((resource, bookIndex) => (
                  <Book key={resource.id} resource={resource} index={bookIndex} />
                ))}
              </Shelf>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No resources found matching your search.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Decorative floor shadow */}
      <div className="h-32 bg-gradient-to-t from-amber-200/50 via-transparent to-transparent
        dark:from-black/30 dark:via-transparent" />

      <Footer />
    </main>
  );
};

export default Resources;
