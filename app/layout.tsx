import type { Metadata } from "next";
import { Inter, Gajraj_One } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const gajraj = Gajraj_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: "Lunar Wolf Atelier",
  description:
    "Design a bespoke illustrated wolf with dynamic palettes, atmospheres, and downloadable artwork."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-slate-950">
      <body
        className={`${inter.className} ${gajraj.variable} min-h-screen bg-slate-950 text-slate-100 antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
