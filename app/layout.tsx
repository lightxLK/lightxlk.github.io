import AudioControls from "./components/common/AudioControls";
import SecurityControls from "./components/common/SecurityControls";
import MobileMessage from "./components/common/MobileMessage";

import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import Script from "next/script";
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  title: "Lokesh Patra ⚡",
  description: "Engineer by profession, Thinker at heart.",
  keywords: "Lokesh Patra, Research Scholar, Edge AI, Senior Associate DataScience & Machine Learning Developer, React Developer, Three.js, Developer, Web Development, JavaScript, TypeScript, Portfolio",
  authors: [{ name: "Lokesh Patra" }],
  creator: "Lokesh Patra",
  publisher: "Lokesh Patra",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Lokesh Patra - Sr. Associate DSML Developer",
    description: "Engineer by profession, Thinker at heart.",
    url: "https://lightxlk.github.io",
    siteName: "Lokesh Patra's Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/site-logo.png",
        width: 1200,
        height: 630,
        alt: "Lokesh Patra's Portfolio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokesh Patra - Sr. Associate DSML Developer ",
    description: "Engineer by profession, Thinker at heart.",
    images: ["/site-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  verification: {
    google: "e4_H-qo2KANrVThYHbdxqScXu_bONS_logrBVk8MYuE",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-y-none">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M5M5QQZ6QK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-M5M5QQZ6QK');
          `}
        </Script>

      </head>
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >


        {children}
        <AudioControls />
        <SecurityControls />
        <MobileMessage />


      </body>
    </html>
  );
}
