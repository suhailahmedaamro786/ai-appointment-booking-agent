"use client";
import Script from "next/script";
import type { HTMLAttributes, DetailedHTMLProps } from "react";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & { "agent-id"?: string };
    }
  }
}
export default function VoiceAgent() {
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
  if (!agentId) return <div className="rounded-xl border border-dashed border-white/15 p-5"><p className="font-semibold">Voice agent not connected</p><p className="mt-2 text-sm leading-6 text-slate-400">Add NEXT_PUBLIC_ELEVENLABS_AGENT_ID in environment settings to enable the voice widget.</p></div>;
  return <div><Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive"/><p className="mb-3 text-sm text-slate-400">Microphone permission may be required.</p><elevenlabs-convai agent-id={agentId}/></div>;
}
