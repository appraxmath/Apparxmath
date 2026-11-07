import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { chapters } from "@/lib/grade11-advanced-math";
import { MathText } from "@/components/math-text";

export default function CoursesPage() {
  const totalHours = chapters.reduce((sum, chapter) => sum + chapter.hours, 0);
  const totalLessons = chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0);

  return (
    <>
      <SiteHeader />
      <main className="container min-h-[70vh] py-12 sm:py-16">
        <Link href="/" className="text-sm font-bold text-[var(--brand)] hover:underline">← Home</Link>
        <header className="mt-8 max-w-4xl">
          <p className="text-sm font-extrabold uppercase tracking-[.16em] text-[var(--brand)]">Cambodia · Grade 11 · Science track</p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl">Advanced Mathematics Study Course</h1>
          <p className="mt-4 max-w-3xl text-lg font-medium leading-8 text-[var(--muted)]">
            A guided course with bilingual explanations, key formulas, worked examples and practice questions. Start with Chapter 1 or choose the topic you are studying in class.
          </p>
          <p className="mt-3 text-base font-semibold leading-8 text-[var(--muted)]" lang="km">
            វគ្គសិក្សាគណិតវិទ្យាកម្រិតខ្ពស់ថ្នាក់ទី១១ សម្រាប់ថ្នាក់វិទ្យាសាស្ត្រ។ មានការពន្យល់ជាភាសាខ្មែរ និងអង់គ្លេស រូបមន្ត ឧទាហរណ៍ដោះស្រាយ និងលំហាត់អនុវត្ត។
          </p>
        </header>

        <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Course overview">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <p className="text-sm font-bold text-[var(--muted)]">Chapters</p>
            <p className="mt-1 text-3xl font-black tabular-nums">{chapters.length}</p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <p className="text-sm font-bold text-[var(--muted)]">Guided lessons</p>
            <p className="mt-1 text-3xl font-black tabular-nums">{totalLessons}</p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <p className="text-sm font-bold text-[var(--muted)]">Curriculum hours</p>
            <p className="mt-1 text-3xl font-black tabular-nums">{totalHours}</p>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[.14em] text-[var(--brand)]">Choose a chapter</p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">Your learning path</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/solv3" className="rounded-xl bg-[var(--brand)] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[var(--brand-dark)]">Open Solv3 solver →</Link>
              <Link href="/tools/exponential-graph" className="rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-extrabold text-[var(--ink)] transition hover:border-[var(--brand)]">Graph Explorer →</Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {chapters.map((chapter) => (
              <article key={chapter.slug} className="flex h-full flex-col rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-lg font-black text-[var(--brand)]">{chapter.number}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-black leading-7">{chapter.title.en}</h3>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{chapter.hours} hours</span>
                    </div>
                    <p className="mt-1 text-base font-bold leading-7 text-slate-600" lang="km">{chapter.title.km}</p>
                  </div>
                </div>
                <MathText className="mt-4 block text-sm font-medium leading-7 text-[var(--muted)]" text={chapter.introduction.en} />
                <MathText className="mt-2 block text-sm font-medium leading-7 text-[var(--muted)]" lang="km" text={chapter.introduction.km} />
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800">{chapter.lessons.length} guided lessons</span>
                  <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">{chapter.syllabus.length} syllabus areas</span>
                </div>
                <div className="mt-auto pt-5">
                  <Link href={`/courses/${chapter.slug}`} className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--brand)] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[var(--brand-dark)]">
                    Study this chapter →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--line)] bg-slate-50 p-5 sm:p-6">
          <h2 className="text-lg font-black">How to study each chapter</h2>
          <ol className="mt-3 grid gap-3 text-sm font-semibold leading-7 text-slate-700 sm:grid-cols-2">
            <li>1. Read the learning goal and key idea in both languages.</li>
            <li>2. Learn the formula and the meaning of every symbol.</li>
            <li>3. Follow the worked example one step at a time.</li>
            <li>4. Try the practice question before opening its answer.</li>
          </ol>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-700" lang="km">របៀបរៀន៖ អានគោលបំណង និងគំនិតសំខាន់ៗ សិក្សារូបមន្ត និងនិមិត្តសញ្ញា តាមដានឧទាហរណ៍មួយជំហានម្ដងៗ រួចសាកល្បងលំហាត់មុនបើកចម្លើយ។</p>
        </section>

        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <h2 className="font-black text-amber-950">Curriculum and edition note</h2>
          <p className="mt-2 text-sm font-medium leading-7 text-amber-950">
            The chapter map follows the Ministry of Education, Youth and Sport&apos;s published Upper Secondary Mathematics Curriculum, Grade 11 Advanced Mathematics section (nine content areas, 304 curriculum hours). EBC also lists a 2025–2026 Grade 11A Science Mathematics course, updated 7 March 2026. The online course requires enrolment, so the lesson notes here are original learning explanations aligned to the published outcomes—not copied textbook pages and not a claim that every exercise matches a newly revised printed edition.
          </p>
          <p className="mt-2 text-sm font-semibold leading-7 text-amber-950" lang="km">
            ផែនទីជំពូកនេះយោងតាមកម្មវិធីសិក្សាគណិតវិទ្យាកម្រិតមធ្យមសិក្សាទុតិយភូមិរបស់ក្រសួងអប់រំ យុវជន និងកីឡា ផ្នែកគណិតវិទ្យាកម្រិតខ្ពស់ថ្នាក់ទី១១។ មេរៀននៅទីនេះជាការពន្យល់រៀបចំថ្មី ដើម្បីឱ្យស្របតាមលទ្ធផលសិក្សា មិនមែនជាការចម្លងទំព័រសៀវភៅទេ។
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm font-bold">
            <a className="underline decoration-amber-500 underline-offset-4" href="https://api.weteka.org/public/orgs/63fc7c5751508ff62e6ce857/pdf/d56bd82f-18f8-4254-808a-3c1eca2e9312.pdf" target="_blank" rel="noreferrer">Ministry curriculum PDF — Grade 11 Advanced Mathematics</a>
            <a className="underline decoration-amber-500 underline-offset-4" href="https://elearning-kp.ebc.edu.kh/enrol/index.php?id=20450" target="_blank" rel="noreferrer">EBC 2025–2026 Grade 11A Science Mathematics course</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
