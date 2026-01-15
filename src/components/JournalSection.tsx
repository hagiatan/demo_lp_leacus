"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

const journalPosts = [
  {
    id: 1,
    date: "Oct 6, 2023",
    title: "So You've Bought Cosmetics... Now What?",
    slug: "so-youve-bought-cosmetics-now-what",
  },
  {
    id: 2,
    date: "Oct 9, 2023",
    title: "Candle Fragrance Poll of the Day",
    slug: "candle-fragrance-poll-of-the-day",
  },
  {
    id: 3,
    date: "Oct 1, 2023",
    title: "Top 10 Fragrance for Holiday Gifts",
    slug: "top-10-fragrance-for-holiday-gifts",
  },
];

export default function JournalSection() {
  return (
    <section className="border-b border-[var(--card-border)]">
      {/* Header */}
      <div className="flex justify-between items-center px-8 md:px-12 lg:px-24 py-12 border-b border-[var(--card-border)]">
        <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)]">
          Our Journal
        </h2>
        <Link
          href="/journal"
          className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors underline underline-offset-4"
        >
          Visit Journal
        </Link>
      </div>

      {/* Posts List */}
      <div className="px-8 md:px-12 lg:px-24">
        <div>
          {journalPosts.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.slug}`}
              className="block group border-b border-[var(--card-border)] last:border-b-0"
            >
              <div className="flex flex-col md:flex-row md:items-center py-8 gap-4 md:gap-12">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] w-32 shrink-0">
                  {post.date}
                </p>
                <div className="flex-1 flex justify-between items-center">
                  <h3 className="font-serif text-xl md:text-2xl text-[var(--foreground)] leading-tight group-hover:text-[var(--text-secondary)] transition-colors">
                    {post.title}
                  </h3>
                  <ArrowRight
                    size={20}
                    className="text-[var(--foreground)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
