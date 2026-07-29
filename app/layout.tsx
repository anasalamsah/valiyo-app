import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Valiyo — Growing Every Child's Future",
  description:
    "Help parents understand each child's unique strengths and support their learning journey with personalized insights and future-ready experiences.",
};

// Fonts are loaded via a stylesheet link (rather than next/font) so the app
// still builds in sandboxed/offline environments without egress to Google
// Fonts. In a normal deployment this resolves at request time in the
// browser; swap for next/font/google if you want fonts self-hosted/inlined.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- app router root layout, not pages/_document */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
