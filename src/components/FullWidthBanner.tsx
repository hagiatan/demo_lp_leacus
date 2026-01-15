"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blurDataURL } from "@/lib/image";

export default function FullWidthBanner() {
  return (
    <section className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden border-b border-[var(--card-border)] group">
      {/* Background Image with Parallax-like scale effect on hover */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/img3.jpg"
          alt="Limited Edition Collection"
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-105 will-change-transform"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      {/* Content - Floating Centered Card */}
      <div className="relative z-10 w-full max-w-4xl px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm md:text-base uppercase tracking-[0.4em] font-medium text-white/80 mb-6">
            Limited Edition
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-none">
            Timeless <span className="italic">Elegance</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover our curated collection of premium leather straps designed to elevate your favorite timepiece. Only 50 pieces available worldwide.
          </p>

          <Link
            href="/shop?category=limited"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 group/btn"
          >
            <span className="text-sm uppercase tracking-[0.2em] font-medium">Explore Collection</span>
            <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
