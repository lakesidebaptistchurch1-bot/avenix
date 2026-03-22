import type { Metadata } from "next";
import { Fira_Sans_Condensed } from "next/font/google";
import Script from "next/script";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import { ConditionalHeader } from "@/components/ConditionalHeader";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const fira = Fira_Sans_Condensed({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lakeside Baptist Church",
  description: "Lakeside Baptist Church — Giving, community, and worship.",
  icons: {
    icon: "/images/LBC%20LOGO.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Legacy template styles (kept in `/public/css`) */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/slicknav.min.css" />
        <link rel="stylesheet" href="/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/mousecursor.css" />
        <link rel="stylesheet" href="/css/plyr.css" />
        <link rel="stylesheet" href="/css/custom.css" />
      </head>

      <body className={`${fira.variable} antialiased`}>
        <Preloader />
        <ConditionalHeader />
        {children}
        <ConditionalFooter />

        {/* Legacy template scripts (kept in `/public/js`) */}
        <Script src="/js/jquery-3.7.1.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/js/validator.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.slicknav.js" strategy="afterInteractive" />
        <Script src="/js/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.waypoints.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.counterup.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/js/SmoothScroll.js" strategy="afterInteractive" />
        <Script src="/js/parallaxie.js" strategy="afterInteractive" />
        <Script src="/js/gsap.min.js" strategy="afterInteractive" />
        <Script src="/js/magiccursor.js" strategy="afterInteractive" />
        <Script src="/js/SplitText.js" strategy="afterInteractive" />
        <Script src="/js/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.mb.YTPlayer.min.js" strategy="afterInteractive" />
        <Script src="/js/plyr.js" strategy="afterInteractive" />
        <Script src="/js/wow.js" strategy="afterInteractive" />
        <Script src="/js/function.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
