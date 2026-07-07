import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AppShell } from "@/components/layout/AppShell";
import { Toaster } from "sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport = {
  themeColor: "#0878be",
};

export const metadata = {
  title: {
    default: "FirstMED | Online Pharmacy & Self-Care Store",
    template: "%s | FirstMED"
  },
  description: "Shop medicines, OTC care, wellness, nutrition and personal self-care products with prescription-safe checkout.",
  manifest: "/manifest.json",
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
  },
  icons: {
    icon: "/firstmed-logo.png",
    shortcut: "/firstmed-logo.png",
    apple: "/firstmed-logo.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster 
          position="top-right" 
          toastOptions={{ 
            className: "font-bold text-sm rounded-[1.5rem] shadow-premium px-5 py-4 backdrop-blur-xl bg-white/95 border-sky-100",
            classNames: {
              success: "text-emerald-700 bg-emerald-50/95 border-emerald-100",
              error: "text-rose-700 bg-rose-50/95 border-rose-100",
              info: "text-brand-blue bg-sky-50/95 border-sky-100"
            }
          }} 
        />
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
