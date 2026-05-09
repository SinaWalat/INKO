import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TransitionLayout from "@/components/TransitionLayout";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-sans", // overriding sans so tailwind uses it by default
});

export const metadata: Metadata = {
  title: "INKO - Premium Flagpoles & City Environments",
  description: "Official distributor of Formenta. High-quality flagpoles, flags, and park environments for modern cities.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} font-sans font-light antialiased bg-[#111]`}>
        <TransitionLayout>{children}</TransitionLayout>
      </body>
    </html>
  );
}
