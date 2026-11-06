import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-white">
      <div className="container flex flex-col justify-between gap-4 py-8 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} ApparxMath. Built for curious minds.</p>
        <div className="flex gap-5">
          <Link href="/about" className="hover:text-[var(--brand)]">About</Link>
          <Link href="/contact" className="hover:text-[var(--brand)]">Contact</Link>
          <Link href="/privacy" className="hover:text-[var(--brand)]">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
