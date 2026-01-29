import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  BookOpen,
  Search,
  Monitor,
  Triangle,
  Github,
  MessageCircle,
  FileText,
  Shield,
  DollarSign,
  Cpu,
  Plus,
  Minus,
  HelpCircle,
  ExternalLink,
  CheckCircle2
} from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What makes MonkDB unique?",
    answer: "MonkDB is an AI-native database designed from the ground up to power intelligent applications. It combines vector search, document storage, and real-time analytics in a single platform, eliminating the need for multiple databases. Its unique architecture enables seamless integration with AI/ML workloads while maintaining ACID compliance and enterprise-grade security.",
    category: "general",
  },
  {
    id: 2,
    question: "How does MonkDB reduce costs?",
    answer: "MonkDB reduces costs through its unified architecture that eliminates the need for separate vector databases, document stores, and analytics engines. Organizations typically see 40-60% cost reduction by consolidating their data infrastructure. Additionally, its efficient storage compression and intelligent caching minimize resource usage, further reducing operational expenses.",
    category: "pricing",
  },
  {
    id: 3,
    question: "What's MonkDB's performance like?",
    answer: "MonkDB delivers 1.5M+ QPS for vector workloads, <2-4 ms latency under high concurrency, and horizontal scalability while maintaining high availability. Our benchmarks show 3x faster query performance compared to traditional databases for AI workloads, with linear scaling as you add nodes to your cluster.",
    category: "technical",
  },
  {
    id: 4,
    question: "Is MonkDB secure?",
    answer: "Yes, MonkDB implements enterprise-grade security including end-to-end encryption, role-based access control (RBAC), audit logging, and compliance with SOC 2, GDPR, and HIPAA requirements. All data is encrypted at rest and in transit, with optional customer-managed encryption keys for maximum control.",
    category: "security",
  },
  {
    id: 5,
    question: "What industries use MonkDB?",
    answer: "MonkDB serves diverse industries including financial services, healthcare, e-commerce, gaming, and telecommunications. Common use cases include recommendation engines, fraud detection, semantic search, personalization systems, and real-time analytics. Fortune 500 companies across these sectors rely on MonkDB for their mission-critical AI applications.",
    category: "general",
  },
  {
    id: 6,
    question: "How does MonkDB handle scaling?",
    answer: "MonkDB features automatic horizontal scaling with zero-downtime operations. As your data grows, you can seamlessly add nodes to your cluster. Our intelligent sharding algorithm ensures optimal data distribution, while automatic rebalancing maintains performance during scale operations. You can scale from gigabytes to petabytes without architectural changes.",
    category: "technical",
  },
  {
    id: 7,
    question: "What programming languages are supported?",
    answer: "MonkDB provides official SDKs for Python, JavaScript/TypeScript, Go, Java, Rust, and C#. We also offer a RESTful API for integration with any language. Our SDKs include async support, connection pooling, and built-in retry logic for resilient applications.",
    category: "technical",
  },
  {
    id: 8,
    question: "Can I migrate from my existing database?",
    answer: "Yes, MonkDB provides comprehensive migration tools and support. We offer automated migration utilities for PostgreSQL, MongoDB, Elasticsearch, and Pinecone. Our migration team can assist with complex migrations, ensuring zero data loss and minimal downtime during the transition.",
    category: "general",
  },
  {
    id: 9,
    question: "What support options are available?",
    answer: "MonkDB offers tiered support plans including Community (forums and documentation), Professional (24/7 email support, 4-hour response SLA), and Enterprise (dedicated support engineer, 1-hour response SLA, on-call escalation). All plans include access to our comprehensive documentation and video tutorials.",
    category: "pricing",
  },
  {
    id: 10,
    question: "How does pricing work?",
    answer: "MonkDB offers flexible pricing based on your needs. We provide a generous free tier for development and small projects, usage-based pricing for growing applications, and custom enterprise agreements for large-scale deployments. You only pay for the storage and compute resources you actually use, with no hidden fees.",
    category: "pricing",
  },
];

const categories = [
  { id: "general", label: "General", icon: FileText, description: "Basic information about MonkDB" },
  { id: "technical", label: "Technical", icon: Cpu, description: "Performance and architecture" },
  { id: "pricing", label: "Pricing", icon: DollarSign, description: "Plans and billing" },
  { id: "security", label: "Security", icon: Shield, description: "Data protection and compliance" },
];

