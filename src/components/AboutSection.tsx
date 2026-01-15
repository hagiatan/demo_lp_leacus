"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blurDataURL } from "@/lib/image";

export default function AboutSection() {
  return (
    <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
      {/* Left: Content */}
      <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-6">
          Our Story
        </p>

        <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-6 leading-tight">
          Crafted with passion, <span className="italic block mt-2">inspired by heritage</span>
        </h2>

        <p className="text-[var(--text-secondary)] mb-8 font-light leading-relaxed">
          We believe in the art of leather crafting. Each strap is meticulously cut, stitched, and finished by hand, ensuring a unique character that develops a beautiful patina over time.
        </p>

        <Link
          href="/about"
          className="group/link inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors"
        >
          <span className="underline underline-offset-4">Learn more about us</span>
          <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>

      {/* Right: Video */}
      <div className="w-full lg:w-2/3 relative min-h-[500px] lg:min-h-[600px] overflow-hidden group">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/img1.jpg"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        >
          <source src="/videos/story.mp4" type="video/mp4" />
        </video>
        {/* Cinematic dark overlay for better contrast if needed, but keeping it clean for now */}
        <div className="absolute inset-0 bg-black/10" />
      </div>
    </section>
  );
}
