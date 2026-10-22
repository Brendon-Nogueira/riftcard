import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RiftCards • Player Card Colecionável 3D de League of Legends",
  description:
    "Gere seu Card 3D holográfico estilizado com suas maestrias, elo ranqueado, insígnias de conquistas e estilo de jogo no LoL.",
  keywords: [
    "League of Legends",
    "LoL",
    "Player Card",
    "Card 3D",
    "Riot Games",
    "Invocador",
    "Riot ID",
    "Maestria",
  ],
  authors: [{ name: "RiftCards Fan Project" }],
  openGraph: {
    title: "RiftCards • Seu Card 3D de League of Legends",
    description:
      "Gere seu Card 3D colecionável com insígnias exclusivas e exporte para compartilhar com amigos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
