"use client";

import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useMockWallet } from "@/hooks/useMockWallet";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Wallet, TrendingUp, Lock, Coins, ArrowUpRight, ShieldCheck, Sprout, Leaf, Landmark, Info, PieChart, Clock, CheckCircle2, Loader2, Banknote, Plus, FileText, XCircle, Microscope, Diamond, Gem, ArrowRight } from "lucide-react";
import { GemLabCertificate } from "@/components/gemlab/GemLabCertificate";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hybridStorage } from "@/lib/hybridStorage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CprRequest {
    id: string;
    user_id: string;
    user_name: string;
    amount: number;
    asset_type: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

const CERTIFIED_LOTS = [
    { id: "CV-2026-A1", weight: "2.45 ct", price: 1450.00, quality: "AAA", desc: "Vivid Green • Emerald Cut", mineral: "Natural Emerald • Vivid Green", hash: "0x8a7...f9b2" },
    { id: "CV-2026-A2", weight: "3.12 ct", price: 2100.00, quality: "AAA", desc: "Deep Green • Oval Cut", mineral: "Natural Emerald • Deep Green", hash: "0x3c2...e1a4" },
    { id: "CV-2026-B1", weight: "5.20 ct", price: 4800.00, quality: "Inv.", desc: "Blue Green • Rough/Bruto", mineral: "Natural Emerald • Rough", hash: "0x1d9...c8e5" },
    { id: "CV-2026-C4", weight: "1.85 ct", price: 980.00, quality: "AA", desc: "Light Green • Princess", mineral: "Natural Emerald • Light Green", hash: "0x9b4...a2d1" }
];

