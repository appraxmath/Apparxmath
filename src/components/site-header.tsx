import Link from "next/link";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/for-teachers", label: "For teachers" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--line)] bg-white">
      <div className="container flex h-[76px] items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3" aria-label="ApparxMath home">
          <span className="grid size-10 place-items-center rounded-xl bg-[var(--brand)] text-lg font-black text-white">A</span>
          <span className="text-xl font-extrabold tracking-tight">Apparx<span className="text-[var(--brand)]">Math</span></span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} className="transition hover:text-[var(--brand)]" href={link.href}>{link.label}</Link>)}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 sm:inline-flex">Log in</Link>
          <Link href="/register" className="rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--brand-dark)]">Get started</Link>
        </div>
      </div>
    </header>
  );
}
