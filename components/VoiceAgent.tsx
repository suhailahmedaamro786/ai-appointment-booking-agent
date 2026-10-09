"use client";

import Script from "next/script";
import { createElement, useEffect, useState } from "react";

export default function VoiceAgent() {
  // Public agents can use their Agent ID in the browser. Never read an API key here.
  const publicAgentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
  const [signedUrl, setSignedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (publicAgentId) return;

    let cancelled = false;
    setLoading(true);
    fetch("/api/elevenlabs/signed-url", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || "Voice agent is not configured yet.");
        if (!data.signed_url) throw new Error("ElevenLabs did not return a signed URL.");
        if (!cancelled) setSignedUrl(data.signed_url);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not connect the voice agent.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [publicAgentId]);

  const agentReady = Boolean(publicAgentId || signedUrl);

  return (
    <div>
      <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" />
      <p className="mb-3 text-sm text-slate-400">Microphone permission may be required.</p>
      {agentReady
        ? createElement(
            "elevenlabs-convai" as unknown as React.ElementType,
            publicAgentId ? { "agent-id": publicAgentId } : { "signed-url": signedUrl }
          )
        : <div className="rounded-xl border border-dashed border-white/15 p-5">
            <p className="font-semibold">{loading ? "Connecting voice agent…" : "Voice agent not connected"}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {error || "Set NEXT_PUBLIC_ELEVENLABS_AGENT_ID for a public agent, or set ELEVENLABS_AGENT_ID and ELEVENLABS_API_KEY as server-side Vercel environment variables for a private agent."}
            </p>
          </div>}
    </div>
  );
}
