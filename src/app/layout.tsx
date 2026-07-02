import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kanhariadarbar.vercel.app"),

  title: {
    default: "Kanharia Darbar Cafe",
    template: "%s | Kanharia Darbar Cafe",
  },

  description:
    "Kanharia Darbar Cafe & Family Restaurant serves delicious Indian, Chinese, Tandoor, Pizza, and Biryani. Order online and enjoy fresh food with fast service and a modern dining experience.",

  applicationName: "Kanharia Darbar Cafe",

  keywords: [
    "Kanharia Darbar Cafe",
    "Family Restaurant",
    "Indian Food",
    "Chinese Food",
    "Tandoor",
    "Pizza",
    "Biryani",
    "Restaurant",
    "Online Food Ordering",
    "Food Delivery",
    "Katihar",
    "Bihar",
  ],

  authors: [
    {
      name: "Md Dilkash Alam",
    },
  ],

  creator: "Md Dilkash Alam",

  publisher: "Kanharia Darbar Cafe",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Kanharia Darbar Cafe",
    description:
      "Enjoy authentic Indian, Chinese, Tandoor, Pizza, and Biryani at Kanharia Darbar Cafe & Family Restaurant. Order online for fresh food and fast service.",
    url: "https://kanhariadarbar.vercel.app",
    siteName: "Kanharia Darbar Cafe",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kanharia Darbar Cafe",
    description:
      "Enjoy authentic Indian, Chinese, Tandoor, Pizza, and Biryani at Kanharia Darbar Cafe & Family Restaurant.",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-black text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
