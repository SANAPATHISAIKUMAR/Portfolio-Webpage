import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { themeInitScript } from "../components/providers/ThemeProvider";
import { siteConfig } from "../config/site";
import { getSiteUrl } from "../config/site-url";

const siteUrl = getSiteUrl();

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Sanapathi Sai Kumar",
    "Software Engineer",
    "Associate Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "MERN Stack Developer",
    "AWS Developer",
    "AI Engineer",
    "Healthcare Software Engineer",
    "TypeScript",
    "MongoDB",
  ],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // OG/Twitter images come from the app/opengraph-image.tsx and
  // app/twitter-image.tsx file conventions — Next wires them in automatically,
  // so there's no static PNG to fall out of date (or 404, as the old one did).
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050816" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteUrl,
  jobTitle: siteConfig.role,
  worksFor: { "@type": "Organization", name: siteConfig.company },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Dhanalakshmi Srinivasan University",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Visakhapatnam",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Full-Stack Development",
    "MERN Stack",
    "React",
    "Node.js",
    "TypeScript",
    "REST API Design",
    "MongoDB",
    "AWS",
    "System Design",
    "Machine Learning",
  ],
  description: siteConfig.description,
  email: `mailto:${siteConfig.email}`,
  sameAs: siteConfig.links
    .filter((l) => l.platform !== "Email")
    .map((l) => l.url),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[2000] focus:rounded-lg focus:bg-accent-blue focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-glow"
          >
            Skip to content
          </a>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
