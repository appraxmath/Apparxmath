import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function LoginPage() {
  return <><SiteHeader /><main className="container grid min-h-[65vh] place-items-center py-16"><section className="w-full max-w-md rounded-3xl border border-[var(--line)] bg-white p-8"><p className="text-sm font-bold text-[var(--brand)]">APPARXMATH ACCOUNT</p><h1 className="mt-3 text-3xl font-black">Welcome back</h1><p className="mt-3 leading-6 text-[var(--muted)]">Account sign-in is part of the next development phase. Authentication is not active yet.</p><button disabled className="mt-7 w-full cursor-not-allowed rounded-xl bg-slate-200 px-5 py-3 font-bold text-slate-500">Login coming soon</button><p className="mt-5 text-center text-sm text-slate-500">New here? <Link className="font-bold text-[var(--brand)]" href="/register">Create an account</Link></p></section></main><SiteFooter /></>;
}
