import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Monk DB transformed our data infrastructure. We consolidated 5 different databases into one unified platform, reducing costs by 60%.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechScale Inc.",
    avatar: "SC",
  },
  {
    quote: "The sub-millisecond latency is game-changing for our real-time analytics. Our team can now make decisions in seconds, not hours.",
    author: "Marcus Johnson",
    role: "VP Engineering",
    company: "DataFlow Systems",
    avatar: "MJ",
  },
  {
    quote: "Best developer experience I've seen in a database platform. The SDKs are intuitive, documentation is excellent, and support is world-class.",
    author: "Emily Rodriguez",
    role: "Lead Developer",
    company: "InnovateTech",
    avatar: "ER",
  },
  {
    quote: "Enterprise security without compromising performance. Monk DB checks all our compliance boxes while delivering blazing-fast queries.",
    author: "David Kim",
    role: "CISO",
    company: "SecureFinance Corp",
    avatar: "DK",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-card relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,255,0.05)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6">
            <span className="text-sm text-primary font-medium">Testimonials</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Loved by <span className="gradient-text">Developers</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what industry leaders are saying about Monk DB
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10 w-12 h-12 rounded-full glass-card border border-border hover:border-primary/50 flex items-center justify-center transition-all duration-300 hover:glow-primary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10 w-12 h-12 rounded-full glass-card border border-border hover:border-primary/50 flex items-center justify-center transition-all duration-300 hover:glow-primary"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            {/* Testimonial Card */}
            <div className="glass-card rounded-3xl p-8 md:p-12 min-h-[300px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <Quote className="w-10 h-10 text-primary/30 mx-auto mb-6" />
                  
                  <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>

                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                      {testimonials[currentIndex].avatar}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">
                        {testimonials[currentIndex].author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