export default function EconomyPage() {
  const account = useActiveAccount();
  const { mockAddress, isConnected: isMockConnected } = useMockWallet();
  const activeAddress = account?.address || (isMockConnected ? mockAddress : null);

  const router = useRouter();
  const { role: initialRole, isMiner: initialIsMiner, isCouncil: initialIsCouncil, loading, isGarimpeiro: initialIsGarimpeiro } = useUserRole();

  // --- DEBUG ROLE SWITCHER (FOR TESTING CPR FLOW) ---
  const [debugRole, setDebugRole] = useState<string | null>(null);

  // Derived roles based on debug override or real hook
  const effectiveRole = debugRole || initialRole;
  const isCouncil = debugRole ? debugRole === 'council' : initialIsCouncil;
  const isMiner = debugRole ? debugRole === 'miner' : initialIsMiner;
  const isGarimpeiro = debugRole ? debugRole === 'garimpeiro' : initialIsGarimpeiro;

  // Mock State
  const [vaultValue, setVaultValue] = useState(12500.00); // USD (Valor em Dólar para exportação)
  const [rockDustTons, setRockDustTons] = useState(450); // Toneladas
  
  // Exchange Rate (Mock)
  const BRL_RATE = 5.80;
  const vaultValueBrl = vaultValue * BRL_RATE;
  
  // CPR Logic
  const [isRequesting, setIsRequesting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cprAmount, setCprAmount] = useState("");
  const [cprRequests, setCprRequests] = useState<CprRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  // Gem Details Logic
  const [selectedLot, setSelectedLot] = useState<any | null>(null);

  // Fetch Requests
  useEffect(() => {
    if (!activeAddress) return;
    fetchRequests();
  }, [activeAddress, isCouncil]); // Re-fetch if role or address changes

  async function fetchRequests() {
      setLoadingRequests(true);
      try {
          const table = await hybridStorage.from('cpr_requests');
          
          let result;
          // Fix for hybridStorage builder limitation
          if (!isCouncil) {
              // User: Filter by ID then Order
              result = await table.select('*')
                .eq('user_id', activeAddress)
                .order('created_at', { ascending: false });
          } else {
              // Council: Just Order
              result = await table.select('*')
                .order('created_at', { ascending: false });
          }

          const { data, error } = result;
          
          if (data) {
              // Client-side filter fallback (redundant but safe)
              const filtered = isCouncil 
                ? data 
                : (data as CprRequest[]).filter(r => r.user_id === activeAddress);
              
              setCprRequests(filtered as CprRequest[]);
          }
      } catch (error) {
          console.error("Error fetching CPRs:", error);
      } finally {
          setLoadingRequests(false);
      }
  }

  const handleCreateRequest = async () => {
    if (!cprAmount || isNaN(Number(cprAmount)) || Number(cprAmount) <= 0) {
        toast.error("Digite um valor válido.");
        return;
    }

    setIsRequesting(true);
    
    try {
        const newRequest = {
            id: `cpr-${Date.now()}`,
            user_id: activeAddress,
            user_name: effectiveRole === 'miner' ? 'Mineradora Exemplar Ltda' : 'Garimpeiro Cooperado',
            amount: parseFloat(cprAmount),
            asset_type: 'Lote de Esmeralda (Padrão Exportação)',
            status: 'pending',
            created_at: new Date().toISOString()
        };

        const table = await hybridStorage.from('cpr_requests');
        const { error } = await table.insert(newRequest);

        if (error) throw error;

        toast.success("Solicitação enviada para o Pool de Liquidez (Tesouraria).");
        setIsDialogOpen(false);
        setCprAmount("");
        fetchRequests(); // Refresh list

    } catch (error) {
        console.error(error);
        toast.error("Erro ao solicitar CPR.");
    } finally {
        setIsRequesting(false);
    }
  };

  const handleApprove = async (id: string, currentAmount: number) => {
      try {
          const table = await hybridStorage.from('cpr_requests');
          const { error } = await table.update({ status: 'approved' }).eq('id', id);
          
          if (error) throw error;

          setVaultValue(prev => prev - currentAmount);
          
          toast.success("CPR Aprovada e Liquidada com Sucesso!");
          fetchRequests();
      } catch (error) {
          console.error(error);
          toast.error("Erro ao aprovar CPR.");
      }
  };

  const handleReject = async (id: string) => {
      try {
          const table = await hybridStorage.from('cpr_requests');
          const { error } = await table.update({ status: 'rejected' }).eq('id', id);
          
          if (error) throw error;
          
          toast.info("Solicitação rejeitada.");
          fetchRequests();
      } catch (error) {
          console.error(error);
          toast.error("Erro ao rejeitar.");
      }
  };

  // Calculate Unlocked Value (Approved CPRs)
  const unlockedValue = cprRequests
    .filter(req => req.status === 'approved')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const availableLimit = (vaultValue * 0.7) - unlockedValue;
  const progressPercent = ((vaultValue * 0.7) > 0) ? (unlockedValue / (vaultValue * 0.7)) * 100 : 0;

  if (loading) return <div className="p-8 text-center animate-pulse">Carregando dados econômicos...</div>;

  if (!activeAddress) {
    return (
        <div className="flex h-screen items-center justify-center flex-col gap-4 p-4 text-center bg-slate-50">
            <Landmark className="h-16 w-16 text-slate-300" />
            <h1 className="text-2xl font-bold text-slate-900">Economia Regenerativa</h1>
            <p className="text-sm text-slate-500 max-w-md">
                Acesse a plataforma de CPR Digital e Créditos de Carbono da COOPESMERALDA.
            </p>
            <Button onClick={() => router.push('/login')}>Conectar Carteira</Button>
        </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20 font-sans">
      
      {/* Institutional Header */}
      <div className="bg-slate-900 text-white pt-12 pb-24 px-4 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />
         <div className="container mx-auto max-w-5xl relative z-10">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10 p-0 h-8 w-8" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-emerald-400 border border-white/10">
                    <ShieldCheck className="h-3 w-3" />
                    <span className="uppercase tracking-wider">Compliance Institucional</span>
                </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Meu Financeiro: Pedras e Adiantamentos</h1>
            <p className="text-slate-400 max-w-2xl text-lg">
                Gerencie seus ativos, solicite adiantamentos e acompanhe seus bônus ambientais.
            </p>
         </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 -mt-16 relative z-20 space-y-8">
        
        {/* NEW DASHBOARD: ASSET OVERVIEW */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Total Carats */}
             <Card className="bg-white border border-emerald-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Gem className="h-16 w-16 text-emerald-500" />
                </div>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wide flex items-center gap-2">
                        <Diamond className="h-4 w-4 text-emerald-600" />
                        Esmeraldas (Custódia)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-900">124.5</span>
                        <span className="text-sm font-medium text-slate-500">quilates (ct)</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                        ~ 24.9 gramas de material certificado
                    </p>
                </CardContent>
             </Card>

             {/* Total Valuation */}
             <Card className="bg-white border border-slate-100 shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wide flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        Avaliação Total (GemLab)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl md:text-3xl font-bold text-slate-900">US$ 62,400</span>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+5.2% (Last 30d)</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                        Baseado no índice internacional de pedras coloridas.
                    </p>
                </CardContent>
             </Card>

             {/* Quick Actions */}
             <Card className="bg-slate-900 text-white border-none shadow-lg flex flex-col justify-center">
                <CardContent className="p-6 space-y-3">
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium border-none h-11">
                        <Banknote className="mr-2 h-4 w-4" />
                        Sacar (PIX / Crypto)
                    </Button>
                    <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white h-11">
                        <Plus className="mr-2 h-4 w-4" />
                        Listar Nova Gema
                    </Button>
                </CardContent>
             </Card>
        </section>

        {/* SECTION 1: CPR DIGITAL (DEFI) */}
        <section>
            <div className="flex items-center gap-2 mb-4">
                <Landmark className="h-5 w-5 text-slate-700" />
                <h2 className="text-xl font-bold text-slate-900">Seu Saldo Potencial</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                {/* GEMLAB CERTIFICATION & HOW IT WORKS (Moved Up for better visibility) */}
                <div className="space-y-6 order-2 md:order-1">
                    {/* GemLab Certificate Preview */}
                    <div className="relative group perspective-1000">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                        <GemLabCertificate 
                            assetId="#GEM-CV-2026-88"
                            mineral="Natural Emerald • Vivid Green (AAA)"
                            origin="Campos Verdes, GO • Brazil"
                            spectralHash="0x7f83b...c9a1"
                            weight="4.52 ct (Precision Cut)"
                            valueUsd={12500.00}
                            imageUrl="/gemlab-emerald.png"
                            description="Extra Fine quality with exceptional saturation (Vivid Green). Raman spectroscopy confirms natural Beryl structure with minor clarity enhancement (F1). Blockchain Digital Twin verifies provenance."
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-blue-700 border border-blue-200 shadow-sm flex items-center gap-1">
                            <Microscope className="h-3 w-3" />
                            Exemplo de Laudo
                        </div>
                    </div>

                    {/* How It Works (Refactored for Raman/GemLab) */}
                    <Card className="border border-slate-200 shadow-sm bg-slate-50/50">
                        <CardHeader>
                            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                                <Info className="h-4 w-4 text-blue-500" />
                                Como funciona a Certificação?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-slate-600 space-y-3">
                            <p>
                                Apenas pedras autenticadas pelo <strong>Protocolo GEMLAB</strong> podem ser usadas como garantia.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    <span><strong>Ingestão:</strong> Pesagem e armazenamento no cofre.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    <span><strong>Prova Científica:</strong> Espectrometria Raman gera o DNA da pedra.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    <span><strong>Tokenização:</strong> Emissão do Gêmeo Digital (NFT) para venda.</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT COLUMN: Vault Card & New Emeralds Showcase */}
                <div className="space-y-6 order-1 md:order-2">
                    {/* Vault Card (Moved Down/Right) */}
                    <Card className="border-none shadow-xl bg-white overflow-hidden h-fit">
                        <div className="h-1 bg-gradient-to-r from-slate-700 to-slate-900" />
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wide">Valor das Suas Pedras no Cofre</CardTitle>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-2xl sm:text-3xl font-bold text-slate-900">R$ {vaultValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-6">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-600">Limite de Adiantamento (70%)</span>
                                    <span className="font-semibold text-slate-900">R$ {(vaultValue * 0.7).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <Progress value={70} className="h-2 bg-slate-200" indicatorClassName="bg-slate-700" />
                            </div>

                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button 
                                        className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-base shadow-lg shadow-slate-900/10"
                                    >
                                        <Banknote className="mr-2 h-4 w-4" />
                                        Vender Antecipado (Adiantar 70%)
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md w-[95%] rounded-xl">
                                    <DialogHeader>
                                        <DialogTitle>Venda Antecipada</DialogTitle>
                                        <DialogDescription className="text-sm">
                                            Pegue dinheiro agora usando sua pedra como garantia. Sem juros de banco.
                                            Taxa única de deságio administrativo: 2.5%.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label className="text-base">Quanto você precisa? (R$)</Label>
                                            <Input 
                                                placeholder="0,00" 
                                                type="number" 
                                                inputMode="decimal"
                                                className="h-12 text-lg"
                                                value={cprAmount}
                                                onChange={(e) => setCprAmount(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-base">Garantia (Pedra no Cofre)</Label>
                                            <div className="p-3 bg-slate-100 rounded-lg text-sm text-slate-700 flex items-center gap-3 border border-slate-200">
                                                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                                                </div>
                                                <span className="font-medium">Lote de Esmeralda (Padrão Exportação)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter className="flex-col gap-2 sm:flex-row">
                                        <Button variant="outline" className="w-full sm:w-auto h-11" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                                        <Button onClick={handleCreateRequest} disabled={isRequesting} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 h-11">
                                            {isRequesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                                            Pedir Adiantamento Agora
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <p className="text-[10px] text-center text-slate-400 mt-3">
                                * Isso é uma venda antecipada, não um empréstimo bancário.
                                <br/>Operação mercantil lastreada em Cédula de Produto Rural/Mineral (Lei 14.478).
                            </p>
                        </CardContent>
                    </Card>

                    {/* NEW: Certified Emeralds Showcase (Clean & Minimal) */}
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Gem className="h-4 w-4 text-emerald-500" />
                                Últimas Certificações
                            </h3>
                            <Button variant="ghost" size="sm" className="h-8 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                Ver todas <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {CERTIFIED_LOTS.map((item, i) => (
                                <div 
                                    key={i} 
                                    className="bg-white rounded-lg p-2 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                                    onClick={() => setSelectedLot(item)}
                                >
                                    <div className="aspect-square bg-slate-100 rounded-md mb-2 overflow-hidden relative">
                                        <div className="absolute top-1 right-1 bg-black/60 backdrop-blur text-white text-[8px] px-1.5 py-0.5 rounded-full font-mono z-10">
                                            {item.quality}
                                        </div>
                                        {/* Emerald Image */}
                                        <img 
                                            src="/gemlab-emerald.png" 
                                            alt={item.desc}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Hover Details */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 z-20">
                                            <p className="text-[8px] text-white font-medium leading-tight">{item.desc}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-slate-800">Lote #{item.id}</p>
                                    <p className="text-[10px] text-slate-500 flex justify-between items-center mt-0.5">
                                        <span>{item.weight}</span>
                                        <span className="font-semibold text-emerald-700">US$ {item.price.toLocaleString('en-US')}</span>
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* LOT DETAILS DIALOG */}
                        <Dialog open={!!selectedLot} onOpenChange={(open) => !open && setSelectedLot(null)}>
                            <DialogContent className="sm:max-w-md w-[95%] p-0 bg-transparent border-none shadow-none">
                                {selectedLot && (
                                    <div className="relative">
                                        <div className="absolute -top-10 right-0 z-50">
                                            <Button 
                                                variant="ghost" 
                                                className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 p-0"
                                                onClick={() => setSelectedLot(null)}
                                            >
                                                <XCircle className="h-5 w-5" />
                                            </Button>
                                        </div>
                                        <GemLabCertificate 
                                            assetId={`#GEM-${selectedLot.id}`}
                                            mineral={selectedLot.mineral}
                                            origin="Campos Verdes, GO • Brazil"
                                            spectralHash={selectedLot.hash}
                                            weight={selectedLot.weight}
                                            valueUsd={selectedLot.price}
                                            imageUrl="/gemlab-emerald.png"
                                            description={`${selectedLot.desc}. Certified by GemLab Protocol. Raman Verified.`}
                                        />
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>

                        <div className="mt-4 pt-3 border-t border-slate-200/60">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500">Valor Desbloqueado (CPR)</span>
                                <span className="font-bold text-slate-900">R$ {unlockedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1.5 overflow-hidden">
                                <div 
                                    className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                                <span>Disponível: R$ {availableLimit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                <span>Total: R$ {vaultValueBrl.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</span>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        </section>

        {/* SECTION 1.5: DASHBOARD DE SOLICITAÇÕES (ADMIN & USER) */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-slate-500" />
                    {isCouncil ? "Gestão de CPRs (Mesa Financeira)" : "Minhas Solicitações"}
                </h3>
                {isCouncil && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Visão Administrativa
                    </Badge>
                )}
            </div>
            
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Data</TableHead>
                            {isCouncil && <TableHead>Beneficiário</TableHead>}
                            <TableHead>Valor</TableHead>
                            <TableHead>Status</TableHead>
                            {isCouncil && <TableHead className="text-right">Ações</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loadingRequests ? (
                            <TableRow>
                                <TableCell colSpan={isCouncil ? 6 : 4} className="h-24 text-center">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-emerald-500" />
                                </TableCell>
                            </TableRow>
                        ) : cprRequests.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={isCouncil ? 6 : 4} className="h-24 text-center text-slate-500">
                                    Nenhuma solicitação encontrada.
                                </TableCell>
                            </TableRow>
                        ) : (
                            cprRequests.map((req) => (
                                <TableRow key={req.id}>
                                    <TableCell className="font-mono text-xs">{req.id.slice(0, 8)}...</TableCell>
                                    <TableCell className="text-xs text-slate-500">
                                        {new Date(req.created_at).toLocaleDateString('pt-BR')}
                                    </TableCell>
                                    {isCouncil && (
                                        <TableCell className="font-medium text-slate-700">
                                            {req.user_name}
                                            <div className="text-[10px] text-slate-400 truncate w-24">{req.user_id}</div>
                                        </TableCell>
                                    )}
                                    <TableCell className="font-bold">
                                        R$ {req.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`
                                            ${req.status === 'approved' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : ''}
                                            ${req.status === 'pending' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' : ''}
                                            ${req.status === 'rejected' ? 'bg-red-100 text-red-700 hover:bg-red-100' : ''}
                                        `}>
                                            {req.status === 'approved' ? 'Liquidado' : req.status === 'pending' ? 'Em Análise' : 'Recusado'}
                                        </Badge>
                                    </TableCell>
                                    {isCouncil && req.status === 'pending' && (
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleReject(req.id)}>
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" className="h-8 w-8 p-0 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleApprove(req.id, req.amount)}>
                                                    <CheckCircle2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    )}
                                    {isCouncil && req.status !== 'pending' && (
                                        <TableCell className="text-right text-xs text-slate-400">
                                            -
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>

        {/* SECTION 2: REFI (ENVIRONMENTAL CREDITS) */}
        <section>
            <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-slate-900">Bônus do Pó de Rocha (Regeneração)</h2>
            </div>

            <Card className="border-emerald-100 shadow-lg bg-gradient-to-br from-white to-emerald-50/30">
                <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 flex-1">
                            <div>
                                <h3 className="text-lg font-bold text-emerald-900">Você aplicou na terra:</h3>
                                <p className="text-emerald-700/80 text-sm">
                                    Rejeito transformado em adubo.
                                </p>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl md:text-5xl font-extrabold text-emerald-600">{rockDustTons}</span>
                                <span className="text-lg md:text-xl font-medium text-emerald-500 mb-2">toneladas</span>
                            </div>
                            <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-100/50">
                                <Sprout className="h-3 w-3 mr-1" />
                                Validado
                            </Badge>
                        </div>

                        <div className="h-px w-full md:w-px md:h-32 bg-emerald-200" />

                        <div className="flex-1 w-full">
                            <Card className="bg-white border-emerald-100 shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-slate-500 uppercase">Seu Crédito (ECOs)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                                                ECO
                                            </div>
                                            <span className="text-2xl font-bold text-slate-900">{rockDustTons * 0.5}</span>
                                        </div>
                                        <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                                            Vender Créditos
                                        </Button>
                                    </div>
                                    <p className="text-xs text-slate-400">
                                        * Valor extra gerado pela regeneração do solo.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>

        {/* SECTION 3: IMPACT (SPLIT PAYMENT) */}
        <section>
             <div className="flex items-center gap-2 mb-4">
                <PieChart className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900">Divisão Automática (Para onde vai o dinheiro?)</h2>
            </div>

            <Card className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div className="space-y-2 p-4 rounded-xl bg-slate-50">
                            <p className="text-sm font-medium text-slate-500">Sua Parte (Livre)</p>
                            <p className="text-2xl font-bold text-slate-900">85%</p>
                            <p className="text-xs text-slate-400">Direto no Bolso</p>
                        </div>
                        <div className="space-y-2 p-4 rounded-xl bg-slate-50">
                            <p className="text-sm font-medium text-slate-500">Cooperativa</p>
                            <p className="text-2xl font-bold text-slate-900">10%</p>
                            <p className="text-xs text-slate-400">Taxa Administrativa</p>
                        </div>
                        <div className="space-y-2 p-4 rounded-xl bg-emerald-50 border border-emerald-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/10 rounded-bl-full" />
                            <p className="text-sm font-bold text-emerald-700">Social (Doação)</p>
                            <p className="text-2xl font-bold text-emerald-600">5%</p>
                            <p className="text-xs text-emerald-500 font-medium">Entidades Locais</p>
                        </div>
                    </div>
                    <p className="text-center text-xs text-slate-400 mt-6 max-w-2xl mx-auto">
                        O sistema paga tudo sozinho. Impostos e doações já descontados. Você recebe limpo e sem dívida com a Receita.
                    </p>
                </CardContent>
            </Card>
        </section>

      </div>
    </main>
  );
}