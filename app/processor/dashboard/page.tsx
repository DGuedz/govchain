"use client";

import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useMockWallet } from "@/hooks/useMockWallet";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Factory, Search, CheckCircle2, Package, Scale } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function ProcessorDashboard() {
  const account = useActiveAccount();
  const { mockAddress, isConnected: isMockConnected } = useMockWallet();
  const activeAddress = account?.address || (isMockConnected ? mockAddress : null);

  const router = useRouter();
  const { role, isProcessor, loading: roleLoading } = useUserRole();

  const [garimpeiroCpf, setGarimpeiroCpf] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeLots, setActiveLots] = useState<any[]>([]);
  const [processedStats, setProcessedStats] = useState({ tons: 12.5, batches: 45 }); // Mock stats

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!garimpeiroCpf) {
        toast.error("Digite o CPF do Garimpeiro");
        return;
    }
    
    setIsSearching(true);
    // Simulation of fetching lots from Supabase
    setTimeout(() => {
        // Mock data
        setActiveLots([
            { id: 1, hash: 'LOTE-XISTO-8821', weight: 45.5, status: 'pending', date: '10/01/2026' },
            { id: 2, hash: 'LOTE-XISTO-8825', weight: 120.0, status: 'pending', date: '09/01/2026' },
        ]);
        setIsSearching(false);
        toast.success("Lotes encontrados!");
    }, 1000);
  };

  const handleProcessBatch = async (batchId: number) => {
    // Simulation of processing
    toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
            loading: 'Registrando lavagem na Blockchain...',
            success: (data) => {
                setActiveLots(prev => prev.filter(l => l.id !== batchId));
                setProcessedStats(prev => ({ tons: prev.tons + 0.05, batches: prev.batches + 1 })); // Adding weight roughly
                return 'Lavagem registrada com sucesso! Lote liberado para Tier 3.';
            },
            error: 'Erro ao registrar lavagem',
        }
    );
  };

  if (roleLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  }

  if (!activeAddress) {
     return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">Acesso Restrito</h1>
            <p>Conecte sua carteira para acessar o painel.</p>
        </div>
     );
  }

  // Allow Dev Mode or Processor Role
  if (!isProcessor && role !== 'admin') { // Admin can see for debug
      return (
        <div className="flex flex-col items-center justify-center h-screen gap-4 text-center px-4">
            <Factory className="h-16 w-16 text-slate-300" />
            <h1 className="text-2xl font-bold text-slate-800">Acesso Negado</h1>
            <p className="text-slate-600 max-w-md">
                Este painel é exclusivo para Beneficiadores (Lavadores) cadastrados (Tier 4).
            </p>
            <Button onClick={() => router.push('/kyc')}>Cadastrar-se como Lavador</Button>
        </div>
      );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Mobile Header (Only visible on Mobile) */}
      <div className="md:hidden bg-blue-600 px-4 pt-12 pb-6 rounded-b-[2rem] shadow-lg mb-8">
        <div className="flex items-center justify-between text-white mb-6">
            <div>
                <p className="text-blue-100 text-sm">Painel Industrial</p>
                <h1 className="text-2xl font-bold">Beneficiador</h1>
            </div>
            <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center border-2 border-blue-400">
                <Factory className="h-5 w-5 text-white" />
            </div>
        </div>
        
        {/* Stats Card Mobile */}
        <div className="bg-white rounded-xl p-4 shadow-sm text-slate-900">
            <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm font-medium">
                <Scale className="h-4 w-4 text-blue-600" />
                <span>Total Processado</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-4">
                {processedStats.tons.toFixed(1)} <span className="text-sm font-normal text-slate-400">toneladas</span>
            </div>
            <Button 
                variant="outline" 
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                onClick={() => router.push('/finance')}
            >
                Acessar Banco da Cooperativa
            </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-8 md:pt-8">
        
        {/* Desktop Header (Hidden on Mobile) */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                    <Factory className="h-8 w-8 text-blue-600" />
                    Painel do Beneficiador
                </h1>
                <p className="text-slate-600">Gerencie a entrada de xisto e registre a lavagem.</p>
            </div>
            <Button 
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm gap-2"
                onClick={() => router.push('/finance')}
            >
                <Scale className="h-4 w-4" />
                Gestão Financeira
            </Button>
        </div>

        {/* Check-in Section */}
        <div className="grid md:grid-cols-3 gap-8">
            {/* Search Column */}
            <Card className="md:col-span-1 h-fit shadow-md border-slate-200">
                <CardHeader className="bg-slate-100 border-b border-slate-200">
                    <CardTitle className="text-lg text-slate-800">Check-in de Lote</CardTitle>
                    <CardDescription>Busque os lotes do Garimpeiro para iniciar a lavagem.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                        <Label>CPF do Garimpeiro</Label>
                        <Input 
                            placeholder="000.000.000-00" 
                            value={garimpeiroCpf} 
                            onChange={(e) => setGarimpeiroCpf(e.target.value)} 
                        />
                    </div>
                    <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                        onClick={handleSearch}
                        disabled={isSearching}
                    >
                        {isSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                        Buscar Lotes
                    </Button>
                </CardContent>
            </Card>

            {/* Results Column */}
            <div className="md:col-span-2 space-y-6">
                <h2 className="text-xl font-semibold text-slate-800">Lotes Disponíveis</h2>
                
                {activeLots.length === 0 ? (
                    <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center text-slate-500">
                        <Package className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>Nenhum lote encontrado ou selecionado.</p>
                        <p className="text-sm">Faça uma busca pelo CPF para ver os lotes pendentes.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {activeLots.map((lot) => (
                            <Card key={lot.id} className="overflow-hidden border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <Package className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">{lot.hash}</h3>
                                            <div className="flex gap-2 text-sm text-slate-500 mt-1">
                                                <Badge variant="outline" className="bg-slate-50">{lot.date}</Badge>
                                                <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pendente Lavagem</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-sm text-slate-500">Peso Bruto</p>
                                            <p className="text-xl font-bold text-slate-900">{lot.weight} kg</p>
                                        </div>
                                        <Button onClick={() => handleProcessBatch(lot.id)} className="bg-green-600 hover:bg-green-700 text-white">
                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                            Registrar Lavagem
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>

      </div>
    </main>
  );
}