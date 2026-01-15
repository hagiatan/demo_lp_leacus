"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Palette, Scissors } from "lucide-react";
import { blurDataURL } from "@/lib/image";
import { useTranslations } from "next-intl";

export default function StrapCustomizerTeaser() {
    const t = useTranslations('Customizer');

    const steps = [
        {
            id: 1,
            title: t('step1'),
            image: "/images/img1.jpg"
        },
        {
            id: 2,
            title: t('step2'),
            image: "/images/img2.jpg"
        },
        {
            id: 3,
            title: t('step3'),
            image: "/images/img3.jpg"
        }
    ];

    return (
        <section className="flex flex-col border-b border-[var(--card-border)] bg-[var(--background)]">
            {/* Header */}
            <div className="px-6 md:px-12 lg:px-16 py-16 md:py-20 text-center max-w-4xl mx-auto">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-6">
                    {t('subtitle')}
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--foreground)] mb-8 leading-tight">
                    {t('title')}
                </h2>
                <p className="text-[var(--text-secondary)] font-light leading-relaxed text-lg max-w-2xl mx-auto mb-10">
                    {t('description')}
                </p>

                <Link
                    href="/customizer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-white text-sm uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
                >
                    {t('cta')}
                    <ArrowRight size={18} />
                </Link>
            </div>

            {/* Visual Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)] border-t border-[var(--card-border)]">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative aspect-[3/4] md:aspect-[4/5] overflow-hidden"
                    >
                        <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            placeholder="blur"
                            blurDataURL={blurDataURL}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                        {/* Content Positioned Absolute */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-2 block opacity-80">
                                Step 0{step.id}
                            </span>
                            <h3 className="text-2xl font-serif">{step.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