const FAQItem = ({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className="border-b border-gray-800 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 px-6 flex items-center justify-between text-left group transition-colors hover:bg-white/[0.02]"
      >
        <span className={`text-base font-medium transition-colors pr-4 ${
          isOpen ? "text-white" : "text-gray-300 group-hover:text-white"
        }`}>
          {faq.question}
        </span>
        <div className={`flex-shrink-0 transition-colors ${
          isOpen ? "text-cyan-400" : "text-gray-500"
        }`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-gray-400 leading-relaxed text-sm">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQs = () => {
  const [openId, setOpenId] = useState<number | null>(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const faqsRef = useRef(null);
  const supportRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isCategoriesInView = useInView(categoriesRef, { once: true });
  const isFaqsInView = useInView(faqsRef, { once: true });
  const isSupportInView = useInView(supportRef, { once: true });

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === null || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 pb-16 overflow-hidden">
        {/* Background gradient glow */}
        <div className="absolute inset-0 flex items-start justify-center pt-20">
          <div className="w-[600px] h-[400px] bg-gradient-to-b from-purple-600/30 via-blue-600/20 to-transparent rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isHeroInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black border border-gray-800 mb-8"
            >
              <BookOpen className="w-7 h-7 text-white" />
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How can we help?
            </h1>

            {/* Subtext */}
            <p className="text-gray-400 mb-8">
              Discover solutions through our{" "}
              <span className="text-cyan-400 hover:underline cursor-pointer">documentation</span>,{" "}
              <span className="text-cyan-400 hover:underline cursor-pointer">guides</span>, and{" "}
              <span className="text-cyan-400 hover:underline cursor-pointer">community</span>
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#111] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
              />
            </div>

            {/* Help link */}
            <a href="#categories" className="text-cyan-400 text-sm hover:underline">
              Not sure what to search?
            </a>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} id="categories" className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCategoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gray-800 mb-6">
              <Monitor className="w-6 h-6 text-white" />
            </div>

            <p className="text-gray-500 mb-2">Browse by category</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Explore our knowledge base.
            </h2>
          </motion.div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              const count = faqs.filter(f => f.category === category.id).length;

              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCategoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`relative p-6 rounded-xl border text-left transition-all ${
                    isActive
                      ? "bg-white/5 border-cyan-500/50"
                      : "bg-[#111] border-gray-800 hover:border-gray-700"
                  }`}
                >
                  {/* Category Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isActive ? "bg-cyan-500/20" : "bg-white/5"
                    }`}>
                      <Icon className={`w-5 h-5 ${isActive ? "text-cyan-400" : "text-white"}`} />
                    </div>
                    <span className="text-white font-semibold">{category.label}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-4">{category.description}</p>

                  {/* Links */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                      <span>{count} Questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>Discussions</span>
                    </div>
                  </div>

                  {isActive && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCategoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className="px-6 py-3 rounded-full border border-gray-800 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              View All Questions
            </button>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section ref={faqsRef} className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFaqsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {activeCategory
                  ? `${categories.find(c => c.id === activeCategory)?.label} Questions`
                  : "Frequently Asked Questions"
                }
              </h2>
              <p className="text-gray-500">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? "question" : "questions"} available
              </p>
            </motion.div>

            {/* FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFaqsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#111] rounded-xl border border-gray-800 overflow-hidden"
            >
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openId === faq.id}
                    onToggle={() => handleToggle(faq.id)}
                  />
                ))
              ) : (
                <div className="py-12 text-center">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                  <p className="text-gray-500">No questions found matching your search.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section ref={supportRef} className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isSupportInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gray-800 mb-6">
              <Triangle className="w-6 h-6 text-white" />
            </div>

            <p className="text-gray-500 mb-2">If you need additional help</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Reach out on our official support platform.
            </h2>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-300">All systems normal.</span>
            </div>
          </motion.div>

          {/* Support Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* Community Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isSupportInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-6 rounded-xl bg-[#111] border border-gray-800"
            >
              <h3 className="text-white font-semibold mb-3">MonkDB Community</h3>
              <p className="text-gray-500 text-sm mb-6">
                Create a discussion and get help from like-minded developers.
              </p>
              <button className="w-full py-3 rounded-lg bg-white/5 border border-gray-800 text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                <Github className="w-4 h-4" />
                Go to GitHub
              </button>
            </motion.div>

            {/* Customer Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isSupportInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="p-6 rounded-xl bg-[#111] border border-gray-800"
            >
              <h3 className="text-white font-semibold mb-3">MonkDB Customer Support</h3>
              <p className="text-gray-500 text-sm mb-6">
                Sign in and submit a case directly from our support form.
              </p>
              <button className="w-full py-3 rounded-lg bg-white/5 border border-gray-800 text-white text-sm font-medium hover:bg-white/10 transition-colors">
                Sign In
              </button>
            </motion.div>

            {/* Contact Guide Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isSupportInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="p-6 rounded-xl bg-[#111] border border-gray-800"
            >
              <h3 className="text-white font-semibold mb-3">MonkDB Contact Guide</h3>
              <p className="text-gray-500 text-sm mb-6">
                Find help, if you do not have an account or you are unable to log in.
              </p>
              <button className="w-full py-3 rounded-lg bg-white/5 border border-gray-800 text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                Learn More
                <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FAQs;
