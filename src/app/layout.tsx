import { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import "../styles/animations.css";
import { Chatbot } from "../components/sections/Chatbot";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "Fyn | India's EV Supply Ecosystem",
  description:
    "A tech-enabled, asset-light platform building India's largest EV supply ecosystem — connecting enterprise demand with trained drivers, smart electric vehicles, and a full-stack tech suite.",
  keywords: [
    "EV Mobility",
    "Electric Fleet India",
    "EV Logistics",
    "Fyn Mobility",
    "Refynd EV",
    "INFYNITY App",
    "OptiFyn",
    "India EV Supply",
  ],
  authors: [{ name: "Fyn Mobility" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${barlow.variable} font-sans text-[#F4F4EF] antialiased select-none no-scrollbar`}
      >
        {children}

        {/* Floating Chatbot Engine */}
        <Chatbot />
      </body>
    </html>
  );
}