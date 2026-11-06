import type { Metadata } from "next";
import "./globals.css";
import { AppPreferencesProvider } from "@/components/app-preferences";

export const metadata: Metadata = {
  title: {
    default: "ApparxMath — Mathematics, made understandable",
    template: "%s | ApparxMath"
  },
  description: "A bilingual mathematics learning platform for students and teachers in Cambodia."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppPreferencesProvider>{children}</AppPreferencesProvider>
      </body>
    </html>
  );
}
