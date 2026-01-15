'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }

    return (
        <div className="relative">
            <label htmlFor="language-select" className="sr-only">Change language</label>
            <select
                id="language-select"
                defaultValue={locale}
                className="bg-transparent py-1 px-2 border rounded border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={onSelectChange}
                disabled={isPending}
            >
                <option value="en">English</option>
                <option value="ch">中文</option>
                <option value="fr">Français</option>
            </select>
        </div>
    );
}
