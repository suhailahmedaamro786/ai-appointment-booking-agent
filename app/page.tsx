import Image from "next/image";
import VoiceAgent from "@/components/VoiceAgent";

const features = [
  { number: "01", title: "Natural conversations", description: "A voice-first interface designed to make appointment requests feel simple and human." },
  { number: "02", title: "Smarter scheduling", description: "A clear foundation for checking availability, collecting details, and confirming requests." },
  { number: "03", title: "Business-ready design", description: "A modern, responsive experience built by SK DEV TEAM for service businesses." },
];
const steps = [
  { number: "01", title: "Talk naturally", detail: "The visitor speaks with the AI receptionist." },
  { number: "02", title: "Understand the request", detail: "The assistant gathers the requested service and preferred time." },
  { number: "03", title: "Check availability", detail: "A connected scheduling service will validate open slots." },
  { number: "04", title: "Confirm securely", detail: "A production backend will save and confirm the booking." },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="shell flex h-[86px] items-center justify-between border-b border-white/10">
        <a href="#" aria-label="SK DEV TEAM home" className="flex items-center">
          <Image src="/sk-dev-team-logo.svg" alt="SK DEV TEAM — AI Automation" width={240} height={63} priority className="h-auto w-[190px] sm:w-[220px]" />
        </a>
        <nav className="hidden items-center gap-7 text-sm text-slate-400 md:flex">
          <a className="transition hover:text-white" href="#capabilities">Capabilities</a>
          <a className="transition hover:text-white" href="#assistant">AI assistant</a>
          <a className="transition hover:text-white" href="#workflow">How it works</a>
        </nav>
        <a className="btn" href="#assistant">Try voice assistant <span aria-hidden="true">↗</span></a>
      </header>

      <section className="shell grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.08fr_.92fr] lg:gap-16 lg:py-28">
        <div>
          <p className="label flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_#34d399]" /> AI-powered appointment experience</p>
          <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-.045em] sm:text-6xl lg:text-[68px]">Appointments made <span className="gradient">effortless.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">Meet your always-ready AI receptionist. Let visitors explore a natural voice experience built for modern appointment-based businesses.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn" href="#assistant">Talk to the AI <span aria-hidden="true">→</span></a>
            <a className="ghost" href="#workflow">Explore the workflow</a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-slate-400">
            <span className="flex items-center gap-2"><span className="text-emerald-300">✓</span> Voice-first experience</span>
            <span className="flex items-center gap-2"><span className="text-emerald-300">✓</span> Responsive design</span>
            <span className="flex items-center gap-2"><span className="text-emerald-300">✓</span> Built by SK DEV TEAM</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[490px]">
          <div className="pointer-events-none absolute -inset-8 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="glass relative rounded-[28px] p-5 shadow-2xl shadow-black/30 sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-400/10 text-xl text-indigo-200">✳</div><div><p className="font-semibold">AI Receptionist</p><p className="mt-1 text-xs text-slate-500">SK DEV TEAM assistant</p></div></div>
              <span className="rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-[10px] font-semibold tracking-wide text-amber-200">PREVIEW</span>
            </div>
            <div className="py-8 text-center">
              <div className="voice-orb mx-auto grid h-36 w-36 place-items-center rounded-full border border-indigo-200/20 bg-indigo-400/[.07]"><div className="grid h-24 w-24 place-items-center rounded-full border border-indigo-200/20 bg-gradient-to-br from-indigo-400/20 to-emerald-300/10 text-4xl text-indigo-100">✳</div></div>
              <p className="mt-6 text-lg font-semibold">How can I help you today?</p>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-400">Start a conversation to explore the voice assistant experience.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-[10px] font-bold tracking-[.18em] text-indigo-200">EXAMPLE CONVERSATION</p><p className="mt-3 text-sm leading-6 text-slate-300">“Hi, I’d like to find a suitable time for an appointment.”</p><div className="mt-3 flex items-center gap-2 text-xs text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Natural language · Simple experience</div></div>
            <p className="mt-4 text-center text-[11px] leading-5 text-slate-500">Preview experience. Real bookings are not enabled yet.</p>
          </div>
        </div>
      </section>

      <section id="capabilities" className="shell border-t border-white/10 py-16 sm:py-20">
        <div className="max-w-2xl"><p className="label">Designed around your customers</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">A better first step to every booking.</h2><p className="mt-4 text-sm leading-7 text-slate-400">A polished voice assistant experience with a clear path toward connected scheduling and business workflows.</p></div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">{features.map((feature) => <article className="card transition duration-200 hover:-translate-y-1 hover:border-indigo-300/25" key={feature.number}><p className="text-xs font-bold tracking-widest text-emerald-300">{feature.number}</p><h3 className="mt-5 text-lg font-semibold">{feature.title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{feature.description}</p></article>)}</div>
      </section>

      <section id="assistant" className="border-y border-white/10 bg-white/[.018] py-16 sm:py-20">
        <div className="shell grid items-start gap-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div><p className="label">Interactive experience</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Meet your AI receptionist.</h2><p className="mt-4 text-sm leading-7 text-slate-400">Use the voice widget to test a conversation. Allow microphone access when your browser asks.</p><div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-200/[.035] p-4"><p className="flex items-center gap-2 text-sm font-semibold text-amber-100"><span aria-hidden="true">ⓘ</span> Preview mode</p><p className="mt-2 text-xs leading-6 text-slate-400">Appointment availability and booking storage are not connected yet. Please do not enter sensitive personal, medical, or payment details.</p></div></div>
          <div className="glass rounded-3xl p-5 sm:p-7"><div className="mb-6 flex items-center justify-between"><div><h3 className="font-semibold">Voice assistant</h3><p className="mt-1 text-xs text-slate-500">Powered by ElevenLabs</p></div><span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-slate-400">VOICE DEMO</span></div><VoiceAgent /></div>
        </div>
      </section>

      <section id="workflow" className="shell py-16 sm:py-20"><p className="label">Built for the next step</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">From conversation to confirmation.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">The interface is ready to evolve. Calendar availability, secure booking APIs, and persistent storage still need to be integrated before this can accept real appointments.</p><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step) => <article className="card" key={step.number}><p className="text-xs font-bold tracking-widest text-indigo-200">{step.number}</p><h3 className="mt-5 font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{step.detail}</p></article>)}</div></section>

      <footer className="border-t border-white/10"><div className="shell flex flex-col gap-4 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 SK DEV TEAM. Built for smarter business workflows.</p><div className="flex gap-5"><a className="transition hover:text-white" href="https://github.com/suhailahmedaamro786/ai-appointment-booking-agent">GitHub ↗</a><a className="transition hover:text-white" href="/api/health">System status ↗</a></div></div></footer>
    </main>
  );
}
