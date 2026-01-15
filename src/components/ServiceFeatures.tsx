"use client";

import { Globe, ShieldCheck, Mail, Ruler } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function ServiceFeatures() {
    const t = useTranslations('Services');

    const features = [
        {
            icon: <Globe size={32} strokeWidth={1.5} />,
            title: t('shipping'),
            description: t('shippingDesc'),
        },
        {
            icon: <ShieldCheck size={32} strokeWidth={1.5} />,
            title: t('warranty'),
            description: t('warrantyDesc'),
        },
        {
            icon: <Mail size={32} strokeWidth={1.5} />,
            title: t('support'),
            description: t('supportDesc'),
        },
        {
            icon: <Ruler size={32} strokeWidth={1.5} />,
            title: t('bespoke'),
            description: t('bespokeDesc'),
        },
    ];

    return (
        <section className="border-t border-b border-[var(--card-border)] bg-[var(--background)] py-16 md:py-20">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                            }}
                            whileHover={{ y: -5 }}
                            className="flex flex-col items-center group cursor-default"
                        >
                            <div className="mb-6 text-[var(--foreground)] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-medium text-[var(--foreground)] mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[250px] mx-auto">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
