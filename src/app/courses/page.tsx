import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const units = [
  ["03", "Trigonometric Functions", "មុខងារត្រីកោណមាត្រ"],
  ["04", "Matrices", "ម៉ាទ្រីស"],
  ["05", "Complex Numbers", "ចំនួនកុំផ្លិច"],
  ["06", "Differentiation", "ដេរីវេ"],
  ["07", "Probability", "ប្រូបាប"],
  ["08", "Statistics", "ស្ថិតិ"],
  ["09", "Vectors in Space", "វ៉ិចទ័រក្នុងលំហ"]
];

export default function CoursesPage() {
  return <><SiteHeader /><main className="container min-h-[70vh] py-16">
    <Link href="/" className="text-sm font-semibold text-[var(--brand)]">← Home</Link>
    <p className="mt-8 text-sm font-bold uppercase tracking-[.15em] text-[var(--brand)]">Course catalogue</p>
    <h1 className="mt-3 text-4xl font-black tracking-tight">Grade 11 Mathematics</h1>
    <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">An initial course map for the ApparxMath foundation. The exact chapter sequence and coverage will be checked against the current official Cambodian textbook before publication.</p>
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {units.map(([number, title, khmer]) => <article key={number} className="flex gap-4 rounded-2xl border border-[var(--line)] bg-white p-6"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-50 font-extrabold text-[var(--brand)]">{number}</span><div><h2 className="font-extrabold">{title}</h2><p className="mt-1 text-sm text-slate-500">{khmer}</p><p className="mt-3 text-xs font-semibold text-amber-700">Course content in preparation</p></div></article>)}
    </div>
  </main><SiteFooter /></>;
}
