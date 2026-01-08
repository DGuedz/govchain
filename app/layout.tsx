import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/compound/Navbar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GovChain | A Verdade Híbrida",
  description: "Segurança Jurídica & Rastreabilidade Eterna para a COOPESMERALDA - Campos Verdes 2050",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <ThirdwebProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
          </div>
          <Toaster />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
