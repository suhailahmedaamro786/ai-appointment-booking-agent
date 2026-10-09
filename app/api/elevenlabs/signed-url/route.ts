import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;

  if (!apiKey || !agentId) {
    return NextResponse.json(
      { error: "Private voice agent is not configured. Add ELEVENLABS_API_KEY and ELEVENLABS_AGENT_ID in Vercel server-side environment variables." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const url = new URL("https://api.elevenlabs.io/v1/convai/conversation/get-signed-url");
    url.searchParams.set("agent_id", agentId);

    const response = await fetch(url, {
      method: "GET",
      headers: { "xi-api-key": apiKey, "Accept": "application/json" },
      cache: "no-store"
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Do not return upstream response bodies or credentials to the browser.
      return NextResponse.json(
        { error: response.status === 401 || response.status === 403
          ? "ElevenLabs rejected the server-side credentials. Check the API key permissions and Agent ID."
          : "ElevenLabs could not create a signed voice session. Check the agent configuration and try again." },
        { status: 502, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (typeof data.signed_url !== "string" || !data.signed_url) {
      return NextResponse.json(
        { error: "ElevenLabs returned no signed URL. Check the Agent ID and agent configuration." },
        { status: 502, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      { signed_url: data.signed_url },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch {
    return NextResponse.json(
      { error: "Could not reach ElevenLabs. Try again shortly." },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}
