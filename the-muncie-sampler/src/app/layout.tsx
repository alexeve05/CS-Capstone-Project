import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";

export const metadata: Metadata = {
  title: "The Muncie Sampler",
  description: "The Muncie Sampler",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-100 text-neutral-900 min-h-screen flex flex-col pb-24">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <AudioPlayer />
      </body>
    </html>
  );
}