import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wattsavvyhome.com"),
  title: "WattSavvyHome | Control de Energía Doméstica y Ahorro Inteligente",
  description: "Tu panel informativo y guía definitiva sobre monitores de energía, enchufes inteligentes, autoconsumo solar y domótica para optimizar tu factura eléctrica.",
  keywords: ["ahorro de energía", "monitores de energía", "enchufes inteligentes", "domótica eficiente", "energía solar", "factura eléctrica"],
  authors: [{ name: "Equipo de WattSavvyHome" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${inter.variable} h-full antialiased font-sans`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6737064906428173"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#020617] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-400">
        {children}
      </body>
    </html>
  );
}
