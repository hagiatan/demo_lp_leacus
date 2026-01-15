"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, ShoppingBag, Search } from "lucide-react";
import { useCartStore } from "@/store/cart";
import SearchOverlay from "@/components/SearchOverlay";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations('Navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { href: "/", label: t('home') },
    // { href: "/shop", label: t('shop') },
    // { href: "/about", label: t('about') },
    // { href: "/journal", label: t('journal') },
    // { href: "/contact", label: t('contact') },
  ];

  return (
    <>
      <motion.nav
        className={`sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--card-border)]`}
      >
        <div className="relative flex items-center justify-between h-20 px-6 md:px-12 lg:px-16">

          {/* Left: Menu Trigger */}
          <div className="flex-1 flex items-center justify-start z-10 gap-4">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors p-2 -ml-2"
              aria-label="Menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Center: Logo - Absolutely Centered (hidden on mobile to avoid overlap) */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <Link href="/">
              <h1 className="font-serif text-3xl tracking-tight text-[var(--foreground)]">
                Leacus.
              </h1>
            </Link>
          </div>

          {/* Right: Login & Cart */}
          <div className="flex-1 flex items-center justify-end gap-5 z-10">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link
              href="/login"
              className="flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors"
            >
              <User size={20} strokeWidth={1.5} />
            </Link>
            <button
              onClick={toggleCart}
              className="flex items-center gap-1 text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="text-sm font-medium">({mounted ? totalItems : 0})</span>
            </button>

            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </motion.nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[var(--background)] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-[var(--foreground)] hover:rotate-90 transition-transform duration-300"
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            <div className="flex flex-col items-start gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-start gap-4"
                  >
                    <span className="text-xs font-medium text-[var(--text-secondary)] mt-2 group-hover:text-[var(--foreground)] transition-colors">
                      0{index + 1}
                    </span>
                    <span className="text-5xl md:text-6xl font-serif text-[var(--foreground)] group-hover:italic transition-all duration-300">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
