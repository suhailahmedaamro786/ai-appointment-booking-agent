import { NextResponse } from "next/server";
export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "ai-appointment-booking-agent",
    mode: "demo",
    timestamp: new Date().toISOString()
  });
}
