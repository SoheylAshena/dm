/* ╭─────────────────────────────────────────────────────────────────────────╮
   │                            ✦  S O H E Y L   ✦                           │
   │                                                                         │
   │     • Keeps things small • prefers clarity • avoids late-night hacks    │
   ╰─────────────────────────────────────────────────────────────────────────╯ */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assessment",
  description: "Client-side authentication with Next.js and Shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
