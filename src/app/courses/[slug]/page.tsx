import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { chapters } from "@/lib/grade11-advanced-math";
import { MathText } from "@/components/math-text";
import { FormulaCard } from "@/components/formula-card";

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
          <MathText className="mt-5 block text-base font-medium leading-8 text-[var(--muted)]" text={chapter.introduction.en} />
          <MathText className="mt-2 block text-base font-semibold leading-8 text-[var(--muted)]" lang="km" text={chapter.introduction.km} />
        </header>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-6">
            <h2 className="text-lg font-black">What you will learn / គោលបំណងសិក្សា</h2>
            <ul className="mt-3 space-y-3">
              {chapter.outcomes.map((outcome, index) => (
                <li key={index} className="border-l-4 border-blue-400 pl-3">
                  <MathText className="block text-sm font-semibold leading-7" text={outcome.en} />
                  <MathText className="mt-1 block text-sm font-semibold leading-7 text-[var(--muted)]" lang="km" text={outcome.km} />
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
                  <span><MathText className="block" text={item.en} /><MathText className="block text-[var(--muted)]" lang="km" text={item.km} /></span>
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
                  <MathText className="mt-2 block text-sm font-semibold leading-7" text={lesson.goal.en} />
                  <MathText className="block text-sm font-semibold leading-7 text-[var(--muted)]" lang="km" text={lesson.goal.km} />
                </div>

                <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-2">
                  <section>
                    <h4 className="text-base font-black">Key idea / គំនិតសំខាន់</h4>
                    <MathText className="mt-2 block text-sm font-medium leading-8" text={lesson.keyIdea.en} />
                    <MathText className="mt-2 block text-sm font-semibold leading-8 text-[var(--muted)]" lang="km" text={lesson.keyIdea.km} />
                  </section>
                  <section>
                    <h4 className="text-base font-black">Important formulas / រូបមន្តសំខាន់ៗ</h4>
                    <div className="mt-3 space-y-3">
                      {lesson.formula.map((formula) => <FormulaCard key={formula} formula={formula} context={`${lesson.title.en}. ${lesson.keyIdea.en}`} />)}
                    </div>
                  </section>
                </div>

                <div className="grid gap-5 border-t border-[var(--line)] bg-white p-5 sm:p-6 lg:grid-cols-2">
                  <section>
                    <h4 className="text-base font-black">Worked example / ឧទាហរណ៍ដោះស្រាយ</h4>
                    <MathText className="mt-2 block text-base font-extrabold leading-8" text={lesson.example.question.en} />
                    <MathText className="block text-base font-bold leading-8 text-[var(--muted)]" lang="km" text={lesson.example.question.km} />
                    <ol className="mt-3 space-y-3">
                      {lesson.example.steps.map((step, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--brand)] text-xs font-black text-white">{index + 1}</span>
                          <div className="min-w-0 text-base font-medium leading-8">
                            <MathText className="block" text={step.en} />
                            <MathText className="mt-1 block font-semibold text-[var(--muted)]" lang="km" text={step.km} />
                          </div>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <p className="text-xs font-black uppercase tracking-wider text-emerald-900">Final answer / ចម្លើយចុងក្រោយ</p>
                      <MathText className="mt-1 block text-base font-black leading-8 text-emerald-950" text={lesson.example.answer.en} />
                      <MathText className="block text-base font-bold leading-8 text-emerald-950" lang="km" text={lesson.example.answer.km} />
                    </div>
                  </section>

                  <section className="rounded-2xl border border-[var(--line)] bg-slate-50 p-4 sm:p-5">
                    <h4 className="text-base font-black">Try it yourself / សាកល្បងដោយខ្លួនឯង</h4>
                    <MathText className="mt-3 block text-base font-extrabold leading-8" text={lesson.practice.question.en} />
                    <MathText className="block text-base font-bold leading-8 text-[var(--muted)]" lang="km" text={lesson.practice.question.km} />
                    <details className="mt-5 rounded-xl border border-[var(--line)] bg-white p-4">
                      <summary className="cursor-pointer text-sm font-black text-[var(--brand)]">Show answer / បង្ហាញចម្លើយ</summary>
                      <MathText className="mt-3 block text-base font-bold leading-8" text={lesson.practice.answer.en} />
                      <MathText className="block text-base font-bold leading-8 text-[var(--muted)]" lang="km" text={lesson.practice.answer.km} />
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
