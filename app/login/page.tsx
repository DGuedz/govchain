"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, CheckCircle2, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const account = useActiveAccount();
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [showGovBrDialog, setShowGovBrDialog] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);

  const handleGovBrLogin = async () => {
    // --- DEV NET BYPASS ---
    // Se não tiver carteira conectada, simula o fluxo completo para demonstração.
    const isSimulation = !account;

    setShowGovBrDialog(true);
    setIsVerifying(true);
    setVerificationStep(1);

    // Simulate Gov.br API Validation Steps
    setTimeout(() => setVerificationStep(2), 1500); // Step 2: Validating CPF
    setTimeout(() => setVerificationStep(3), 3000); // Step 3: Biometrics
    
    setTimeout(async () => {
      // Step 4: Complete
      try {
        if (!isSimulation && account) {
            // Update profile in Supabase (Real Mode)
            const { error } = await supabase
            .from("profiles")
            .upsert({
                wallet_address: account.address,
                role: 'garimpeiro', // Default Tier 3 Role
                verified_govbr: true,
                updated_at: new Date().toISOString()
            }, { onConflict: 'wallet_address' });

            if (error) throw error;
        } else {
            // DEV NET: Ativar carteira mock sem recarregar a página (o router.push fará a navegação)
            connectMock(true);
        }

        toast.success("Identidade Gov.br validada com sucesso!");
        router.push("/governance");
        
      } catch (err) {
        console.error(err);
        toast.error("Erro ao vincular conta Gov.br");
      } finally {
        setIsVerifying(false);
        setShowGovBrDialog(false);
      }
    }, 4500);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg border-emerald-100">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-emerald-100 p-3 rounded-full w-fit">
            <ShieldCheck className="h-10 w-10 text-emerald-700" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">Acesso GovChain</CardTitle>
          <CardDescription>
            Identifique-se para acessar a área de governança da COOPERSMERALDA.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <Button 
            className="w-full h-12 text-lg font-medium bg-[#002D72] hover:bg-[#001d4a] text-white flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg"
            onClick={handleGovBrLogin}
            disabled={isVerifying}
          >
            {isVerifying ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <User className="h-5 w-5" />
            )}
            Entrar com Gov.br
          </Button>
          
          <p className="text-xs text-center text-slate-500 px-4">
            Ao clicar em "Entrar", você concorda em compartilhar seu CPF e Nome Completo para validação de unicidade de voto (1 CPF = 1 Voto).
          </p>

        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <Button variant="link" size="sm" onClick={() => router.push("/")}>
            Voltar para o Início
          </Button>
        </CardFooter>
      </Card>

      {/* Gov.br Simulation Dialog */}
      <Dialog open={showGovBrDialog} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <img src="/govbr-logo-mock.png" className="h-6 w-auto" alt="" onError={(e) => e.currentTarget.style.display = 'none'} /> 
              Validação Governamental
            </DialogTitle>
            <DialogDescription>
              Conectando aos servidores da Receita Federal...
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Step 1: Connect */}
            <div className="flex items-center gap-3">
              {verificationStep > 0 ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-slate-200" />
              )}
              <span className={verificationStep >= 1 ? "text-slate-900 font-medium" : "text-slate-400"}>
                Estabelecendo conexão segura (SSL)
              </span>
            </div>

            {/* Step 2: CPF */}
            <div className="flex items-center gap-3">
              {verificationStep > 1 ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-slate-200" />
              )}
              <span className={verificationStep >= 2 ? "text-slate-900 font-medium" : "text-slate-400"}>
                Validando unicidade do CPF
              </span>
            </div>

            {/* Step 3: Bio */}
            <div className="flex items-center gap-3">
              {verificationStep > 2 ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-slate-200" />
              )}
              <span className={verificationStep >= 3 ? "text-slate-900 font-medium" : "text-slate-400"}>
                Verificação Biométrica (Nível Prata/Ouro)
              </span>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-md flex items-start gap-3">
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              Estamos gerando seu <strong>Soulbound Token (SBT)</strong> de identidade. Por favor, não feche esta janela.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
