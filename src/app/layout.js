import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AppShell } from "@/components/layout/AppShell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: {
    default: "FirstMED | Online Pharmacy & Self-Care Store",
    template: "%s | FirstMED"
  },
  description: "Shop medicines, OTC care, wellness, nutrition and personal self-care products with prescription-safe checkout.",
  metadataBase: new URL("https://firstmed.local"),
  openGraph: {
    title: "FirstMED Online Pharmacy",
    description: "A modern pharmacy shelf for everyday care.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstMED Online Pharmacy"
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
