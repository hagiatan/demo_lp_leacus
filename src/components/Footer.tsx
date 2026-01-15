import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer>
      {/* Main Footer Grid - Same pattern as other sections */}
      <div className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
        {/* Left: Brand */}
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-6 leading-tight">
            Leacus.
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-sm leading-relaxed">
            {t('brandDescription')}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
            {t('rights')}
          </p>
        </div>

        {/* Right: Links Grid */}
        <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-3 divide-x divide-y md:divide-y-0 divide-[var(--card-border)]">
          {/* Shop Links */}
          <div className="p-6 md:p-10 flex flex-col items-start">
            <span className="text-base font-medium text-[var(--foreground)] mb-4 block">{t('shop')}</span>
            <div className="space-y-4">
              <Link href="/shop" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors block">All Straps</Link>
              <Link href="/shop?category=leather" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors block">Leather</Link>
              <Link href="/shop?category=nato" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors block">Nato</Link>
              <Link href="/shop?category=accessories" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors block">Accessories</Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="p-6 md:p-10 flex flex-col items-start">
            <span className="text-base font-medium text-[var(--foreground)] mb-4 block">{t('company')}</span>
            <div className="space-y-4">
              <Link href="/about" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors block">About Us</Link>
              <Link href="/journal" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors block">Journal</Link>
              <Link href="/contact" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors block">Contact</Link>
              <Link href="/careers" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors block">Careers</Link>
            </div>
          </div>

          {/* Support Links */}
          <div className="p-6 md:p-10 flex flex-col items-start">
            <span className="text-base font-medium text-[var(--foreground)] mb-4 block">{t('support')}</span>
            <div className="space-y-4">
              <Link href="/sizing-guide" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors block">Sizing Guide</Link>
              <Link href="/faq" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors block">FAQ</Link>
              <Link href="/terms" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors block">Terms of Use</Link>
              <Link href="/privacy" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors block">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Credits */}
      <div className="px-6 md:px-12 lg:px-16 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
              More from Leacus.
            </Link>
            <Link href="https://ui8.net/users/lutte-studio" className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
              Template Credits
            </Link>
            <Link href="https://nextjs.org/" className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
              Built with Next.js
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
