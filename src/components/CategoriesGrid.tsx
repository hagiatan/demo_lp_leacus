"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blurDataURL } from "@/lib/image";

const categories = [
  {
    name: "Classic Leather",
    slug: "leather",
    description: "Timeless leather straps for dress and everyday watches.",
    image: "/images/img2.jpg",
  },
  {
    name: "Exotic Skins",
    slug: "exotic",
    description: "Premium alligator, lizard, and ostrich leathers.",
    image: "/images/img3.jpg",
  },
  {
    name: "Sport & Rubber",
    slug: "rubber",
    description: "Durable straps for diving and active lifestyles.",
    image: "/images/img1.jpg",
  },
];

export default function CategoriesGrid() {
  return (
    <section className="border-b border-[var(--card-border)]">
      {/* Header - Top Aligned */}
      <div className="px-6 md:px-12 lg:px-16 py-12 md:py-16 border-b border-[var(--card-border)] flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-4">
            Browse Collection
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] leading-tight">
            Shop by Material
          </h2>
        </div>
        <Link
          href="/shop?category=leather"
          className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors underline underline-offset-4"
        >
          View All Straps
        </Link>
      </div>

      <div className="group/bento grid grid-cols-1 md:grid-cols-3 min-h-[800px] border-b border-[var(--card-border)]">
        {/* Large Feature Item (Left) - Classic Leather */}
        <Link
          href={`/shop?category=${categories[0].slug}`}
          className="md:col-span-2 relative border-b md:border-b-0 md:border-r border-[var(--card-border)] overflow-hidden group/item transition-all duration-500 group-hover/bento:opacity-40 hover:!opacity-100"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={categories[0].image}
              alt={categories[0].name}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-1000 group-hover/item:scale-105"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
            <div className="absolute inset-0 bg-black/20 group-hover/item:bg-black/10 transition-colors duration-500" />

            {/* Gradient Overlay for Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
            <div className="flex justify-between items-end">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="inline-block px-3 py-1 mb-4 text-[10px] font-medium tracking-[0.2em] text-white uppercase border border-white/30 backdrop-blur-sm"
                >
                  Best Seller
                </motion.span>
                <h3 className="text-4xl md:text-5xl font-serif text-white mb-3">
                  {categories[0].name}
                </h3>
                <p className="text-white/80 max-w-md text-sm md:text-base leading-relaxed">
                  {categories[0].description}
                </p>
              </div>
              <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white group-hover/item:bg-white group-hover/item:text-black transition-all duration-300">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </Link>

        {/* Right Column - Stacked Items */}
        <div className="md:col-span-1 flex flex-col">
          {/* Top Small Item - Exotic Skins */}
          <Link
            href={`/shop?category=${categories[1].slug}`}
            className="flex-1 relative border-b border-[var(--card-border)] overflow-hidden group/item transition-all duration-500 group-hover/bento:opacity-40 hover:!opacity-100 min-h-[400px]"
          >
            <div className="absolute inset-0">
              <Image
                src={categories[1].image}
                alt={categories[1].name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover/item:scale-105"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-8">
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                {categories[1].name}
              </h3>
              <p className="text-white/80 text-sm line-clamp-2">
                {categories[1].description}
              </p>
            </div>
          </Link>

          {/* Bottom Small Item - Sport & Rubber */}
          <Link
            href={`/shop?category=${categories[2].slug}`}
            className="flex-1 relative overflow-hidden group/item transition-all duration-500 group-hover/bento:opacity-40 hover:!opacity-100 min-h-[400px]"
          >
            <div className="absolute inset-0">
              <Image
                src={categories[2].image}
                alt={categories[2].name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover/item:scale-105"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-8">
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                {categories[2].name}
              </h3>
              <p className="text-white/80 text-sm line-clamp-2">
                {categories[2].description}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
