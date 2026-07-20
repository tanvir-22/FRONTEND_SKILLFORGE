import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkillForge AI — Learn smarter with AI-guided courses",
  description:
    "AI-powered online courses: get a personalized learning path and course recommendations for coding, video editing, design, and marketing.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
            <ChatWidget />
            <Toaster position="top-center" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
