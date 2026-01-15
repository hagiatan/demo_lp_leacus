"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";

export default function InstagramFeed() {
    const t = useTranslations('Instagram');
    const [currentIndex, setCurrentIndex] = useState(0);

    const posts = [
        { id: 1, image: "/images/img1.jpg", caption: "Vintage Vibe" },
        { id: 2, image: "/images/img2.jpg", caption: "Close up details" },
        { id: 3, image: "/images/img3.jpg", caption: "Craftsmanship" },
        { id: 4, image: "/images/img1.jpg", caption: "Daily Essentials" },
        { id: 5, image: "/images/img2.jpg", caption: "Workshop vibes" },
        { id: 6, image: "/images/img3.jpg", caption: "New Collection" },
    ];

    const visibleItems = 4;
    const maxIndex = Math.max(0, posts.length - visibleItems);

    const nextSlide = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    return (
        <section className="py-20 border-b border-[var(--card-border)] overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)]">
                        Instagram
                    </h2>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
                    >
                        {t('follow')} <Instagram size={16} />
                    </a>
                </div>

                <div className="relative group">
                    <button
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                        className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center text-[var(--foreground)] transition-all duration-300 ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        onClick={nextSlide}
                        disabled={currentIndex === maxIndex}
                        className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center text-[var(--foreground)] transition-all duration-300 ${currentIndex === maxIndex ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
                    >
                        <ChevronRight size={20} />
                    </button>

                    <div className="hidden md:block overflow-hidden">
                        <motion.div
                            className="flex gap-6"
                            animate={{ x: `-${currentIndex * (100 / visibleItems)}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] flex-shrink-0 group/insta cursor-pointer"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-[var(--section-bg)]">
                                        <Image
                                            src={post.image}
                                            alt={post.caption}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover/insta:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/insta:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <p className="text-white text-sm font-medium">#{post.caption.replace(/ /g, '')}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Mobile Scroll View */}
                    <div className="flex md:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory -mx-6 px-6 scrollbar-hide">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="min-w-[80vw] flex-shrink-0 snap-center group/insta cursor-pointer"
                            >
                                <div className="relative aspect-square overflow-hidden bg-[var(--section-bg)]">
                                    <Image
                                        src={post.image}
                                        alt={post.caption}
                                        fill
                                        className="object-cover transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/40 absolute flex items-end p-6">
                                        <p className="text-white text-sm font-medium">#{post.caption.replace(/ /g, '')}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
