import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function TeachersPage() {
  return <><SiteHeader /><main className="container min-h-[70vh] py-16"><p className="text-sm font-bold uppercase tracking-[.15em] text-[var(--brand)]">For educators</p><h1 className="mt-3 text-4xl font-black">Tools that support great teaching.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">The teacher workspace is planned for a later phase: class rosters, assignments, quizzes, marking, feedback, and learning progress insights. It will be built on top of the same secure foundation as student accounts.</p><p className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-blue-900">Teacher tools are planned, not yet available. We will validate classroom workflows before enabling school accounts.</p></main><SiteFooter /></>;
}
