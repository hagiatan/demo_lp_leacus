"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { blurDataURL } from "@/lib/image";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

type SortOption = (typeof sortOptions)[number];

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const selected =
    sortOptions.find((option: SortOption) => option.value === value) ??
    sortOptions[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 py-3 text-sm text-[var(--foreground)] font-medium border-b border-[var(--card-border)]"
      >
        <span>{selected.label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform text-[var(--text-secondary)] ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 mt-1 bg-[var(--background)] border border-[var(--card-border)] shadow-sm z-20"
          >
            {sortOptions.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    option.value === value
                      ? "bg-[var(--section-bg)] text-[var(--foreground)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--section-bg)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      const candleSlugs = [
        "candles",
        "jar-candles",
        "pillar-candles",
        "candle-sets",
      ];

      if (candleSlugs.includes(selectedCategory.toLowerCase())) {
        // All candle-related categories show candle products
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === "candles"
        );
      } else {
        filtered = filtered.filter(
          (p) =>
            p.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
    }

    switch (sortBy) {
      case "newest":
        filtered = filtered.filter((p) => p.new).concat(filtered.filter((p) => !p.new));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        filtered = filtered.filter((p) => p.featured).concat(filtered.filter((p) => !p.featured));
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  return (
    <div className="flex flex-col">
      {/* Page Header - Editorial Style */}
      <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 lg:py-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left"
          >
            <p className="text-xs uppercase tracking-[0.3em] mb-6 text-[var(--text-secondary)]">Collections</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--foreground)] mb-6 leading-none">
              Shop <span className="italic block mt-2">All Candles</span>
            </h1>
            <p className="text-[var(--text-secondary)] font-light leading-relaxed max-w-sm">
              Explore our curated selection of luxury candles and home fragrance essentials.
            </p>
          </motion.div>
        </div>
        {/* Hero Image Right Side - 2/3 */}
        <div className="hidden lg:block w-full lg:w-2/3 relative min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1643122966676-29e8597257f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Aluna candle collection"
            fill
            sizes="66vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </section>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden p-6 border-b border-[var(--card-border)]">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--section-bg)] text-[var(--foreground)] text-sm uppercase tracking-[0.2em]"
            >
              <SlidersHorizontal size={16} />
              {showFilters ? "Hide Filters" : "Filters & Sort"}
            </motion.button>
        </div>

        {/* Filters Sidebar - 1/3 Width */}
        <aside className="hidden lg:block w-full lg:w-1/3 flex-shrink-0 border-r border-[var(--card-border)] bg-[var(--background)]">
            <div className="p-6 md:p-12 lg:p-16 sticky top-20">
                <div className="mb-12">
                  <h4 className="text-xs font-bold text-[var(--foreground)] uppercase tracking-[0.2em] mb-6">
                    Categories
                  </h4>
                  <div className="flex flex-col items-start gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`text-lg font-serif transition-colors relative ${
                          selectedCategory === category.slug
                            ? "text-[var(--foreground)] italic"
                            : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[var(--foreground)] uppercase tracking-[0.2em] mb-6">
                    Sort By
                  </h4>
                  <SortDropdown value={sortBy} onChange={(val) => setSortBy(val)} />
                </div>
            </div>
        </aside>

        {/* Mobile Sidebar (Animated) */}
        <AnimatePresence>
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden flex-shrink-0 border-b border-[var(--card-border)] bg-[var(--background)] overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-serif text-xl text-[var(--foreground)]">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X size={24} className="text-[var(--text-secondary)]" />
                  </button>
                </div>

                <div className="mb-8">
                  <h4 className="text-xs font-bold text-[var(--foreground)] uppercase tracking-[0.2em] mb-4">
                    Categories
                  </h4>
                  <div className="flex flex-col items-start gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.slug}
                        onClick={() => { setSelectedCategory(category.slug); setShowFilters(false); }}
                        className={`text-lg font-serif transition-colors relative ${
                          selectedCategory === category.slug
                            ? "text-[var(--foreground)] italic"
                            : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[var(--foreground)] uppercase tracking-[0.2em] mb-4">
                    Sort By
                  </h4>
                  <SortDropdown
                    value={sortBy}
                    onChange={(val) => {
                      setSortBy(val);
                      setShowFilters(false);
                    }}
                  />
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product Grid - 2/3 Width */}
        <div className="flex-1 w-full lg:w-2/3 bg-[var(--background)]">
          {/* Results Count Bar */}
          <div className="px-6 md:px-8 py-6 border-b border-[var(--card-border)] flex justify-between items-center">
             <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                Showing <span className="text-[var(--foreground)]">{filteredProducts.length}</span> Results
             </p>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)]"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative p-6 md:p-8 hover:bg-[var(--section-bg)] transition-colors border-b border-[var(--card-border)]"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="py-32 text-center border-b border-[var(--card-border)]">
              <p className="text-[var(--text-secondary)] text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
