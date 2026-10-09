import Image from "next/image";
import AppointmentForm from "@/components/AppointmentForm";
import VoiceAgent from "@/components/VoiceAgent";

const services = [
  { number: "01", title: "Skin Consultation", description: "A one-to-one consultation to discuss your skin concerns and build a suitable care plan.", tag: "PERSONALISED CARE" },
  { number: "02", title: "Acne & Blemish Care", description: "Professional guidance for acne-prone skin, blemishes, and everyday skincare routines.", tag: "SKIN HEALTH" },
  { number: "03", title: "Glow & Hydration Facial", description: "A refreshing facial experience focused on hydration and healthy-looking skin.", tag: "FACIAL CARE" },
  { number: "04", title: "Pigmentation Consultation", description: "Discuss uneven tone and pigmentation concerns with a skincare professional.", tag: "TARGETED SUPPORT" },
  { number: "05", title: "Sensitive Skin Support", description: "Explore gentle skincare options for skin that feels reactive or easily irritated.", tag: "GENTLE APPROACH" },
  { number: "06", title: "Routine Review", description: "Get help understanding your current products and building a simpler routine.", tag: "EVERYDAY CARE" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="shell flex h-[82px] items-center justify-between border-b border-white/10">
        <a href="#" aria-label="SkinCare Clinic home" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-emerald-200/20 bg-emerald-200/10 text-xl text-emerald-100">✳</span>
          <span><span className="block text-sm font-semibold tracking-wide">SKINCARE CLINIC</span><span className="mt-1 block text-[10px] tracking-[.2em] text-emerald-200/70">PERSONALISED SKIN HEALTH</span></span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          <a className="transition hover:text-emerald-200" href="#services">Services</a>
          <a className="transition hover:text-emerald-200" href="#about">Our approach</a>
          <a className="transition hover:text-emerald-200" href="#assistant">AI assistant</a>
        </nav>
        <a className="btn" href="#book">Book appointment <span aria-hidden="true">↗</span></a>
      </header>

      <section className="shell grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.08fr_.92fr] lg:gap-16 lg:py-24">
        <div>
          <p className="label flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_#34d399]" /> YOUR SKIN, YOUR CARE JOURNEY</p>
          <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-.045em] sm:text-6xl lg:text-[68px]">Feel confident in <span className="gradient">your skin.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">Thoughtful skincare consultations and personalised guidance to help you make informed choices for your skin.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a className="btn" href="#book">Schedule a visit <span aria-hidden="true">→</span></a><a className="ghost" href="#services">Explore services</a></div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-slate-300"><span>✓ Personalised consultations</span><span>✓ Care-focused approach</span><span>✓ Easy online requests</span></div>
          <p className="mt-5 text-xs leading-5 text-slate-500">Clinic name, address, practitioner credentials and prices should be customised before public launch.</p>
        </div>
        <div className="relative mx-auto w-full max-w-[490px]">
          <div className="pointer-events-none absolute -inset-8 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="glass relative overflow-hidden rounded-[30px] p-5 shadow-2xl shadow-black/30 sm:p-7">
            <div className="skin-art relative flex min-h-[270px] items-end overflow-hidden rounded-[22px] p-6">
              <div className="absolute right-8 top-8 h-32 w-32 rounded-full border border-white/30" /><div className="absolute right-16 top-16 h-20 w-20 rounded-full border border-white/20" />
              <div className="relative max-w-xs"><p className="text-[10px] font-bold tracking-[.25em] text-emerald-50/80">CARE THAT STARTS WITH YOU</p><p className="mt-3 text-3xl font-semibold leading-tight text-white">A thoughtful approach to skin health.</p></div>
            </div>
            <div className="grid grid-cols-3 gap-3 py-5 text-center"><div><p className="text-sm font-semibold text-emerald-200">Consult</p><p className="mt-1 text-[10px] text-slate-400">Understand</p></div><div className="border-x border-white/10"><p className="text-sm font-semibold text-emerald-200">Personalise</p><p className="mt-1 text-[10px] text-slate-400">Plan</p></div><div><p className="text-sm font-semibold text-emerald-200">Care</p><p className="mt-1 text-[10px] text-slate-400">Follow up</p></div></div>
            <a href="#book" className="flex items-center justify-between rounded-xl border border-emerald-200/15 bg-emerald-200/[.06] p-4"><span><span className="block text-sm font-semibold">Ready to book a visit?</span><span className="mt-1 block text-xs text-slate-400">Choose a service and preferred time</span></span><span className="text-xl text-emerald-200">↗</span></a>
          </div>
        </div>
      </section>

      <section id="services" className="shell border-t border-white/10 py-16 sm:py-20">
        <div className="max-w-2xl"><p className="label">Skincare services</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Care designed around your needs.</h2><p className="mt-4 text-sm leading-7 text-slate-300">Choose a starting point. Your practitioner can advise what is appropriate during a consultation.</p></div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((service) => <article className="card transition duration-200 hover:-translate-y-1 hover:border-emerald-200/25" key={service.number}><p className="text-xs font-bold tracking-widest text-emerald-200">{service.number} / {service.tag}</p><h3 className="mt-5 text-lg font-semibold">{service.title}</h3><p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p><a className="mt-5 inline-flex text-sm font-semibold text-emerald-200" href="#book">Book this service <span className="ml-2">→</span></a></article>)}</div>
      </section>

      <section id="about" className="border-y border-white/10 bg-white/[.018] py-16 sm:py-20"><div className="shell grid gap-10 lg:grid-cols-2 lg:items-center"><div><p className="label">A considered approach</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Clear guidance. Realistic expectations.</h2><p className="mt-4 text-sm leading-7 text-slate-300">Good skincare begins with understanding your needs, routine and concerns. We aim to make the next step feel clear, calm and personal.</p></div><div className="grid gap-3 sm:grid-cols-2"><div className="card"><p className="text-lg">01</p><h3 className="mt-3 font-semibold">Listen first</h3><p className="mt-2 text-sm leading-6 text-slate-400">Tell us what you want help with at your visit.</p></div><div className="card"><p className="text-lg">02</p><h3 className="mt-3 font-semibold">Personalised plan</h3><p className="mt-2 text-sm leading-6 text-slate-400">Discuss options suited to your concerns.</p></div></div></div></section>

      <section id="book" className="shell py-16 sm:py-20"><div className="grid items-start gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16"><div><p className="label">Online appointments</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Request your appointment.</h2><p className="mt-4 text-sm leading-7 text-slate-300">Share your contact details, choose a service and select a preferred time. Please wait for the clinic to confirm your appointment.</p><div className="mt-6 rounded-2xl border border-emerald-200/15 bg-emerald-200/[.04] p-4"><p className="text-sm font-semibold text-emerald-100">Your privacy matters</p><p className="mt-2 text-xs leading-6 text-slate-400">Do not include sensitive medical details in this form. For urgent or severe skin symptoms, contact a qualified healthcare professional.</p></div></div><div className="glass rounded-3xl p-5 sm:p-7"><AppointmentForm /></div></div></section>

      <section id="assistant" className="border-y border-white/10 bg-white/[.018] py-16 sm:py-20"><div className="shell grid items-start gap-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-16"><div><p className="label">Voice concierge</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Need help getting started?</h2><p className="mt-4 text-sm leading-7 text-slate-300">Try the AI voice assistant for general information. Appointment requests should be submitted using the booking form and are not confirmed until the clinic verifies them.</p><p className="mt-4 text-xs leading-6 text-slate-500">The voice agent must be configured in ElevenLabs and connected to secure booking tools before it can create appointments.</p></div><div className="glass rounded-3xl p-5 sm:p-7"><div className="mb-6"><h3 className="font-semibold">AI skincare receptionist</h3><p className="mt-1 text-xs text-slate-400">Voice assistant preview</p></div><VoiceAgent /></div></div></section>

      <footer className="border-t border-white/10"><div className="shell flex flex-col gap-4 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 SkinCare Clinic. Website by SK DEV TEAM.</p><div className="flex gap-5"><a className="transition hover:text-white" href="https://github.com/suhailahmedaamro786/ai-appointment-booking-agent">GitHub ↗</a><a className="transition hover:text-white" href="/api/health">System status ↗</a></div></div></footer>
    </main>
  );
}
