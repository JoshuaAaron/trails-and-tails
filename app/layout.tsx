import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import "../src/styles/brand.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Trails & Tails | Private yards. Big adventures",
  description: "Trails & Tails hosts open up their spaces so your dog can run wild, not run into strangers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${libreBaskerville.variable} antialiased`}
        style={{
          fontFamily: "var(--bb-font-body)",
          backgroundColor: "var(--bb-bg-primary)",
          color: "var(--bb-text-primary)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
