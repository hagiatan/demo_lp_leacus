"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Minus,
  Plus,
  Star,
  ChevronDown,
  Truck,
  Shield,
  RotateCcw
} from "lucide-react";
import { getProductBySlug, getFeaturedProducts, products } from "@/data/products";
import { useCartStore } from "@/store/cart";
import ProductCard from "@/components/ProductCard";
import { blurDataURL } from "@/lib/image";

// Mock data for fragrance notes since it's not in the main data yet
const fragranceNotes = {
  top: "Bergamot, Blackcurrant, Pink Pepper",
  heart: "Midnight Jasmine, Bulgarian Rose, Iris",
  base: "Oud, Vanilla, White Musk"
};

function Accordion({ title, children, isOpen, onClick }: { title: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-[var(--card-border)]">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-medium text-[var(--foreground)] uppercase tracking-[0.2em] text-sm group-hover:opacity-70 transition-opacity">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-[var(--text-secondary)]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-[var(--text-secondary)] font-light leading-relaxed text-sm">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductPage() {
  const params = useParams();
  const product = getProductBySlug(params.slug as string);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");

  if (!product) {
    notFound();
  }

  let relatedProducts = getFeaturedProducts().filter((p) => p.id !== product.id);

  if (relatedProducts.length < 4) {
    const fillers = products
      .filter(
        (p) =>
          p.id !== product.id &&
          !relatedProducts.some((r) => r.id === p.id)
      )
      .slice(0, 4 - relatedProducts.length);

    relatedProducts = [...relatedProducts, ...fillers];
  }

  relatedProducts = relatedProducts.slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="flex flex-col border-b border-[var(--card-border)] bg-[var(--background)]">
      {/* Breadcrumbs - Integrated into top border or padding */}
      <div className="px-6 md:px-12 lg:px-16 py-4 border-b border-[var(--card-border)] text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
        <Link href="/shop" className="hover:text-[var(--foreground)] transition-colors">Shop</Link>
        <span className="mx-2">/</span>
        <Link href={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-[var(--foreground)] transition-colors">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)]">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row items-start">
        {/* Left Column: Images (Sticky) - 50/50 split maintained for product focus, but styling refined */}
        <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-[var(--card-border)] lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] overflow-y-auto scrollbar-hide">
          <div className="relative aspect-square w-full bg-[var(--section-bg)]">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={blurDataURL}
              priority
            />
            {product.new && (
              <div className="absolute top-6 left-6 px-3 py-1 bg-[var(--accent)] text-white text-xs uppercase tracking-[0.2em]">
                New Arrival
              </div>
            )}
          </div>

          {/* Thumbnails Grid (if multiple) */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--card-border)] border-t border-[var(--card-border)]">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square w-full group ${selectedImage === idx ? 'opacity-100' : 'opacity-60 hover:opacity-100'} transition-opacity`}
                >
                  <Image src={img} alt={`View ${idx + 1}`} fill sizes="25vw" className="object-cover" placeholder="blur" blurDataURL={blurDataURL} />
                  {selectedImage === idx && (
                    <div className="absolute inset-0 border-2 border-[var(--accent)] pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="p-6 md:p-12 lg:p-16 flex-1">
            <div className="mb-4 flex items-center gap-4">
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#5E5C5A" }}
              >
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="fill-[var(--foreground)] text-[var(--foreground)]" />
                ))}
                <span className="text-xs text-[var(--text-secondary)] ml-1">(24 Reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--foreground)] mb-6 leading-none">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-2xl font-medium text-[var(--foreground)]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-[var(--text-muted)] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-[var(--text-secondary)] text-lg font-light leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Fragrance Notes (Mocked for visual) */}
            {product.category === 'Fragrance' && (
              <div className="mb-10 p-6 bg-[var(--section-bg)] border border-[var(--card-border)]">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--foreground)] mb-4">Olfactory Notes</h3>
                <div className="space-y-3 text-sm font-light">
                  <div className="flex">
                    <span className="w-24 text-[var(--text-secondary)] uppercase tracking-wider text-xs pt-1">Top</span>
                    <span className="text-[var(--foreground)] flex-1">{fragranceNotes.top}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-[var(--text-secondary)] uppercase tracking-wider text-xs pt-1">Heart</span>
                    <span className="text-[var(--foreground)] flex-1">{fragranceNotes.heart}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-[var(--text-secondary)] uppercase tracking-wider text-xs pt-1">Base</span>
                    <span className="text-[var(--foreground)] flex-1">{fragranceNotes.base}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Add to Cart Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center border border-[var(--card-border)] h-14 w-full sm:w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center hover:bg-[var(--section-bg)] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <div className="flex-1 text-center font-medium text-[var(--foreground)]">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center hover:bg-[var(--section-bg)] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-[var(--accent)] text-white font-medium uppercase tracking-[0.2em] text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </motion.button>

              <button className="h-14 w-14 border border-[var(--card-border)] flex items-center justify-center hover:bg-[var(--section-bg)] transition-colors">
                <Heart size={20} className="text-[var(--foreground)]" />
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-[var(--card-border)]">
              <Accordion
                title="Description"
                isOpen={openAccordion === "description"}
                onClick={() => toggleAccordion("description")}
              >
                <p>{product.description} Crafted with the utmost care, this product embodies the essence of luxury and sophistication.</p>
              </Accordion>

              <Accordion
                title="Ingredients & Details"
                isOpen={openAccordion === "ingredients"}
                onClick={() => toggleAccordion("ingredients")}
              >
                <ul className="list-disc pl-5 space-y-1">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                  <li>Alcohol Denat., Parfum (Fragrance), Aqua (Water)</li>
                  <li>Sustainably sourced ingredients</li>
                </ul>
              </Accordion>

              <Accordion
                title="Shipping & Returns"
                isOpen={openAccordion === "shipping"}
                onClick={() => toggleAccordion("shipping")}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Truck size={18} className="text-[var(--text-secondary)]" />
                    <span>Free shipping on all orders over $100</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw size={18} className="text-[var(--text-secondary)]" />
                    <span>30-day return policy for unopened items</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield size={18} className="text-[var(--text-secondary)]" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <section className="border-t border-[var(--card-border)] bg-[var(--background)]">
        <div className="px-6 md:px-12 lg:px-16 py-12 border-b border-[var(--card-border)] flex justify-between items-end">
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)]">Key Candle Details</h2>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] hidden md:block">Crafted for a clean burn</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)]">
          {[
            {
              label: 'Wax Blend',
              description:
                'A refined blend of natural waxes chosen for an even, slow burn and soft, enveloping throw.',
              image:
                'https://images.pexels.com/photos/16038073/pexels-photo-16038073.jpeg?auto=compress&cs=tinysrgb&w=400',
            },
            {
              label: 'Fine Fragrance Oils',
              description:
                'Phthalate-free fragrance oils that balance depth and clarity to scent your space without overwhelming it.',
              image:
                'https://images.pexels.com/photos/8450495/pexels-photo-8450495.jpeg?auto=compress&cs=tinysrgb&w=400',
            },
            {
              label: 'Wick & Vessel',
              description:
                'Clean-burning cotton wick poured into a reusable vessel, designed to live on long after the final burn.',
              image:
                'https://images.pexels.com/photos/6707632/pexels-photo-6707632.jpeg?auto=compress&cs=tinysrgb&w=400',
            },
          ].map((item, i) => (
            <div key={i} className="p-12 text-center hover:bg-[var(--section-bg)] transition-colors group">
              <div className="w-24 h-24 mx-auto bg-[var(--section-bg)] rounded-full mb-6 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="96px"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
              <h3 className="font-serif text-xl mb-3 text-[var(--foreground)] italic">{item.label}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The Ritual Section - 1/3 + 2/3 Layout */}
      <section className="flex flex-col lg:flex-row border-t border-[var(--card-border)] bg-[var(--background)]">
        {/* Left: Content - 1/3 */}
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
          <span className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#5E5C5A" }}>Burning Ritual</span>
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-[var(--foreground)]">The Ritual</h2>
          <p className="text-[var(--text-secondary)] font-light leading-relaxed mb-10 text-base md:text-lg">
            For the most beautiful burn, take a moment before you strike the match. Trim the wick, centre your candle, and let the first burn become a quiet ritual rather than a rush.
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-serif text-[var(--foreground)] italic w-8">01</span>
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">Trim the Wick</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-serif text-[var(--foreground)] italic w-8">02</span>
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">Let a Full Pool Form</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-serif text-[var(--foreground)] italic w-8">03</span>
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">Extinguish with Care</span>
            </div>
          </div>
        </div>
        {/* Right: Image - 2/3 */}
        <div className="w-full lg:w-2/3 relative min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1570823635306-250abb06d4b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="The ritual application guide"
            fill
            sizes="66vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-[var(--card-border)] bg-[var(--background)]">
          <div className="px-6 md:px-12 lg:px-16 py-12 border-b border-[var(--card-border)]">
            <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)]">
              You May Also Like
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--card-border)]">
            {relatedProducts.map((product, index) => (
              <div key={product.id} className="group relative p-8 hover:bg-[var(--section-bg)] transition-colors">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
