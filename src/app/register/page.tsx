import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function RegisterPage() {
  return <><SiteHeader /><main className="container grid min-h-[65vh] place-items-center py-16"><section className="w-full max-w-md rounded-3xl border border-[var(--line)] bg-white p-8"><p className="text-sm font-bold text-[var(--brand)]">JOIN APPARXMATH</p><h1 className="mt-3 text-3xl font-black">Create your learning account</h1><p className="mt-3 leading-6 text-[var(--muted)]">Student, teacher, and school registration flows will be added after the platform&apos;s roles and data permissions are implemented.</p><button disabled className="mt-7 w-full cursor-not-allowed rounded-xl bg-slate-200 px-5 py-3 font-bold text-slate-500">Registration coming soon</button><p className="mt-5 text-center text-sm text-slate-500">Already registered? <Link className="font-bold text-[var(--brand)]" href="/login">Log in</Link></p></section></main><SiteFooter /></>;
}
