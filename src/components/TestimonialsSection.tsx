"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronUp, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TestimonialsSection() {
  const t = useTranslations('Testimonials');

  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      location: "New York",
      rating: 5,
      text: t('review1'),
    },
    {
      id: 2,
      name: "James L.",
      location: "London",
      rating: 5,
      text: t('review2'),
    },
    {
      id: 3,
      name: "Emily R.",
      location: "Paris",
      rating: 5,
      text: t('review3'),
    },
    {
      id: 4,
      name: "Michael B.",
      location: "Berlin",
      rating: 5,
      text: "Exceptional craftsmanship. The leather feels incredibly premium and ages beautifully.",
    },
    {
      id: 5,
      name: "David K.",
      location: "Tokyo",
      rating: 5,
      text: "Fast shipping and the packaging was luxurious. A perfect gift for myself.",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
      {/* Left: Header */}
      <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-4">
          {t('subtitle')}
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-6 leading-tight">
          {t('title')}
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" className="text-[var(--foreground)]" />
            ))}
          </div>
          <span className="text-sm text-[var(--text-secondary)]">4.9 average</span>
        </div>
      </div>

      {/* Right: Vertical Manual Scroll Carousel */}
      <div className="w-full lg:w-2/3 h-[500px] relative overflow-hidden bg-[var(--background)] flex items-center justify-center">
        {/* Gradients to mask top/bottom edges */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[var(--background)] to-transparent z-10 pointer-events-none" />

        {/* Navigation Controls */}
        {/* Navigation Controls */}
        <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-4">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-[var(--card-border)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all disabled:opacity-50"
            aria-label="Previous testimonial"
          >
            <ChevronUp size={20} />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-[var(--card-border)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all disabled:opacity-50"
            aria-label="Next testimonial"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            {[-1, 0, 1].map((offset) => {
              const cardIndex = (currentIndex + offset + testimonials.length) % testimonials.length;
              const testimonial = testimonials[cardIndex];
              const isActive = offset === 0;

              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: offset * 180 + (offset > 0 ? 100 : -100) }}
                  animate={{
                    opacity: isActive ? 1 : 0.3,
                    scale: isActive ? 1 : 0.85,
                    y: offset * 160,
                    zIndex: isActive ? 10 : 0,
                    filter: isActive ? "blur(0px)" : "blur(3px)",
                  }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute w-full px-12 md:px-24 flex flex-col items-center text-center cursor-grab active:cursor-grabbing"
                  style={{ top: "40%", y: "-50%" }} // Centered layout
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = offset.y > 50; // swipe down (prev)
                    const swipeUp = offset.y < -50; // swipe up (next)
                    if (swipe) handlePrev();
                    else if (swipeUp) handleNext();
                  }}
                >
                  <div className="flex gap-1 mb-4 justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" className="text-[var(--foreground)]" />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-3xl font-serif text-[var(--foreground)] leading-tight mb-6 max-w-2xl">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 justify-center">
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                      — {testimonial.location}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
