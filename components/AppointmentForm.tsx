"use client";

import { FormEvent, useState } from "react";

const services = ["Skin Consultation", "Acne & Blemish Care", "Glow & Hydration Facial", "Pigmentation Consultation", "Sensitive Skin Support", "Routine Review"];

export default function AppointmentForm() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: data.get("name"),
          patient_phone: data.get("phone"),
          patient_email: data.get("email") || null,
          service_name: data.get("service"),
          starts_at: new Date(String(data.get("date")) + "T" + String(data.get("time")) + ":00+05:00").toISOString(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We could not submit your request. Please try again.");
      setMessage({ type: "success", text: "Your appointment request has been received. Keep your reference code: " + result.confirmation_code + ". The clinic must confirm the time." });
      form.reset();
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Something went wrong." });
    } finally {
      setBusy(false);
    }
  }

  const today = new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString().slice(0, 10);

  return (
    <form className="space-y-5" onSubmit={submit}>
      <div><h3 className="text-lg font-semibold">Appointment request</h3><p className="mt-1 text-sm text-slate-400">Fields marked * are required.</p></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">Full name *<input required minLength={2} maxLength={120} name="name" autoComplete="name" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-emerald-300/50" placeholder="Your name" /></label>
        <label className="block text-sm text-slate-300">Mobile number *<input required minLength={7} maxLength={30} name="phone" autoComplete="tel" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-emerald-300/50" placeholder="+92 3xx xxxxxxx" /></label>
      </div>
      <label className="block text-sm text-slate-300">Email (optional)<input type="email" maxLength={254} name="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-emerald-300/50" placeholder="you@example.com" /></label>
      <label className="block text-sm text-slate-300">Service *<select required name="service" defaultValue="" className="mt-2 w-full rounded-xl border border-white/10 bg-[#111916] px-4 py-3 text-sm outline-none focus:border-emerald-300/50"><option value="" disabled>Select a service</option>{services.map((service) => <option key={service} value={service}>{service}</option>)}</select></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">Preferred date *<input required type="date" min={today} name="date" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-emerald-300/50" /></label>
        <label className="block text-sm text-slate-300">Preferred time *<select required name="time" defaultValue="" className="mt-2 w-full rounded-xl border border-white/10 bg-[#111916] px-4 py-3 text-sm outline-none focus:border-emerald-300/50"><option value="" disabled>Select time</option>{["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","14:00","14:30","15:00","15:30","16:00","16:30"].map((time) => <option key={time} value={time}>{time}</option>)}</select></label>
      </div>
      <p className="text-xs leading-5 text-slate-500">Your selected time is a preference, not a confirmed slot. Please do not submit medical history or payment information.</p>
      {message && <p role="status" className={"rounded-xl border p-4 text-sm leading-6 " + (message.type === "success" ? "border-emerald-300/20 bg-emerald-300/[.06] text-emerald-100" : "border-rose-300/20 bg-rose-300/[.06] text-rose-100")}>{message.text}</p>}
      <button disabled={busy} type="submit" className="btn w-full disabled:cursor-not-allowed disabled:opacity-60">{busy ? "Submitting request…" : "Request appointment →"}</button>
    </form>
  );
}
