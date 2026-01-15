"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { blurDataURL } from "@/lib/image";
import { articles } from "@/data/articles";

export default function JournalPage() {
  const featuredArticle = articles.find((a) => a.featured);
  const regularArticles = articles.filter((a) => !a.featured);

  return (
    <div className="flex flex-col">
      {/* Page Header - Editorial Style */}
      <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 lg:py-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left"
          >
            <p className="text-xs uppercase tracking-[0.3em] mb-6 text-[var(--text-secondary)]">Our Journal</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--foreground)] mb-6 leading-none">
              Stories & <span className="italic block mt-2">Insights</span>
            </h1>
            <p className="text-[var(--text-secondary)] font-light leading-relaxed max-w-sm">
              Explore the world of luxury candle rituals and home fragrance through our curated stories.
            </p>
          </motion.div>
        </div>
        {/* Hero Image Right Side - 2/3 */}
        <div className="hidden lg:block w-full lg:w-2/3 relative min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1758077223826-74f8ec22ebfd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Aluna candle journal scene"
            fill
            sizes="66vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </section>

      {/* Featured Article - 1/3 Content + 2/3 Image */}
      {featuredArticle && (
        <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
          {/* Left: Content - 1/3 */}
          <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)] bg-[var(--background)]">
            <Link href={`/journal/${featuredArticle.slug}`} className="group block">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[var(--text-secondary)] text-xs uppercase tracking-[0.2em]">{featuredArticle.category}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--card-border)]"></span>
                <span className="flex items-center gap-1 text-[var(--text-secondary)] text-xs uppercase tracking-[0.2em]">
                  <Clock size={12} />
                  {featuredArticle.readTime} read
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--foreground)] mb-6 group-hover:opacity-70 transition-opacity leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-[var(--text-secondary)] mb-8 text-base md:text-lg font-light leading-relaxed line-clamp-3">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-2 text-[var(--foreground)] text-sm uppercase tracking-[0.2em] font-medium group-hover:gap-4 transition-all">
                Read Article
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>

          {/* Right: Image - 2/3 */}
          <div className="w-full lg:w-2/3 relative min-h-[500px]">
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
        </section>
      )}

      {/* Regular Articles Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)] border-b border-[var(--card-border)]">
        {regularArticles.map((article, index) => (
          <motion.article
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-[var(--background)] group relative h-full flex flex-col border-b md:border-b-0 border-[var(--card-border)] last:border-b-0"
          >
            <Link href={`/journal/${article.slug}`} className="flex flex-col h-full">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--card-border)]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[var(--text-secondary)] text-xs uppercase tracking-[0.2em]">{article.category}</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--card-border)]"></span>
                  <span className="flex items-center gap-1 text-[var(--text-secondary)] text-xs uppercase tracking-[0.2em]">
                    <Clock size={12} />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-[var(--foreground)] mb-3 group-hover:opacity-70 transition-opacity leading-tight">
                  {article.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 flex-1 font-light line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[var(--foreground)] text-xs uppercase tracking-[0.2em] font-medium mt-auto group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
