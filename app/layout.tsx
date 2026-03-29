import AudioControls from "./components/common/AudioControls";
import CanvasLoader from "./components/common/CanvasLoader";
import SecurityControls from "./components/common/SecurityControls";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokesh Patra - Sr. Associate DSML Developer ",
    description: "Engineer by profession, Thinker at heart.",
  },
  verification: {
    google: "GsRYY-ivL0F_VKkfs5KAeToliqz0gCrRAJKKmFkAxBA",
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
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}
        <AudioControls />
        <SecurityControls />
      </body>
      <GoogleAnalytics gaId={'G-7WD4HM3XRE'} />
    </html>
  );
}
