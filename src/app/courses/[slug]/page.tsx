import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { chapters } from "@/lib/grade11-advanced-math";

export function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export default async function ChapterStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = chapters.find((item) => item.slug === slug);
  if (!chapter) notFound();
  const currentIndex = chapters.findIndex((item) => item.slug === slug);
  const previous = chapters[currentIndex - 1];
  const next = chapters[currentIndex + 1];

  return (
    <>
      <SiteHeader />
      <main className="container min-h-[70vh] py-10 sm:py-14">
        <Link href="/courses" className="text-sm font-extrabold text-[var(--brand)] hover:underline">← All chapters / ត្រឡប់ទៅបញ្ជីជំពូក</Link>
        <header className="mt-7 max-w-4xl">
          <p className="text-sm font-extrabold uppercase tracking-[.15em] text-[var(--brand)]">Chapter {chapter.number} · {chapter.hours} curriculum hours</p>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">{chapter.title.en}</h1>
          <p className="mt-2 text-xl font-extrabold leading-9 text-[var(--muted)]" lang="km">{chapter.title.km}</p>
          <p className="mt-5 text-base font-medium leading-8 text-[var(--muted)]">{chapter.introduction.en}</p>
          <p className="mt-2 text-base font-semibold leading-8 text-[var(--muted)]" lang="km">{chapter.introduction.km}</p>
        </header>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-6">
            <h2 className="text-lg font-black">What you will learn / គោលបំណងសិក្សា</h2>
            <ul className="mt-3 space-y-3">
              {chapter.outcomes.map((outcome, index) => (
                <li key={index} className="border-l-4 border-blue-400 pl-3">
                  <p className="text-sm font-semibold leading-7">{outcome.en}</p>
                  <p className="mt-1 text-sm font-semibold leading-7 text-[var(--muted)]" lang="km">{outcome.km}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-6">
            <h2 className="text-lg font-black">Syllabus checklist / មាតិកាត្រូវសិក្សា</h2>
            <ul className="mt-3 space-y-2">
              {chapter.syllabus.map((item, index) => (
                <li key={index} className="flex gap-3 text-sm font-semibold leading-7">
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-xs font-black text-emerald-800">✓</span>
                  <span><span className="block">{item.en}</span><span className="block text-[var(--muted)]" lang="km">{item.km}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[.15em] text-[var(--brand)]">Guided study</p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">Lessons and worked examples</h2>
              <p className="mt-2 text-sm font-semibold text-[var(--muted)]" lang="km">មេរៀន ការពន្យល់ និងឧទាហរណ៍ដោះស្រាយ</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-2 text-sm font-extrabold text-blue-900">{chapter.lessons.length} lessons</span>
          </div>

          <div className="mt-6 space-y-5">
            {chapter.lessons.map((lesson, lessonIndex) => (
              <article key={lesson.title.en} className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm">
                <div className="border-b border-[var(--line)] bg-slate-50 px-5 py-4 sm:px-6">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[var(--brand)]">Lesson {lessonIndex + 1}</p>
                  <h3 className="mt-1 text-xl font-black leading-8">{lesson.title.en}</h3>
                  <p className="text-base font-bold leading-8 text-[var(--muted)]" lang="km">{lesson.title.km}</p>
                  <p className="mt-2 text-sm font-semibold leading-7">{lesson.goal.en}</p>
                  <p className="text-sm font-semibold leading-7 text-[var(--muted)]" lang="km">{lesson.goal.km}</p>
                </div>

                <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-2">
                  <section>
                    <h4 className="text-base font-black">Key idea / គំនិតសំខាន់</h4>
                    <p className="mt-2 text-sm font-medium leading-8">{lesson.keyIdea.en}</p>
                    <p className="mt-2 text-sm font-semibold leading-8 text-[var(--muted)]" lang="km">{lesson.keyIdea.km}</p>
                  </section>
                  <section>
                    <h4 className="text-base font-black">Important formulas / រូបមន្តសំខាន់ៗ</h4>
                    <div className="mt-2 space-y-2">
                      {lesson.formula.map((formula) => <div key={formula} className="overflow-x-auto rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 font-mono text-sm font-bold leading-7 text-slate-900">{formula}</div>)}
                    </div>
                  </section>
                </div>

                <div className="grid gap-5 border-t border-[var(--line)] bg-white p-5 sm:p-6 lg:grid-cols-2">
                  <section>
                    <h4 className="text-base font-black">Worked example / ឧទាហរណ៍ដោះស្រាយ</h4>
                    <p className="mt-2 text-sm font-extrabold leading-7">{lesson.example.question.en}</p>
                    <p className="text-sm font-bold leading-7 text-[var(--muted)]" lang="km">{lesson.example.question.km}</p>
                    <ol className="mt-3 space-y-3">
                      {lesson.example.steps.map((step, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--brand)] text-xs font-black text-white">{index + 1}</span>
                          <div className="min-w-0 text-sm font-medium leading-7">
                            <p>{step.en}</p>
                            <p className="mt-1 font-semibold text-[var(--muted)]" lang="km">{step.km}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <p className="text-xs font-black uppercase tracking-wider text-emerald-900">Final answer / ចម្លើយចុងក្រោយ</p>
                      <p className="mt-1 text-sm font-black leading-7 text-emerald-950">{lesson.example.answer.en}</p>
                      <p className="text-sm font-bold leading-7 text-emerald-950" lang="km">{lesson.example.answer.km}</p>
                    </div>
                  </section>

                  <section className="rounded-2xl border border-[var(--line)] bg-slate-50 p-4 sm:p-5">
                    <h4 className="text-base font-black">Try it yourself / សាកល្បងដោយខ្លួនឯង</h4>
                    <p className="mt-3 text-sm font-extrabold leading-7">{lesson.practice.question.en}</p>
                    <p className="text-sm font-bold leading-7 text-[var(--muted)]" lang="km">{lesson.practice.question.km}</p>
                    <details className="mt-5 rounded-xl border border-[var(--line)] bg-white p-4">
                      <summary className="cursor-pointer text-sm font-black text-[var(--brand)]">Show answer / បង្ហាញចម្លើយ</summary>
                      <p className="mt-3 text-sm font-bold leading-7">{lesson.practice.answer.en}</p>
                      <p className="text-sm font-bold leading-7 text-[var(--muted)]" lang="km">{lesson.practice.answer.km}</p>
                    </details>
                    <p className="mt-4 text-xs font-semibold leading-6 text-[var(--muted)]">Study tip: cover the answer, solve the question on paper, then compare each step.</p>
                    <p className="mt-1 text-xs font-semibold leading-6 text-[var(--muted)]" lang="km">គន្លឹះ៖ បិទចម្លើយ សាកល្បងដោះស្រាយលើក្រដាសសិន រួចប្រៀបធៀបជំហាននីមួយៗ។</p>
                  </section>
                </div>
              </article>
            ))}
          </div>
        </section>

        <nav className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" aria-label="Chapter navigation">
          {previous ? <Link href={`/courses/${previous.slug}`} className="rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-extrabold hover:border-[var(--brand)]">← Previous: Chapter {previous.number}</Link> : <span />}
          {next ? <Link href={`/courses/${next.slug}`} className="rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-extrabold text-white hover:bg-[var(--brand-dark)]">Next: Chapter {next.number} →</Link> : <Link href="/courses" className="rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-extrabold text-white hover:bg-[var(--brand-dark)]">Back to all chapters →</Link>}
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
