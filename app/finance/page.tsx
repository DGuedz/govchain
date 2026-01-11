"use client";

import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useMockWallet } from "@/hooks/useMockWallet";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wallet, TrendingUp, Lock, Coins, ArrowUpRight, ShieldCheck, Banknote } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function FinanceDashboard() {
  const account = useActiveAccount();
  const { mockAddress, isConnected: isMockConnected } = useMockWallet();
  const activeAddress = account?.address || (isMockConnected ? mockAddress : null);

  const router = useRouter();
  const { role, loading } = useUserRole();

  const [isYieldActive, setIsYieldActive] = useState(false);
  const [balance, setBalance] = useState(1450.00);
  const [projectedYield, setProjectedYield] = useState(0);

  const toggleYield = async (checked: boolean) => {
    // Simulation of Smart Contract Interaction (Activate Yield)
    // Endpoint: POST /api/v1/merchant/yield/activate (Rule 3)
    
    if (checked) {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Conectando ao Pool de Liquidez (XRPL EVM)...',
                success: () => {
                    setIsYieldActive(true);
                    setProjectedYield(balance * 0.0065); // Monthly projection (~8% APY)
                    return 'Yield Ativado! Seu saldo agora rende 8% a.a.';
                },
                error: 'Erro ao ativar rendimento',
            }
        );
    } else {
        setIsYieldActive(false);
        setProjectedYield(0);
        toast.info("Rendimento pausado. Seus fundos estão líquidos.");
    }
  };

  if (loading) return <div className="p-8 text-center">Carregando dados financeiros...</div>;

  if (!activeAddress) {
    return (
        <div className="flex h-screen items-center justify-center flex-col gap-4 p-4 text-center">
            <Wallet className="h-12 w-12 text-slate-400" />
            <h1 className="text-xl font-bold">Banco da Cooperativa</h1>
            <p className="text-sm text-slate-500">Conecte sua carteira para acessar serviços financeiros.</p>
        </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Header Mobile Style */}
      <div className="bg-slate-900 px-4 pt-12 pb-8 rounded-b-[2rem] shadow-lg relative overflow-hidden">
        {/* Abstract Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between text-white mb-6 relative z-10">
            <Button variant="ghost" className="text-white hover:bg-slate-800 p-0" onClick={() => router.back()}>
                <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">Gestão Financeira</h1>
            <div className="w-6" /> {/* Spacer */}
        </div>

        <div className="relative z-10 text-center space-y-2">
            <p className="text-slate-400 text-sm">Saldo Total Disponível</p>
            <h2 className="text-4xl font-bold text-white tracking-tight">
                R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h2>
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                <span>+ R$ 12,40 este mês</span>
            </div>
        </div>
      </div>

      <div className="px-4 -mt-6 relative z-20 space-y-6 max-w-lg mx-auto">
        
        {/* Yield Activation Card */}
        <Card className="border-none shadow-lg bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-1 h-1" />
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${isYieldActive ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                            <Coins className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">Renda Passiva</h3>
                            <p className="text-xs text-slate-500">APL: {isYieldActive ? 'Ativo (8% a.a.)' : 'Inativo'}</p>
                        </div>
                    </div>
                    <Switch checked={isYieldActive} onCheckedChange={toggleYield} />
                </div>
                
                {isYieldActive && (
                    <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-emerald-800">Projeção Mensal:</span>
                            <span className="font-bold text-emerald-700">+ R$ {projectedYield.toFixed(2)}</span>
                        </div>
                        <p className="text-[10px] text-emerald-600 mt-1">
                            Baseado na liquidez do pool RLUSD/XRP.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>

        {/* Educational / Context Section */}
        <div className="space-y-4">
            <h3 className="font-bold text-slate-900 px-2">Serviços da Cooperativa</h3>
            
            <div className="grid gap-3">
                <Button variant="outline" className="h-auto p-4 justify-start bg-white border-slate-200 hover:bg-slate-50 hover:border-emerald-200 group">
                    <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-100 transition-colors">
                        <Banknote className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                        <span className="block font-bold text-slate-900">Adiantamento de Safra</span>
                        <span className="block text-xs text-slate-500">Use seu estoque de xisto como garantia.</span>
                    </div>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-slate-300" />
                </Button>

                <Button variant="outline" className="h-auto p-4 justify-start bg-white border-slate-200 hover:bg-slate-50 hover:border-emerald-200 group">
                    <div className="h-10 w-10 bg-amber-50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-amber-100 transition-colors">
                        <Lock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="text-left">
                        <span className="block font-bold text-slate-900">Cofre de Esmeraldas</span>
                        <span className="block text-xs text-slate-500">Custódia segurada de pedras de alto valor.</span>
                    </div>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-slate-300" />
                </Button>
            </div>
        </div>

        {/* Security Badge */}
        <div className="text-center py-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-500">
                <ShieldCheck className="h-3 w-3" />
                Protegido por XRPL Escrow & Multisig
            </div>
        </div>

      </div>
    </main>
  );
}