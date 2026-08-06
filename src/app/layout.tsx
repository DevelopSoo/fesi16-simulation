// src/app/layout.tsx

import "./globals.css";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-pacifico",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pacifico.className}>
      <body>{children}</body>
    </html>
  );
}
