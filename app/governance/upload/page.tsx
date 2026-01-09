
"use client";

import { useActiveAccount } from "thirdweb/react";
import { useMockWallet } from "@/hooks/useMockWallet";
import { OraculoUpload } from "@/components/compound/OraculoUpload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Lock } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { toast } from "sonner";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader2 } from "lucide-react";

function OracleContent() {
  const account = useActiveAccount();
  const { mockAddress, isConnected: isMockConnected } = useMockWallet();
  const activeAddress = account?.address || (isMockConnected ? mockAddress : null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';
  const { role, loading: isLoading } = useUserRole();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Demo Mode Bypass
    if (isDemo) {
        setIsAuthorized(true);
        return;
    }

    if (!isLoading) {
      if (!activeAddress) {
        toast.error("Acesso restrito. Faça login.");
        router.push("/governance");
        return;
      }
      // Simple role check (In production this would be more robust)
      // Note: In DEV_NET, role is forced to 'admin'
      if (role === 'admin' || role === 'president' || role === 'council') {
        setIsAuthorized(true);
      } else {
        toast.error("Acesso negado. Apenas administradores.");
        router.push("/governance");
      }
    }
  }, [activeAddress, role, isLoading, router, isDemo]);

  const handleAttestationComplete = (data: any) => {
    console.log("Attestation complete:", data);
    toast.success("Documento processado pelo Oráculo!");
    // Redirect to verify page or stay here?
    // router.push(`/verify/${data.id}`);
  };

  if (isLoading && !isDemo) {
    return <div className="min-h-screen flex items-center justify-center">Carregando permissões...</div>;
  }

  if (!isAuthorized) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-100 rounded-xl relative h-20 w-20">
                <Image 
                  src="/govchain-logo.png" 
                  alt="GovChain Logo" 
                  fill
                  className="object-contain"
                />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-slate-900">O Oráculo</h1>
                <p className="text-slate-600">Portal de Upload e Blindagem de Documentos Oficiais</p>
            </div>
        </div>

        <Card className="border-purple-200 shadow-lg">
            <CardHeader className="bg-purple-50/50 border-b border-purple-100">
                <CardTitle className="text-purple-900 flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Área de Registro Seguro
                </CardTitle>
                <CardDescription>
                    Todos os documentos enviados aqui receberão a Tripla Blindagem (QR Code, Hash, Blockchain).
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
                <OraculoUpload onAttestationComplete={handleAttestationComplete} isDemo={isDemo} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function OraclePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-purple-500" /></div>}>
      <OracleContent />
    </Suspense>
  );
}
