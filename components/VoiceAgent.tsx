"use client";

import Script from "next/script";
import { createElement, useState } from "react";

export default function VoiceAgent() {
  // Public agents can use their Agent ID in the browser. Never read an API key here.
  const publicAgentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
  const [signedUrl, setSignedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function connectPrivateAgent() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/elevenlabs/signed-url", {
        method: "GET",
        cache: "no-store"
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Voice agent is not configured yet.");
      if (typeof data.signed_url !== "string" || !data.signed_url) {
        throw new Error("ElevenLabs did not return a signed URL.");
      }
      setSignedUrl(data.signed_url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not connect the voice agent.");
    } finally {
      setLoading(false);
    }
  }

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
            <p className="font-semibold">Voice agent not connected</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {error || (publicAgentId
                ? "The voice widget is loading."
                : "Configure a public Agent ID, or set ELEVENLABS_AGENT_ID and ELEVENLABS_API_KEY as server-side Vercel environment variables for a private agent.")}
            </p>
            {!publicAgentId && <button
              type="button"
              onClick={connectPrivateAgent}
              disabled={loading}
              className="mt-4 rounded-lg bg-indigo-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-60"
            >{loading ? "Connecting…" : "Connect voice agent"}</button>}
          </div>}
    </div>
  );
}
