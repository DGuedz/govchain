"use client";

import { ShieldCheck, Lock, Wifi, AlertTriangle } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";
import { useMockWallet } from "@/hooks/useMockWallet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function SecurityBadge() {
  const { role, verifiedGovBr } = useUserRole();
  const { isConnected: isMockConnected } = useMockWallet();
  const [isSecureConnection, setIsSecureConnection] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSecureConnection(window.location.protocol === "https:");
    }
  }, []);

  // Determine security level
  const securityLevel = verifiedGovBr ? "high" : "medium";
  
  if (!role) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end">
      {/* Dev Mode Warning */}
      {isMockConnected && (
        <div className="bg-amber-100 border border-amber-300 text-amber-800 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-sm animate-pulse">
          <AlertTriangle className="h-3.5 w-3.5" />
          Modo Simulação Ativo
        </div>
      )}

      {/* Security Status */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border shadow-sm backdrop-blur-md transition-all cursor-help",
              securityLevel === "high" 
                ? "bg-emerald-50/90 border-emerald-200 text-emerald-700 hover:bg-emerald-100" 
                : "bg-slate-50/90 border-slate-200 text-slate-600 hover:bg-slate-100"
            )}>
              {securityLevel === "high" ? (
                <ShieldCheck className="h-3.5 w-3.5" />
              ) : (
                <Lock className="h-3.5 w-3.5" />
              )}
              <span className="hidden sm:inline">
                {securityLevel === "high" ? "Sessão Verificada (Gov.br)" : "Acesso Básico"}
              </span>
              
              {/* Connection Dot */}
              <span className="relative flex h-2 w-2 ml-1">
                <span className={cn(
                  "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                  isSecureConnection ? "bg-emerald-400" : "bg-amber-400"
                )}></span>
                <span className={cn(
                  "relative inline-flex rounded-full h-2 w-2",
                  isSecureConnection ? "bg-emerald-500" : "bg-amber-500"
                )}></span>
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="left" className="p-3 max-w-xs">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Auditoria de Segurança
              </h4>
              <ul className="text-xs space-y-1 text-slate-600">
                <li className="flex items-center gap-2">
                  <Wifi className="h-3 w-3" />
                  Conexão: {isSecureConnection ? "Criptografada (TLS)" : "Local / Não-Segura"}
                </li>
                <li className="flex items-center gap-2">
                  <UserIcon verified={verifiedGovBr} />
                  Identidade: {verifiedGovBr ? "Validada (Gov.br)" : "Anônima"}
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-3 w-3" />
                  Nível de Acesso: {role.toUpperCase()}
                </li>
              </ul>
              <div className="pt-2 border-t text-[10px] text-slate-400">
                Auditoria em Tempo Real: Ativa
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function UserIcon({ verified }: { verified: boolean }) {
  if (verified) return <ShieldCheck className="h-3 w-3 text-emerald-600" />;
  return <AlertTriangle className="h-3 w-3 text-amber-500" />;
}
