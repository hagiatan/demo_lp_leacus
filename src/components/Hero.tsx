"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations('HomePage');

  return (
    <section className="relative min-h-[calc(100vh-5rem)] border-b border-[var(--card-border)] overflow-hidden">
      {/* Background Image - Full Width */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>



        {/* Overlay gradient - Reduced opacity for better video visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/70 via-[var(--background)]/30 to-transparent" />

      </div>

      {/* Content */}
      <div className="relative z-10 h-full min-h-[calc(100vh-5rem)] flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="max-w-3xl"
          >
            {/* Issue Number - Magazine Style */}
            <div className="flex items-center gap-4 mb-4 md:mb-8">
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-[var(--text-secondary)]">
                Handcrafted
              </span>
              <span className="w-12 h-px bg-[var(--card-border)]" />
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-[var(--text-secondary)]">
                Est. 2025
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1] md:leading-[0.9] text-[var(--foreground)] mb-2 md:mb-4">
              {t('title')}
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1] md:leading-[0.9] text-[var(--foreground)] mb-8 md:mb-12 italic">
              {t('subtitle')}
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-md mb-8 md:mb-12 leading-relaxed">
              Elevate your timepiece with bespoke leather straps, meticulously handcrafted for style and durability.
            </p>

            {/* CTA */}
            {/* <Link href="/shop" className="inline-flex items-center gap-3 group">
              <span className="text-sm uppercase tracking-[0.2em] font-medium text-[var(--foreground)] group-hover:text-[var(--text-secondary)] transition-colors">
                Explore Collection
              </span>
              <ArrowDownRight
                size={20}
                className="text-[var(--foreground)] group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"
              />
            </Link> */}
          </motion.div>
        </div>

        {/* Bottom Bar - Editorial Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="border-t border-[var(--card-border)] px-6 md:px-12 lg:px-16 py-6"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-8">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                Featured
              </span>
              <span className="text-sm text-[var(--foreground)]">
                Cordovan Shell Strap
              </span>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                Starting at
              </span>
              <span className="text-sm font-medium text-[var(--foreground)]">
                $120.00
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
