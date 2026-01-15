'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if we've already shown the preloader in this session
        // const hasLoaded = sessionStorage.getItem('hasLoaded');

        // if (hasLoaded) {
        //     setIsLoading(false);
        //     return;
        // }

        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('hasLoaded', 'true');
        }, 5000); // 5s duration

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="relative overflow-hidden">
                        <motion.h1
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            className="text-6xl md:text-8xl font-serif text-[#f5f5f7] tracking-tighter"
                        >
                            Leacus.
                        </motion.h1>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 4.5, ease: "easeInOut", delay: 0.2 }}
                            className="h-[2px] w-full bg-[#f5f5f7] mt-4 origin-left"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
