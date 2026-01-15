import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import ToastProvider from "@/components/ToastProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import TopBar from "@/components/TopBar";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const inter = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Leacus. | Luxury Leather Straps & Accessories",
  description: "Discover bespoke leather straps and artisanal accessories, meticulously handcrafted for those who appreciate timeless elegance and durability.",
  keywords: ["leather straps", "watch straps", "handcrafted", "luxury accessories", "bespoke leather", "Leacus"],
  openGraph: {
    title: "Leacus. | Luxury Leather Straps & Accessories",
    description: "Discover bespoke leather straps and artisanal accessories, meticulously handcrafted for those who appreciate timeless elegance and durability.",
    url: "https://leacus.vercel.app",
    siteName: "Leacus.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1444881421460-d838c3b98f95?q=80&w=2839&auto=format&fit=crop&ixlib=rb-4.0.3",
        width: 1200,
        height: 630,
        alt: "Leacus. Luxury Leather Brand",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leacus. | Luxury Leather Straps & Accessories",
    description: "Discover bespoke leather straps and artisanal accessories, meticulously handcrafted for those who appreciate timeless elegance and durability.",
    images: ["https://images.unsplash.com/photo-1444881421460-d838c3b98f95?q=80&w=2839&auto=format&fit=crop&ixlib=rb-4.0.3"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-[var(--background)]`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <TopBar />
          <div className="max-w-[1600px] mx-auto border-x border-[var(--card-border)] min-h-screen flex flex-col relative shadow-[0_0_50px_-12px_rgba(0,0,0,0.1)]">
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
          <CartSidebar />
          <ToastProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
