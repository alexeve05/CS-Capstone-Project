import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "The Muncie Sampler",
  description: "Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">
        <Navbar />
        
        <main className="flex-grow w-full max-w-6xl mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}