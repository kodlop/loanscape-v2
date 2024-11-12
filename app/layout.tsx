import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "LOANSCAPE",
  description: "Manage your leads form one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <>
            {children}
            <Toaster />
          </>
        </Providers>
      </body>
    </html>
  );
}
