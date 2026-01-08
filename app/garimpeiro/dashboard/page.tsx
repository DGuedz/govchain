"use client";

import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Wallet, History, ChevronRight, Gem } from "lucide-react";

export default function GarimpeiroDashboard() {
  const account = useActiveAccount();
  const router = useRouter();
  const { isGarimpeiro, loading } = useUserRole();

  if (loading) return <div className="p-8 text-center">Carregando carteira...</div>;

  if (!isGarimpeiro) {
    return (
        <div className="flex h-screen items-center justify-center flex-col gap-4 p-4 text-center">
            <Gem className="h-12 w-12 text-emerald-500" />
            <h1 className="text-xl font-bold">Área do Garimpeiro</h1>
            <p className="text-sm text-slate-500">Você precisa ter o perfil de Garimpeiro para acessar.</p>
            <Button onClick={() => router.push("/governance")}>Voltar</Button>
        </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Mobile Header */}
      <div className="bg-emerald-600 px-4 pt-12 pb-6 rounded-b-[2rem] shadow-lg">
        <div className="flex items-center justify-between text-white mb-6">
            <div>
                <p className="text-emerald-100 text-sm">Bem-vindo,</p>
                <h1 className="text-2xl font-bold">Garimpeiro</h1>
            </div>
            <div className="h-10 w-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="font-bold text-sm">JP</span>
            </div>
        </div>

        {/* Saldo Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm text-slate-900">
            <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm">
                <Wallet className="h-4 w-4" />
                <span>Saldo Disponível</span>
            </div>
            <div className="text-3xl font-bold text-emerald-600">
                R$ 1.450,00
            </div>
            <div className="mt-3 pt-3 border-t flex gap-2">
                <Button className="flex-1 bg-emerald-600 h-10 text-sm">
                    Sacar PIX
                </Button>
                <Button variant="outline" className="flex-1 h-10 text-sm border-emerald-200 text-emerald-700">
                    Extrato
                </Button>
            </div>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* Quick Action */}
        <div>
            <h2 className="text-lg font-bold text-slate-800 mb-3">O que deseja fazer?</h2>
            <Button 
                className="w-full h-14 bg-slate-900 text-white rounded-xl shadow-md flex items-center justify-between px-4"
                onClick={() => {}} // TODO: Add register logic
            >
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-slate-700 rounded-full flex items-center justify-center">
                        <Plus className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Registrar Nova Pedra</span>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400" />
            </Button>
        </div>

        {/* Recent Items */}
        <div>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-slate-800">Minhas Pedras</h2>
                <Button variant="ghost" size="sm" className="text-emerald-600 h-auto p-0">Ver todas</Button>
            </div>

            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-none shadow-sm">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <Gem className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">Lote #2024-{i}</p>
                                    <p className="text-xs text-slate-500">Há {i} dias</p>
                                </div>
                            </div>
                            <div className="text-right">
                                {i === 1 ? (
                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">Pago</Badge>
                                ) : (
                                    <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Análise</Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </main>
  );
}
