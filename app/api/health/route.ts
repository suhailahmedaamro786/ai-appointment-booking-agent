import { NextResponse } from "next/server";

export function GET() {
  const databaseConfigured = Boolean(
    (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)
  );
  return NextResponse.json({
    status: "ok",
    service: "skincare-clinic-appointments",
    mode: databaseConfigured ? "database-configured" : "setup-required",
    databaseConfigured,
    timestamp: new Date().toISOString()
  });
}
