"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BlogCarousel() {
    const t = useTranslations('Blog');
    const [currentIndex, setCurrentIndex] = useState(0);

    const posts = [
        {
            id: 1,
            category: t('category1'),
            title: t('title1'),
            date: "January 2, 2026",
            image: "/images/img1.jpg",
            excerpt: t('excerpt1')
        },
        {
            id: 2,
            category: t('category2'),
            title: t('title2'),
            date: "December 22, 2025",
            image: "/images/img2.jpg",
            excerpt: t('excerpt2')
        },
        {
            id: 3,
            category: t('category3'),
            title: t('title3'),
            date: "December 12, 2025",
            image: "/images/img3.jpg",
            excerpt: t('excerpt3')
        },
        {
            id: 4,
            category: t('category1'),
            title: t('title4'),
            date: "November 28, 2025",
            image: "/images/img2.jpg",
            excerpt: t('excerpt4')
        },
        {
            id: 5,
            category: t('category2'),
            title: t('title5'),
            date: "November 15, 2025",
            image: "/images/img1.jpg",
            excerpt: t('excerpt5')
        },
        {
            id: 6,
            category: t('category3'),
            title: t('title6'),
            date: "November 05, 2025",
            image: "/images/img3.jpg",
            excerpt: t('excerpt6')
        },
        {
            id: 7,
            category: t('category2'),
            title: t('title7'),
            date: "October 24, 2025",
            image: "/images/img1.jpg",
            excerpt: t('excerpt7')
        },
        {
            id: 8,
            category: t('category1'),
            title: t('title8'),
            date: "October 10, 2025",
            image: "/images/img2.jpg",
            excerpt: t('excerpt8')
        },
        {
            id: 9,
            category: t('category3'),
            title: t('title9'),
            date: "October 01, 2025",
            image: "/images/img3.jpg",
            excerpt: t('excerpt9')
        }
    ];

    // Number of items to show at once
    const visibleItems = 3;
    // Calculate max index to prevent overscrolling. 
    const maxIndex = Math.max(0, posts.length - visibleItems);

    const nextSlide = () => {
        // Jump by visibleItems (3) but do not exceed maxIndex
        setCurrentIndex((prev) => {
            const next = prev + visibleItems;
            return next > maxIndex ? maxIndex : next;
        });
    };

    const prevSlide = () => {
        // Jump backward by visibleItems (3) but do not go below 0
        setCurrentIndex((prev) => Math.max(prev - visibleItems, 0));
    };

    return (
        <section className="py-20 border-b border-[var(--card-border)] overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)]">
                        {t('heading')}
                    </h2>
                    <Link
                        href="/journal"
                        className="hidden md:block text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors underline underline-offset-4"
                    >
                        {t('viewAll')}
                    </Link>
                </div>

                {/* Carousel */}
                <div className="relative group">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[var(--foreground)] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none hover:scale-110`}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextSlide}
                        disabled={currentIndex >= maxIndex}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[var(--foreground)] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none hover:scale-110`}
                    >
                        <ChevronRight size={24} />
                    </button>


                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-8"
                            animate={{ x: `calc(-${currentIndex} * (100% + 32px) / ${visibleItems})` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="w-full md:w-[calc(50%-16px)] lg:w-[calc((100%-64px)/3)] flex-shrink-0 group/card cursor-pointer"
                                >
                                    <div className="relative aspect-[3/2] overflow-hidden mb-6 bg-[var(--section-bg)]">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                                        />
                                        {/* Play icon overlay style from reference */}
                                        <div className="absolute inset-0 bg-black/10 group-hover/card:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/card:opacity-100 duration-300">
                                            <PlayCircle className="text-white w-12 h-12 opacity-80" strokeWidth={1.5} />
                                        </div>
                                    </div>

                                    <div className="flex flex-col h-[180px]"> {/* Fixed height container for text uniformity */}
                                        <div className="mb-3">
                                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[var(--text-secondary)]">
                                                {post.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-serif text-[var(--foreground)] leading-tight mb-3 group-hover/card:text-[var(--text-secondary)] transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-xs text-[var(--text-secondary)] mb-4">
                                            {post.date}
                                        </p>
                                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link
                        href="/journal"
                        className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors underline underline-offset-4"
                    >
                        {t('viewAll')}
                    </Link>
                </div>
            </div>
        </section>
    );
}
