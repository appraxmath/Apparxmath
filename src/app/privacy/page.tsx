import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function PrivacyPage() {
  return <><SiteHeader /><main className="container min-h-[65vh] py-16"><h1 className="text-4xl font-black">Privacy and safety</h1><p className="mt-5 max-w-2xl leading-7 text-[var(--muted)]">This is a placeholder, not a published privacy policy. Before accounts launch, ApparxMath must document what data is collected, why it is needed, how long it is retained, who can access it, and how student and school data is protected. Special care is required because some learners may be minors.</p></main><SiteFooter /></>;
}
