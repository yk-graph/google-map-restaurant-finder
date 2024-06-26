import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "@/providers/session-provider";
import HeaderNavBar from "@/components/header-nav-bar";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "google-map-restaurant-finder",
  description: "Generated by MeetRun Inc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={raleway.className}>
        <SessionProvider>
          <HeaderNavBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
