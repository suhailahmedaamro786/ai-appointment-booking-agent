import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const allowedServices = new Set([
  "Skin Consultation", "Acne & Blemish Care", "Glow & Hydration Facial",
  "Pigmentation Consultation", "Sensitive Skin Support", "Routine Review",
]);

export async function POST(request: Request) {
  const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) || !secretKey) {
    return NextResponse.json({ error: "Online booking is not configured yet. Please contact the clinic directly." }, { status: 503 });
  }

  try {
    const body = await request.json();
    const name = typeof body.patient_name === "string" ? body.patient_name.trim() : "";
    const phone = typeof body.patient_phone === "string" ? body.patient_phone.trim() : "";
    const email = typeof body.patient_email === "string" ? body.patient_email.trim() : null;
    const service = typeof body.service_name === "string" ? body.service_name : "";
    const startsAt = typeof body.starts_at === "string" ? new Date(body.starts_at) : new Date("invalid");
    if (name.length < 2 || name.length > 120) return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
    if (phone.length < 7 || phone.length > 30) return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
    if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (!allowedServices.has(service)) return NextResponse.json({ error: "Please choose a valid service." }, { status: 400 });
    if (!Number.isFinite(startsAt.getTime()) || startsAt.getTime() < Date.now() + 60 * 60 * 1000) return NextResponse.json({ error: "Choose a date and time at least one hour from now." }, { status: 400 });

    const supabase = supabaseAdmin();
    const { data: doctor, error: doctorError } = await supabase.from("doctors").select("id, slot_minutes").eq("active", true).order("created_at", { ascending: true }).limit(1).maybeSingle();
    if (doctorError) throw doctorError;
    if (!doctor) return NextResponse.json({ error: "The clinic schedule is not configured yet. Please contact the clinic." }, { status: 503 });

    const localDate = new Date(startsAt.getTime() + 5 * 60 * 60 * 1000);
    const weekday = localDate.getUTCDay();
    const startTime = localDate.toISOString().slice(11, 19);
    const endTime = new Date(localDate.getTime() + doctor.slot_minutes * 60_000).toISOString().slice(11, 19);
    const { data: schedule, error: scheduleError } = await supabase
      .from("doctor_availability").select("id").eq("doctor_id", doctor.id)
      .eq("weekday", weekday).eq("active", true).lte("start_time", startTime)
      .gte("end_time", endTime).limit(1).maybeSingle();
    if (scheduleError) throw scheduleError;
    if (!schedule) return NextResponse.json({ error: "The selected time is outside the clinic's configured hours. Please choose another time." }, { status: 400 });

    const endsAt = new Date(startsAt.getTime() + doctor.slot_minutes * 60_000);
    const { data, error } = await supabase.from("appointments").insert({
      patient_name: name,
      patient_phone: phone,
      patient_email: email || null,
      doctor_id: doctor.id,
      service_name: service,
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
      status: "pending",
      patient_timezone: "Asia/Karachi",
      source: "website",
    }).select("confirmation_code").single();

    if (error?.code === "23P01" || error?.code === "23505") {
      return NextResponse.json({ error: "That time may already be requested. Please choose another time." }, { status: 409 });
    }
    if (error) throw error;
    return NextResponse.json({ ok: true, confirmation_code: data.confirmation_code }, { status: 201 });
  } catch (error) {
    console.error("Appointment request failed", error);
    return NextResponse.json({ error: "We could not save your request. Please try again later." }, { status: 500 });
  }
}
