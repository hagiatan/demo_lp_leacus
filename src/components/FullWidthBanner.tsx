"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blurDataURL } from "@/lib/image";

export default function FullWidthBanner() {
  return (
    <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
      {/* Left: Content */}
      <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-6">
          Limited Edition
        </p>

        <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-6 leading-tight">
          Timeless <span className="italic block mt-2">Elegance</span>
        </h2>

        <p className="text-[var(--text-secondary)] mb-8 font-light leading-relaxed">
          Discover our curated collection of premium leather straps designed to elevate your favorite timepiece.
        </p>

        <Link
          href="/shop"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors"
        >
          <span className="underline underline-offset-4">Explore Collection</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Right: Image */}
      <div className="w-full lg:w-2/3 relative min-h-[400px] lg:min-h-[600px] overflow-hidden group">
        <Image
          src="/images/img3.jpg"
          alt="Leather strap lifestyle"
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
    </section>
  );
}
