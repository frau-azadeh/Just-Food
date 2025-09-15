import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import ScrollToTop from "@/components/ScrollToTop";
import MobileNavBar from "@/components/MobileNavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Just Food",
  description: "Just Food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#fff7ed]`}
      >
        <Navbar />
        {children}
        <ScrollToTop />
        <MobileNavBar />
        <Footer />
      </body>
    </html>
  );
}
