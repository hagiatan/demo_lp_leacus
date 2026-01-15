"use client";


import { motion } from "framer-motion";
import { useTranslations } from "next-intl";



export default function MarqueeBanner() {
  const t = useTranslations('Marquee');

  const marqueeItems = [
    t('item1'),
    t('item2'),
    t('item3'),
    t('item4'),
  ];

  return (
    <div className="border-b border-[var(--card-border)] bg-[var(--background)] text-[var(--foreground)] py-4 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 50,
            ease: "linear",
          },
        }}
      >
        {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="mx-8 text-xs uppercase tracking-[0.2em] font-medium">
              {item}
            </span>
            <span className="text-[var(--text-secondary)] mx-4">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
