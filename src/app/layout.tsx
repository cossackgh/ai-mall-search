import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "ТРЦ «Галактика» — Торгово-развлекательный центр в Москве",
  description:
    "ТРЦ Галактика на Варшавском шоссе — 100+ магазинов, рестораны, кинотеатр IMAX, боулинг и детская зона. Всё, что нужно — в одной галактике.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
