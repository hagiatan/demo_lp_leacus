import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import StrapCustomizerTeaser from "@/components/StrapCustomizerTeaser";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoriesGrid from "@/components/CategoriesGrid";
import FullWidthBanner from "@/components/FullWidthBanner";
import AboutSection from "@/components/AboutSection";
import BlogCarousel from "@/components/BlogCarousel";
import CraftsmanshipProcess from "@/components/CraftsmanshipProcess";
import InstagramFeed from "@/components/InstagramFeed";
import ServiceFeatures from "@/components/ServiceFeatures";
import TestimonialsSection from "@/components/TestimonialsSection";
import Newsletter from "@/components/Newsletter";

import Link from "next/link";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Preloader />
      <Hero />
      <MarqueeBanner />
      <CategoriesGrid />
      <FeaturedProducts />
      <StrapCustomizerTeaser />
      <CraftsmanshipProcess />
      <FullWidthBanner />
      <TestimonialsSection />
      <ServiceFeatures />
      <AboutSection />
      <BlogCarousel />
      <InstagramFeed />
      <Newsletter />
    </div>
  );
}
