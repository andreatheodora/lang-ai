import { Inter } from "next/font/google";
import "./globals.css";

const nunito = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "learn a language ⋆.𐙚 ̊",
  description: "ai-powered language tutor",
  icons: "/favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>{children}</body>
    </html>
  );
}
