"use client";

import { client, chain } from "@/lib/thirdweb";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import Link from "next/link";
import Image from "next/image";
import { TestTube, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMockWallet } from "@/hooks/useMockWallet";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function Navbar() {
  const account = useActiveAccount();
  const { mockAddress, connectMock, disconnectMock, isConnected: isMockConnected } = useMockWallet();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to dashboard on login if on home page
  useEffect(() => {
    if ((account || isMockConnected) && pathname === "/") {
      router.push("/governance");
    }
  }, [account, isMockConnected, pathname, router]);

  const wallets = [
    inAppWallet({
      auth: {
        options: ["google", "email", "phone"],
      },
    }),
  ];

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-12 w-12">
              <Image 
                src="/govchain-logo.png" 
                alt="GovChain Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">
              GOV.CHAIN
            </span>
          </Link>
          <div className="hidden md:block w-px h-6 bg-slate-300" />
          <div className="hidden md:flex items-center gap-6">
            <Link href="/protocolo" className="text-slate-500 hover:text-[#50C878] transition-colors text-sm font-medium">
              Protocolo
            </Link>
            <Link href="/public" className="text-slate-500 hover:text-[#50C878] transition-colors text-sm font-medium">
              Transparência
            </Link>
            <Link href="/governance" className="text-slate-500 hover:text-[#50C878] transition-colors text-sm font-medium">
              Governança
            </Link>
          </div>
        </div>

        {/* Auth Button & Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Mock/Simulate Button (Desktop Only) */}
          {!account && !isMockConnected && (
             <Button 
               variant="outline" 
              size="sm" 
              onClick={() => connectMock()}
              className="hidden md:flex border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
             >
               <TestTube className="mr-2 h-4 w-4" />
               Simular Acesso
             </Button>
          )}

          {isMockConnected && !account && (
             <Button 
               variant="destructive" 
               size="sm" 
               onClick={disconnectMock}
               className="hidden md:flex border-red-200"
             >
               Sair da Simulação
             </Button>
          )}

          <div className={`${isMockConnected ? "opacity-50 pointer-events-none" : ""} hidden sm:block`}>
            <ConnectButton
                client={client}
                wallets={wallets}
                accountAbstraction={{
                chain: chain,
                sponsorGas: true,
                }}
                connectModal={{
                size: "compact",
                title: "Acesso Seguro COOPESMERALDA",
                showThirdwebBranding: false,
                }}
                connectButton={{
                label: "Acessar com Gov.br",
                style: {
                    backgroundColor: "#50C878",
                    color: "white",
                    borderRadius: "0.5rem",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    padding: "0.5rem 1.5rem",
                },
                }}
            />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-600">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader className="mb-6 text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="relative h-8 w-8">
                      <Image 
                        src="/govchain-logo.png" 
                        alt="GovChain Logo" 
                        fill
                        className="object-contain"
                      />
                    </div>
                    Gov.Chain
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col gap-4">
                  <Link href="/protocolo" className="text-lg font-medium text-slate-600 py-2 border-b border-slate-100">
                    Protocolo
                  </Link>
                  <Link href="/public" className="text-lg font-medium text-slate-600 py-2 border-b border-slate-100">
                    Transparência
                  </Link>
                  <Link href="/governance" className="text-lg font-medium text-slate-600 py-2 border-b border-slate-100">
                    Governança
                  </Link>

                  <div className="pt-4 flex flex-col gap-3">
                    <div className={isMockConnected ? "opacity-50 pointer-events-none" : ""}>
                      <ConnectButton
                          client={client}
                          wallets={wallets}
                          accountAbstraction={{
                          chain: chain,
                          sponsorGas: true,
                          }}
                          theme={"light"}
                          connectButton={{ label: "Conectar Carteira" }}
                      />
                    </div>
                    
                    {!account && !isMockConnected && (
                      <Button 
                        variant="outline" 
                        onClick={() => connectMock()}
                        className="w-full border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                      >
                        <TestTube className="mr-2 h-4 w-4" />
                        Simular Acesso
                      </Button>
                    )}

                    {isMockConnected && !account && (
                      <Button 
                        variant="destructive" 
                        onClick={disconnectMock}
                        className="w-full border-red-200"
                      >
                        Sair da Simulação
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
