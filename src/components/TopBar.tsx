'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from '@/i18n/routing';

const announcements = [
    "Free shipping worldwide from $450",
    "Accepted returns & refunds in 30 days"
];

export default function TopBar() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % announcements.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-[#1C1C2E] text-white text-[10px] md:text-xs font-medium tracking-wide z-50 relative">
            <div className="max-w-[1600px] mx-auto w-full h-10 px-6 md:px-12 lg:px-16 flex items-center justify-between relative">

                {/* Left: Socials */}
                <div className="hidden md:flex items-center gap-4 z-10">
                    <Link href="#" className="hover:text-[var(--accent)] transition-colors"><Facebook size={14} /></Link>
                    <Link href="#" className="hover:text-[var(--accent)] transition-colors"><Instagram size={14} /></Link>
                    <Link href="#" className="hover:text-[var(--accent)] transition-colors"><Twitter size={14} /></Link>
                    <Link href="#" className="hover:text-[var(--accent)] transition-colors"><Youtube size={14} /></Link>
                </div>

                {/* Center: Rotating Text - Absolutely Centered */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-auto text-center z-0">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="block uppercase tracking-widest whitespace-nowrap"
                        >
                            {announcements[index]}
                        </motion.span>
                    </AnimatePresence>
                </div>

                {/* Right: Utility Links */}
                <div className="hidden md:flex items-center gap-3 text-[10px] md:text-xs tracking-widest uppercase z-10">
                    <Link href="#" className="hover:text-[var(--accent)] transition-colors">Size Guide</Link>
                    <span className="opacity-30">|</span>
                    <Link href="/contact" className="hover:text-[var(--accent)] transition-colors">Contact Us</Link>
                    <span className="opacity-30">|</span>
                    <Link href="#" className="hover:text-[var(--accent)] transition-colors">Order Track</Link>
                </div>
            </div>
        </div>
    );
}
