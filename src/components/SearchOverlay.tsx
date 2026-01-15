"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search as SearchIcon, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { blurDataURL } from "@/lib/image";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(products);

  // Reset query when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setQuery(""), 300);
    }
  }, [isOpen]);

  // Filter products based on query
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-[var(--background)] flex flex-col"
        >
          {/* Header with Close Button */}
          <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 h-20 border-b border-[var(--card-border)]">
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              Search
            </span>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-[var(--foreground)] hover:rotate-90 transition-transform duration-300"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Search Input */}
          <div className="px-6 md:px-12 lg:px-16 py-8 md:py-12 border-b border-[var(--card-border)]">
            <div className="relative max-w-4xl mx-auto">
              <SearchIcon
                size={32}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
                strokeWidth={1.5}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search..."
                className="w-full bg-transparent border-none text-3xl md:text-5xl font-serif text-[var(--foreground)] placeholder:text-[var(--card-border)] focus:ring-0 pl-12 md:pl-16 py-4 outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto bg-[var(--section-bg)]">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-12">
              {!query ? (
                // Empty State / Suggestions
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50 mt-20">
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-4">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {["Eau de Parfum", "Scented Candle", "Diffuser", "Gift Set"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="text-2xl font-serif text-[var(--foreground)] hover:italic transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                // No Results
                <div className="text-center mt-20">
                  <p className="text-xl font-serif text-[var(--foreground)] mb-2">No results found for "{query}"</p>
                  <p className="text-[var(--text-secondary)]">Try checking your spelling or using different keywords.</p>
                </div>
              ) : (
                // Results Grid
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="group block"
                    >
                      <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[var(--background)]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          placeholder="blur"
                          blurDataURL={blurDataURL}
                        />
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-lg text-[var(--foreground)] mb-1 group-hover:italic transition-all">
                            {product.name}
                          </h3>
                          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                            {product.category}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-[var(--foreground)]">
                          ${product.price}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
