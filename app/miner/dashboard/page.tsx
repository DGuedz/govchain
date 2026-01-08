"use client";

import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Truck, PackageCheck, History, ArrowLeft, Pickaxe } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function MinerDashboard() {
  const account = useActiveAccount();
  const router = useRouter();
  const { role, isMiner, loading: roleLoading } = useUserRole();
  
  const [weight, setWeight] = useState("");
  const [buyerWallet, setBuyerWallet] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [batches, setBatches] = useState<any[]>([]);

  // Fetch recent batches
  useEffect(() => {
    if (account) {
      fetchBatches();
    }
  }, [account]);

  async function fetchBatches() {
    try {
      // Get profile id first
      const { data: profile } = await supabase.from('profiles').select('id').eq('wallet_address', account?.address).single();
      
      if (profile) {
          const { data, error } = await supabase
            .from('shale_batches')
            .select('*')
            .eq('miner_id', profile.id)
            .order('created_at', { ascending: false });
          
          if (data) setBatches(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleRegisterBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account || !weight || !buyerWallet) return;

    setIsSubmitting(true);
    try {
        // Get Miner Profile ID
        const { data: profile } = await supabase.from('profiles').select('id').eq('wallet_address', account.address).single();
        
        if (!profile) throw new Error("Perfil de minerador não encontrado.");

        // Create Batch Hash (Simulation of on-chain tracking)
        const batchHash = `BATCH-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const { error } = await supabase.from('shale_batches').insert({
            miner_id: profile.id,
            buyer_wallet: buyerWallet,
            weight_kg: parseFloat(weight),
            batch_hash: batchHash
        });

        if (error) throw error;

        toast.success("Lote de Xisto registrado com sucesso!");
        setWeight("");
        setBuyerWallet("");
        fetchBatches();

    } catch (error) {
        console.error(error);
        toast.error("Erro ao registrar lote.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (roleLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#50C878]" /></div>;
  }

  // Simple Protection
  if (!account) {
     return <div className="p-8 text-center">Conecte sua carteira.</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="mb-6 flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push('/governance')} className="gap-2 pl-0">
                <ArrowLeft className="h-4 w-4" /> Voltar ao Painel
            </Button>
            <Badge className="bg-amber-600 hover:bg-amber-700 gap-1">
                <Pickaxe className="h-3 w-3" />
                Tier 2: Minerador
            </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Form Register */}
            <div className="space-y-6">
                <div className="text-left mb-4">
                    <h1 className="text-3xl font-bold text-slate-900">Registrar Saída</h1>
                    <p className="text-slate-500">Formalize a venda do xisto bruto para o Garimpeiro.</p>
                </div>

                <Card className="border-amber-200 shadow-md">
                    <CardHeader className="bg-amber-50 rounded-t-xl border-b border-amber-100">
                        <CardTitle className="text-amber-900 flex items-center gap-2">
                            <Truck className="h-5 w-5" />
                            Novo Lote de Produção
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleRegisterBatch} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Carteira do Garimpeiro (Comprador)</Label>
                                <Input 
                                    placeholder="0x..." 
                                    value={buyerWallet}
                                    onChange={(e) => setBuyerWallet(e.target.value)}
                                    required
                                />
                                <p className="text-xs text-slate-400">O comprador deve estar cadastrado no Gov.br</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Peso do Lote (Kg)</Label>
                                <Input 
                                    type="number" 
                                    placeholder="Ex: 1000" 
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <PackageCheck className="h-4 w-4 mr-2" />}
                                Gerar Token de Origem
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* History */}
            <div className="space-y-6">
                <div className="text-left mb-4">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <History className="h-6 w-6 text-slate-400" />
                        Histórico de Vendas
                    </h2>
                </div>

                <div className="space-y-3">
                    {batches.length === 0 ? (
                        <Card className="bg-slate-50 border-dashed">
                            <CardContent className="py-8 text-center text-slate-500">
                                Nenhuma venda registrada ainda.
                            </CardContent>
                        </Card>
                    ) : (
                        batches.map((batch) => (
                            <Card key={batch.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-slate-800">{batch.weight_kg} Kg de Xisto</p>
                                        <p className="text-xs text-slate-500 font-mono">Destino: {batch.buyer_wallet.slice(0,6)}...{batch.buyer_wallet.slice(-4)}</p>
                                        <p className="text-[10px] text-amber-600 font-mono mt-1">{batch.batch_hash}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-slate-400 block">{new Date(batch.created_at).toLocaleDateString()}</span>
                                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Registrado</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
