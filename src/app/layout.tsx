import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-black text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />

        {/*Global toast provider */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
