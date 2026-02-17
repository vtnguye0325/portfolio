import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CursorTrail } from "../components/CursorTrail";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Creative Developer | Portfolio",
  description: "Scrollytelling personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans text-white antialiased">
        {children}
        <CursorTrail />
      </body>
    </html>
  );
}
