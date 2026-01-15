"use client";

import { Globe, ShieldCheck, Mail, Ruler } from "lucide-react";
import { useTranslations } from "next-intl";

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="mb-6 text-[var(--foreground)]">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-medium text-[var(--foreground)] mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[250px] mx-auto">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
