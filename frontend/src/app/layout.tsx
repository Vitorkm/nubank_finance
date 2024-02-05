import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";
import { NubankProvider } from "./NubankContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nubank Finance",
  description: "Analysis of Nubank's financials",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='dark'>
      <body>
        <NubankProvider>
        <Providers>
          {children}
        </Providers>
        </NubankProvider>
      </body>
    </html>
  );
}
