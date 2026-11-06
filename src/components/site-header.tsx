"use client";

import Link from "next/link";
import { useAppPreferences } from "@/components/app-preferences";

export function SiteHeader() {
  const { theme, language, toggleTheme, toggleLanguage } = useAppPreferences();
  const links = [
    { href: "/courses", label: language === "km" ? "មេរៀន" : "Courses" },
    { href: "/tools/exponential-graph", label: language === "km" ? "ក្រាប" : "Graph" },
    { href: "/solv3", label: "Solv3" },
    { href: "/for-teachers", label: language === "km" ? "សម្រាប់គ្រូ" : "For teachers" },
    { href: "/about", label: language === "km" ? "អំពីយើង" : "About" }
  ];

  return (
    <header className="border-b border-[var(--line)] bg-white">
      <div className="container flex min-h-[76px] flex-wrap items-center justify-between gap-x-5 gap-y-3 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="ApparxMath home">
          <span className="grid size-10 place-items-center rounded-xl bg-[var(--brand)] text-lg font-black text-white">A</span>
          <span className="text-xl font-extrabold tracking-tight">Apparx<span className="text-[var(--brand)]">Math</span></span>
        </Link>

        <nav className="order-3 flex w-full items-center gap-5 overflow-x-auto pb-1 text-sm font-semibold text-slate-600 md:order-2 md:w-auto" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} className="shrink-0 transition hover:text-[var(--brand)]" href={link.href}>{link.label}</Link>
          ))}
        </nav>

        <div className="order-2 flex shrink-0 items-center gap-2 md:order-3">
          <button type="button" onClick={toggleLanguage} className="rounded-lg border border-[var(--line)] px-2.5 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50" aria-label="Change language">
            {language === "en" ? "ខ្មែរ" : "English"}
          </button>
          <button type="button" onClick={toggleTheme} className="rounded-lg border border-[var(--line)] px-2.5 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50" aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}>
            {theme === "light" ? "☾ Dark" : "☀ Light"}
          </button>
          <Link href="/register" className="hidden rounded-xl bg-[var(--brand)] px-3 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[var(--brand-dark)] sm:inline-flex">
            {language === "km" ? "ចាប់ផ្តើម" : "Get started"}
          </Link>
        </div>
      </div>
    </header>
  );
}
