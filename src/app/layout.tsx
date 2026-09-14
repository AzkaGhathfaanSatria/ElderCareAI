import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "ElderCare AI",
  description: "Sistem Monitoring Kesehatan Lansia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}