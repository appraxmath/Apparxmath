import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const features = [
  { number: "01", title: "Learn step by step", text: "Clear lessons, carefully explained examples, and visual explanations help students build real understanding." },
  { number: "02", title: "Practice with purpose", text: "Exercises and quizzes turn each lesson into active learning, not just passive reading." },
  { number: "03", title: "Grow together", text: "A future-ready foundation for teachers, classrooms, and schools across Cambodia." }
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="overflow-hidden bg-white">
          <div className="container grid gap-12 py-20 md:grid-cols-[1.08fr_.92fr] md:items-center md:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[.12em] text-[var(--brand)]">
                Mathematics learning, reimagined
              </span>
              <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.08] tracking-[-.045em] text-[var(--ink)] sm:text-6xl">
                Understand math. <span className="text-[var(--brand)]">Unlock</span> what comes next.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
                A clearer way to learn mathematics in Cambodia — with structured lessons, guided practice, and tools that help every learner make progress.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/courses" className="rounded-xl bg-[var(--brand)] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition hover:bg-[var(--brand-dark)]">Explore courses <span aria-hidden="true">→</span></Link>
                <Link href="/about" className="rounded-xl border border-[var(--line)] bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">Discover ApparxMath</Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-slate-500">
                <span>✓ Student-focused learning</span><span>✓ English + Khmer direction</span><span>✓ Built to grow</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-5 rounded-[36px] bg-gradient-to-br from-blue-100 via-indigo-50 to-emerald-50 blur-2xl" />
              <div className="relative rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-8">
                <div className="flex items-center justify-between">
                  <div><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Your learning space</p><h2 className="mt-1 text-xl font-extrabold">Grade 11 Mathematics</h2></div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Learning path</span>
                </div>
                <div className="mt-8 rounded-2xl bg-[#f4f6ff] p-5">
                  <p className="text-sm font-semibold text-slate-500">Explore a concept</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)]">f(x) = x²</p>
                  <div className="mt-5 flex h-28 items-end justify-around rounded-xl bg-white px-4 pt-3">
                    <div className="h-5 w-2 rounded-t bg-blue-200" /><div className="h-12 w-2 rounded-t bg-blue-300" /><div className="h-20 w-2 rounded-t bg-[var(--brand)]" /><div className="h-12 w-2 rounded-t bg-blue-300" /><div className="h-5 w-2 rounded-t bg-blue-200" />
                  </div>
                  <p className="mt-3 text-xs text-slate-500">Explore patterns, understand the graph, and practice the idea.</p>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-100 p-4"><p className="text-xs text-slate-400">Learning approach</p><p className="mt-1 font-bold">Step by step</p></div>
                  <div className="rounded-2xl border border-slate-100 p-4"><p className="text-xs text-slate-400">Built for</p><p className="mt-1 font-bold">Cambodian learners</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-20">
          <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.16em] text-[var(--brand)]">The learning experience</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">A stronger foundation for every step.</h2><p className="mt-4 leading-7 text-[var(--muted)]">ApparxMath is being designed as more than a collection of notes. It is a connected learning environment that can grow with students and educators.</p></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature) => <article key={feature.number} className="rounded-2xl border border-[var(--line)] bg-white p-7 shadow-sm"><p className="text-sm font-extrabold text-[var(--brand)]">{feature.number}</p><h3 className="mt-5 text-xl font-extrabold">{feature.title}</h3><p className="mt-3 leading-7 text-[var(--muted)]">{feature.text}</p></article>)}
          </div>
        </section>
        <section className="container pb-20">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[var(--ink)] p-8 text-white sm:p-12 md:flex-row md:items-center">
            <div><p className="text-sm font-bold uppercase tracking-[.14em] text-blue-200">Start with the essentials</p><h2 className="mt-3 max-w-xl text-3xl font-black">Your next step in mathematics starts here.</h2><p className="mt-3 max-w-xl leading-7 text-slate-300">Explore the course structure as we build the full ApparxMath learning platform.</p></div>
            <Link href="/courses" className="shrink-0 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[var(--ink)] hover:bg-blue-50">View course structure →</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
