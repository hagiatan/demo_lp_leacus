"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Instagram, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const posts = [
    { id: 1, image: "/images/img1.jpg", caption: "Vintage Vibe" },
    { id: 2, image: "/images/img2.jpg", caption: "Close up details" },
    { id: 3, image: "/images/img3.jpg", caption: "Craftsmanship" },
    { id: 4, image: "/images/img1.jpg", caption: "Daily Essentials" },
    { id: 5, image: "/images/img2.jpg", caption: "Workshop vibes" },
    { id: 6, image: "/images/img3.jpg", caption: "New Collection" },
];

// Duplicate posts to create seamless loop
const marqueePosts = [...posts, ...posts, ...posts];

export default function InstagramFeed() {
    const t = useTranslations('Instagram');

    return (
        <section className="py-24 border-b border-[var(--card-border)] overflow-hidden bg-[var(--background)]">
            {/* Header */}
            <div className="text-center mb-16 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-[var(--text-secondary)] uppercase mb-4">
                        <Instagram size={16} />
                        {t('follow')}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-6">
                        @leacus.official
                    </h2>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors border-b border-[var(--foreground)] pb-1"
                    >
                        View Profile <ArrowRight size={14} />
                    </a>
                </motion.div>
            </div>

            {/* Marquee Container - Dual Rows */}
            <div className="flex flex-col gap-4 md:gap-8">
                {/* Row 1 - Scroll Left */}
                <div className="relative w-full overflow-hidden">
                    <motion.div
                        className="flex gap-4 md:gap-8 w-max"
                        animate={{ x: ["0%", "-33.33%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30, // Adjust speed here
                        }}
                    >
                        {marqueePosts.map((post, idx) => (
                            <a
                                key={`row1-${idx}`}
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group block w-[200px] h-[200px] md:w-[300px] md:h-[300px] aspect-square flex-shrink-0 overflow-hidden bg-[var(--section-bg)]"
                            >
                                <Image
                                    src={post.image}
                                    alt={post.caption}
                                    fill
                                    sizes="(max-width: 768px) 200px, 300px"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Instagram className="text-white drop-shadow-md" size={32} />
                                </div>
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Row 2 - Scroll Right */}
                <div className="relative w-full overflow-hidden">
                    <motion.div
                        className="flex gap-4 md:gap-8 w-max"
                        animate={{ x: ["-33.33%", "0%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 35, // Slightly different speed for variation
                        }}
                    >
                        {marqueePosts.map((post, idx) => (
                            <a
                                key={`row2-${idx}`}
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group block w-[200px] h-[200px] md:w-[300px] md:h-[300px] aspect-square flex-shrink-0 overflow-hidden bg-[var(--section-bg)]"
                            >
                                <Image
                                    src={post.image}
                                    alt={post.caption}
                                    fill
                                    sizes="(max-width: 768px) 200px, 300px"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Instagram className="text-white drop-shadow-md" size={32} />
                                </div>
                            </a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
