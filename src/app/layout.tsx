import type { Metadata } from "next";
import { EB_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorFollower } from "@/components/CursorFollower";

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
        <CursorFollower />
        <ScrollProgress />
        <NoiseOverlay />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
