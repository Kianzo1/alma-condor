import type { Metadata } from "next";
import { EB_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollToTop } from "@/components/ScrollToTop";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://almacondor.com.ar"),
  title: {
    default: "Alma Cóndor — Fuego Ancestral, Terruño Sagrado",
    template: "%s · Alma Cóndor",
  },
  description:
    "Parrilla y cava de altura en Mendoza. Una experiencia ancestral que celebra el fuego, los cortes premium y los vinos nobles del corazón andino.",
  keywords: [
    "parrilla Mendoza",
    "restaurante premium Mendoza",
    "asado argentino",
    "cava de vinos Mendoza",
    "Malbec",
    "Alma Cóndor",
    "experiencia gastronómica Mendoza",
  ],
  authors: [{ name: "Alma Cóndor" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    title: "Alma Cóndor — Fuego Ancestral, Terruño Sagrado",
    description:
      "Parrilla y cava de altura en Mendoza. Donde el fuego despierta el alma de los Andes.",
    siteName: "Alma Cóndor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alma Cóndor",
    description: "Fuego Ancestral, Terruño Sagrado.",
  },
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
    <html
      lang="es-AR"
      className={`${ebGaramond.variable} ${manrope.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-surface text-bone">
        {/* Cinematic opening veil — pure CSS, off-main-thread */}
        <div className="hero-veil" aria-hidden="true" />
        <SmoothScroll />
        <ScrollProgress />
        <NoiseOverlay />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />

        {/* ── Kianzo back-to-portfolio button ── */}
        <a
          href="https://kianzo.org/portfolio"
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.7rem 1.5rem', borderRadius: '8px',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase', textDecoration: 'none',
            color: 'rgba(255,255,255,0.55)',
            background: 'rgba(10,10,10,0.85)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(12px)',
            transition: 'color .4s, border-color .4s, box-shadow .4s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.color = '#fff';
            el.style.borderColor = '#C0001A';
            el.style.boxShadow = '0 0 6px #C0001A, 0 0 22px #C0001A, 0 0 55px rgba(192,0,26,.45)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.color = 'rgba(255,255,255,0.55)';
            el.style.borderColor = 'rgba(255,255,255,0.2)';
            el.style.boxShadow = 'none';
          }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M10 2L4 7L10 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Portfolio
        </a>
      </body>
    </html>
  );
}
