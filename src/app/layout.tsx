import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ApparxMath — Mathematics, made understandable",
    template: "%s | ApparxMath"
  },
  description:
    "A modern mathematics learning platform for students, teachers, and schools in Cambodia."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
