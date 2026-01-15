"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CraftsmanshipProcess() {
    const t = useTranslations('Process');
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const steps = [
        {
            id: 1,
            title: t('step1'),
            description: t('desc1'),
            image: "/images/img1.jpg"
        },
        {
            id: 2,
            title: t('step2'),
            description: t('desc2'),
            image: "/images/img2.jpg"
        },
        {
            id: 3,
            title: t('step3'),
            description: t('desc3'),
            image: "/images/img3.jpg"
        },
        {
            id: 4,
            title: t('step4'),
            description: t('desc4'),
            image: "/images/img1.jpg"
        },
        {
            id: 5,
            title: t('step5'),
            description: t('desc5'),
            image: "/images/img2.jpg"
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % steps.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + steps.length) % steps.length);
    };

    // Helper to determine order relative to current index
    const getOrder = (index: number) => {
        const len = steps.length;
        // Calculate distance from current index in circular manner
        let diff = (index - currentIndex + len) % len;
        // We want to center the current index. 
        // If diff is 0 -> Center
        // If diff is 1 -> Right
        // If diff is len-1 -> Left
        // etc.

        // Adjust diff to be centered around 0
        if (diff > len / 2) diff -= len;

        return diff;
    };

    return (
        <section className="py-20 bg-[var(--background)] overflow-hidden relative">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-4">
                    {t('subtitle')}
                </p>
                <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)]">
                    {t('title')}
                </h2>
            </div>

            {/* Swiper Container */}
            <div className="relative h-[600px] w-full flex items-center justify-center perspective-[1000px]">
                {/* Navigation - Absolute Center Vertical */}
                <button
                    onClick={prevSlide}
                    className="absolute left-6 md:left-12 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-[var(--foreground)] hover:scale-110 transition-transform"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-6 md:right-12 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-[var(--foreground)] hover:scale-110 transition-transform"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Cards */}
                <div className="relative w-full max-w-4xl h-[400px]">
                    {steps.map((step, index) => {
                        const position = getOrder(index);
                        const isCenter = position === 0;
                        const isLeft = position === -1 || position === (steps.length - 1); // rough adj used in UI visual
                        const isRight = position === 1 || position === -(steps.length - 1);

                        // Only render visible items (prev, current, next) to avoid clutter, 
                        // but for smooth infinite circular loop in simple code, rendering all with logic is easier.

                        // Simpler circular logic:
                        // We need 3 visible: center, left, right. Others hidden or stacked.
                        let xOff = "0%";
                        let scale = 0.8;
                        let opacity = 0;
                        let zIndex = 0;

                        if (position === 0) {
                            xOff = "0%";
                            scale = 1.15; // Increased scale for prominence
                            opacity = 1;
                            zIndex = 10;
                        } else if (position === 1) {
                            xOff = "55%"; // Slightly tighter overlap
                            scale = 0.85;
                            opacity = 0.4; // Faded
                            zIndex = 5;
                        } else if (position === -1) {
                            xOff = "-55%";
                            scale = 0.85;
                            opacity = 0.4;
                            zIndex = 5;
                        } else if (position === 2) {
                            xOff = "100%";
                            scale = 0.6;
                            opacity = 0;
                            zIndex = 1;
                        } else if (position === -2) {
                            xOff = "-100%";
                            scale = 0.6;
                            opacity = 0;
                            zIndex = 1;
                        }

                        return (
                            <motion.div
                                key={step.id}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = Math.abs(offset.x) * velocity.x;

                                    if (swipe < -10000) {
                                        nextSlide();
                                    } else if (swipe > 10000) {
                                        prevSlide();
                                    }
                                }}
                                initial={false}
                                animate={{
                                    x: xOff,
                                    scale: scale,
                                    opacity: opacity,
                                    zIndex: zIndex
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute top-0 left-0 right-0 mx-auto w-[85%] md:w-[65%] lg:w-[55%] h-[480px] bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col touch-pan-y"
                                style={{
                                    transformOrigin: 'center center',
                                    filter: isCenter ? 'blur(0px)' : 'blur(2px)'
                                }}
                            >
                                <div className="relative h-[65%] w-full bg-[var(--section-bg)] pointer-events-none">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                                        Step 0{step.id}
                                    </div>
                                </div>
                                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center items-center text-center pointer-events-none">
                                    <h3 className="text-xl md:text-2xl font-serif text-[var(--foreground)] mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Progress Bar - Minimalist Style */}
            <div className="max-w-sm mx-auto px-6 mt-24 flex items-center gap-5">
                <span className="text-sm font-serif text-[var(--foreground)] w-6 text-right tabular-nums">
                    0{currentIndex + 1}
                </span>

                <div className="flex-1 h-[2px] bg-[var(--card-border)] relative overflow-hidden rounded-full">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-[var(--foreground)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                </div>

                <span className="text-sm font-serif text-[var(--text-secondary)] w-6 tabular-nums opacity-50">
                    0{steps.length}
                </span>
            </div>
        </section>
    );
}
