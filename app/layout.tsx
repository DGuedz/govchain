import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { cn } from "@/lib/utils";
import { LayoutNavbar } from "@/components/LayoutNavbar";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

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
        <Script id="sw-cleanup" strategy="beforeInteractive">
          {`
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistrations().then(function(registrations) {
                for(let registration of registrations) {
                  registration.unregister();
                  console.log('ServiceWorker PayHub/Legacy unregistered');
                }
              });
            }
          `}
        </Script>
        <ThirdwebProvider>
          <div className="flex min-h-screen flex-col">
            <LayoutNavbar />
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
