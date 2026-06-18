import type { Metadata, Viewport } from "next";
import "./globals.css";
import SkipLink from "@/components/SkipLink";
import { LangProvider } from "@/lib/LanguageContext";

// ── Site URL resolution (Vercel-friendly) ──
// 1. NEXT_PUBLIC_SITE_URL — set this in Vercel env vars to your custom domain
// 2. VERCEL_URL — auto-provided by Vercel for preview/production deployments
// 3. localhost fallback for local dev
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  title: {
    default: "Alex Dupont — Software Engineer | AI Engineer | Cloud & MLOps",
    template: "%s | Alex Dupont",
  },
  description:
    "Software Engineer specialized in AI Engineering and Cloud & MLOps. 5 years shipping production ML systems, LLM platforms, and cloud-native infrastructure on AWS & GCP. Open to remote worldwide.",
  keywords: ["AI engineer","MLOps engineer","machine learning engineer","software engineer","cloud engineer","AWS","GCP","Kubernetes","LangChain","LLM","RAG","remote engineer","Canada","Montreal"],
  authors: [{ name: "Alex Dupont", url: SITE_URL }],
  creator: "Alex Dupont",
  applicationName: "Alex Dupont Portfolio",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Alex Dupont — Software Engineer | AI Engineer | Cloud & MLOps",
    description: "AI Engineer & MLOps Specialist · Production ML systems, LLM platforms, AWS/GCP · Open to remote worldwide",
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Dupont — Software Engineer | AI Engineer | Cloud & MLOps",
    description: "AI Engineer & MLOps Specialist · Production ML systems and cloud-native infrastructure",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8b5cf6" },
    { media: "(prefers-color-scheme: dark)",  color: "#7c3aed" },
  ],
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-overlay min-h-screen antialiased">
        <LangProvider>
          <SkipLink />
          <div id="main-content">
            {children}
          </div>
        </LangProvider>
      </body>
    </html>
  );
}
