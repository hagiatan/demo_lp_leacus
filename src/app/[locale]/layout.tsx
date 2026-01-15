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
  title: "Leacus. | Luxury Fragrances & Home Essentials",
  description:
    "Discover exceptional fragrances and artisanal home essentials crafted for those who appreciate the finer things in life.",
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
    <html lang={locale}>
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
