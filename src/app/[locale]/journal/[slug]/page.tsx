"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { getArticleBySlug, getRelatedArticles } from "@/data/articles";
import { blurDataURL } from "@/lib/image";

export default function ArticlePage() {
  const params = useParams();
  const article = getArticleBySlug(params.slug as string);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug, article.category);

  return (
    <article className="flex flex-col border-b border-[var(--card-border)] bg-[var(--background)]">
      {/* Header Section - 1/3 + 2/3 Layout */}
      <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
        {/* Left: Meta Info - 1/3 */}
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)] bg-[var(--background)]">
          <Link
            href="/journal"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Journal
          </Link>

          <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-4 block">
            {article.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-serif text-[var(--foreground)] mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-[var(--text-secondary)] font-light mb-8">
            <span>{article.date}</span>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{article.readTime} read</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--section-bg)] flex items-center justify-center text-[var(--foreground)] font-serif font-medium">
              {article.author?.[0] || "A"}
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">{article.author || "Aluna Team"}</p>
              <p className="text-xs text-[var(--text-secondary)] font-light">{article.role || "Editor"}</p>
            </div>
          </div>
        </div>

        {/* Right: Featured Image - 2/3 */}
        <div className="w-full lg:w-2/3 relative min-h-[400px] lg:min-h-[600px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="flex flex-col lg:flex-row">
        {/* Left: Share/Sticky Sidebar - 1/3 */}
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-12 lg:py-20 border-b lg:border-b-0 lg:border-r border-[var(--card-border)] bg-[var(--background)]">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-6">
              Share Article
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-[var(--card-border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors">
                <Facebook size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-[var(--card-border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors">
                <Twitter size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-[var(--card-border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors">
                <Linkedin size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-[var(--card-border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Article Content - 2/3 */}
        <div className="w-full lg:w-2/3 px-6 md:px-12 lg:px-16 py-12 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl font-serif text-[var(--foreground)] italic mb-10 leading-relaxed border-l border-[var(--card-border)] pl-4 md:pl-6">
              {article.excerpt}
            </p>

            <div
              className="prose prose-lg max-w-none
                         prose-headings:font-serif prose-headings:text-[var(--foreground)]
                         prose-p:mt-0 prose-p:mb-6 prose-p:text-[var(--text-secondary)] prose-p:text-sm md:prose-p:text-base prose-p:leading-relaxed
                         prose-ul:mt-0 prose-ul:mb-6 prose-li:my-1.5
                         prose-a:text-[var(--foreground)]
                         prose-img:rounded-sm"
              dangerouslySetInnerHTML={{ __html: article.content || "" }}
            />
          </div>
        </div>
      </section>

      {/* Related Articles - Only show if there are any */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-[var(--card-border)]">
          <div className="px-6 md:px-12 lg:px-16 py-16">
            <h2 className="text-3xl font-serif text-[var(--foreground)] mb-12">
              More Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((item) => (
                <Link key={item.slug} href={`/journal/${item.slug}`} className="group block">
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-[var(--section-bg)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[var(--background)] text-[var(--foreground)] text-[10px] uppercase tracking-[0.2em] font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-serif text-[var(--foreground)] mb-3 group-hover:italic transition-all">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] uppercase tracking-[0.1em]">
                    <span>{item.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
