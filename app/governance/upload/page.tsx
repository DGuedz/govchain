
"use client";

import { useActiveAccount } from "thirdweb/react";
import { OraculoUpload } from "@/components/compound/OraculoUpload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUserRole } from "@/hooks/useUserRole";

export default function OraclePage() {
  const account = useActiveAccount();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';
  const { role, isLoading } = useUserRole();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Demo Mode Bypass
    if (isDemo) {
        setIsAuthorized(true);
        return;
    }

    if (!isLoading) {
      if (!account) {
        toast.error("Acesso restrito. Faça login.");
        router.push("/governance");
        return;
      }
      // Simple role check (In production this would be more robust)
      if (role === 'admin' || role === 'president') {
        setIsAuthorized(true);
      } else {
        toast.error("Acesso negado. Apenas administradores.");
        router.push("/governance");
      }
    }
  }, [account, role, isLoading, router, isDemo]);

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
            <div className="p-3 bg-purple-100 rounded-xl">
                <ShieldCheck className="h-8 w-8 text-purple-600" />
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
