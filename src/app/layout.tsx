import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sumanraj Medikondu — Operations & Supply Chain Leader",
  description:
    "Senior operations and supply chain professional with deep expertise in logistics optimization, vendor management, and business process transformation.",
  keywords: [
    "Sumanraj Medikondu",
    "Operations",
    "Supply Chain",
    "Logistics",
    "Vendor Management",
    "Procurement",
  ],
  authors: [{ name: "Sumanraj Medikondu" }],
  openGraph: {
    title: "Sumanraj Medikondu — Operations & Supply Chain Leader",
    description:
      "Senior operations and supply chain professional with deep expertise in logistics optimization, vendor management, and business process transformation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumanraj Medikondu — Operations & Supply Chain Leader",
    description:
      "Senior operations and supply chain professional with deep expertise in logistics optimization, vendor management, and business process transformation.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
