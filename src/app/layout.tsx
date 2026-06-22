import type { Metadata } from "next";
import { ThemeProvider } from "@/src/components/ThemeContext";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { CartProvider } from "@/src/contexts/CartContext";
import { ToastProvider } from "@/src/contexts/ToastContext";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";
import ScrollRestoration from "@/src/components/ScrollRestoration";
import "../index.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://fendolfish.com'),
  title: {
    default: "FENDOL-Fish | Premium Fish Supply",
    template: "%s | FENDOL-Fish",
  },
  description: "Premium supplies of stockfish, smoked catfish, and dried fish. Sourced fresh, processed hygienically, and delivered nationwide to your doorstep or restaurant.",
  keywords: ["fish", "stockfish", "smoked catfish", "dried fish", "nigeria", "premium fish", "fendol fish"],
  openGraph: {
    title: "FENDOL-Fish | Premium Fish Supply",
    description: "Premium supplies of stockfish, smoked catfish, and dried fish. Sourced fresh, processed hygienically, and delivered nationwide.",
    url: "/",
    siteName: "FENDOL-Fish",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FENDOL-Fish | Premium Fish Supply",
    description: "Premium supplies of stockfish, smoked catfish, and dried fish. Sourced fresh, processed hygienically, and delivered nationwide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-background text-on-surface transition-colors selection:bg-secondary selection:text-white">
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <CartProvider>
                <ScrollRestoration />
                <Navbar />
                {children}
                <Footer />
                <WhatsAppButton />
              </CartProvider>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

