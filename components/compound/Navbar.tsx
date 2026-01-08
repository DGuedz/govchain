"use client";

import { client, chain } from "@/lib/thirdweb";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const account = useActiveAccount();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to dashboard on login if on home page
  useEffect(() => {
    if (account && pathname === "/") {
      router.push("/governance");
    }
  }, [account, pathname, router]);

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
            <div className="bg-[#50C878] p-1.5 rounded-lg">
              <ShieldCheck className="text-white h-5 w-5" />
            </div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">
              GOV.CHAIN
            </span>
          </Link>
          <div className="hidden md:block w-px h-6 bg-slate-300" />
          <Link href="/protocolo" className="hidden md:block text-slate-500 hover:text-[#50C878] transition-colors text-sm font-medium">
            Protocolo de Gestão Transparente
          </Link>
        </div>

        {/* Auth Button */}
        <div>
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
      </div>
    </nav>
  );
}
