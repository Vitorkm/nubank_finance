import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { NubankProvider } from "./NubankContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nubank Finance",
  description: "Analysis of Nubank's financials",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <QueryClientProvider client={queryClient}>
          <NubankProvider>
            <Providers>{children}</Providers>
          </NubankProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
