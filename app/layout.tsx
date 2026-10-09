import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "AI Receptionist | SK DEV TEAM",
  description: "Explore a voice-powered AI appointment receptionist demo built by SK DEV TEAM."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
