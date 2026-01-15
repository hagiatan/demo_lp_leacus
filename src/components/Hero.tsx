"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations('HomePage');

  return (
    <section className="relative h-[550px] md:h-[700px] border-b border-[var(--card-border)] overflow-hidden flex flex-col">
      {/* Background Image - Full Width */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/img3.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>



        {/* Overlay gradient - Darker for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between text-white">
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 }
              }
            }}
            className="max-w-3xl"
          >
            {/* Issue Number - Magazine Style */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
              className="flex items-center gap-4 mb-4 md:mb-8"
            >
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-white/80">
                Handcrafted
              </span>
              <span className="w-12 h-px bg-white/40" />
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-white/80">
                Est. 2025
              </span>
            </motion.div>

            {/* Main Headline - Clip Path Reveal */}
            <div className="overflow-hidden mb-2 md:mb-4">
              <motion.h1
                variants={{ hidden: { y: "100%" }, visible: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] md:leading-[1] text-white"
              >
                {t('title')}
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-8 md:mb-12">
              <motion.h1
                variants={{ hidden: { y: "100%" }, visible: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] md:leading-[1] text-white italic"
              >
                {t('subtitle')}
              </motion.h1>
            </div>

            {/* Subheadline */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
              className="text-base md:text-lg text-white/80 max-w-md mb-8 md:mb-12 leading-relaxed"
            >
              Elevate your timepiece with bespoke leather straps, meticulously handcrafted for style and durability.
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom Bar - Editorial Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="border-t border-white/20 px-6 md:px-12 lg:px-16 py-6"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-8">
              <span className="text-xs uppercase tracking-[0.2em] text-white/80">
                Featured
              </span>
              <span className="text-sm text-white">
                Cordovan Shell Strap
              </span>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-xs uppercase tracking-[0.2em] text-white/80">
                Starting at
              </span>
              <span className="text-sm font-medium text-white">
                $120.00
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
