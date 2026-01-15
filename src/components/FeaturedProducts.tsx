"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { getFeaturedProducts } from "@/data/products";
import { Product } from "@/data/products";

export default function FeaturedProducts() {
  const t = useTranslations('FeaturedProducts');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(getFeaturedProducts());
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Split products into two groups for two sections
  const firstGroup = products.slice(0, 2);
  const secondGroup = products.slice(2, 4);

  return (
    <>
      {/* Section 1: New Collection */}
      <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
        {/* Left: Text */}
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-4 leading-tight">
            {t('newCollectionTitle')}
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 font-light leading-relaxed">
            {t('newCollectionDesc')}
          </p>
          <Link
            href="/shop?category=new"
            className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors underline underline-offset-4"
          >
            {t('shopNew')}
          </Link>
        </div>

        {/* Right: Products */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)]">
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => (
              <div key={`skeleton-1-${index}`} className="p-6 h-full">
                <ProductCardSkeleton />
              </div>
            ))
            : firstGroup.map((product, index) => (
              <div key={product.id} className="p-6 h-full">
                <ProductCard product={product} index={index} />
              </div>
            ))}
        </div>
      </section>

      {/* Section 2: Essentials */}
      <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
        {/* Left: Text */}
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-4 leading-tight">
            {t('essentialsTitle')}
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 font-light leading-relaxed">
            {t('essentialsDesc')}
          </p>
          <Link
            href="/shop?category=essentials"
            className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors underline underline-offset-4"
          >
            {t('shopEssentials')}
          </Link>
        </div>

        {/* Right: Products */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)]">
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => (
              <div key={`skeleton-2-${index}`} className="p-6 h-full">
                <ProductCardSkeleton />
              </div>
            ))
            : secondGroup.map((product, index) => (
              <div key={product.id} className="p-6 h-full">
                <ProductCard product={product} index={index + 2} />
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
