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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Gem, ArrowLeft, Search, Camera, Check } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function GarimpeiroDashboard() {
  const account = useActiveAccount();
  const router = useRouter();
  const { role, isGarimpeiro, loading: roleLoading } = useUserRole();
  
  const [carats, setCarats] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [myBatches, setMyBatches] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myFinds, setMyFinds] = useState<any[]>([]);

  // Fetch data
  useEffect(() => {
    if (account) {
      fetchMyData();
    }
  }, [account]);

  async function fetchMyData() {
    try {
      // 1. Get My Batches (Where buyer_wallet == my address)
      const { data: batches } = await supabase
        .from('shale_batches')
        .select('*')
        .ilike('buyer_wallet', account?.address || '') // ilike for case insensitivity
        .order('created_at', { ascending: false });
      
      if (batches) setMyBatches(batches);

      // 2. Get My Finds
      const { data: profile } = await supabase.from('profiles').select('id').eq('wallet_address', account?.address).single();
      
      if (profile) {
          const { data: finds } = await supabase
            .from('emerald_finds')
            .select('*, shale_batches(batch_hash)')
            .eq('garimpeiro_id', profile.id)
            .order('created_at', { ascending: false });
          
          if (finds) setMyFinds(finds);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleRegisterFind = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account || !carats) return;

    setIsSubmitting(true);
    try {
        // Get Profile ID
        const { data: profile } = await supabase.from('profiles').select('id').eq('wallet_address', account.address).single();
        if (!profile) throw new Error("Perfil não encontrado.");

        const { error } = await supabase.from('emerald_finds').insert({
            garimpeiro_id: profile.id,
            shale_batch_id: selectedBatch || null, // Optional link
            weight_carats: parseFloat(carats),
            status: 'pending_validation'
        });

        if (error) throw error;

        toast.success("Descoberta registrada! Aguardando validação.");
        setCarats("");
        setSelectedBatch("");
        fetchMyData();

    } catch (error) {
        console.error(error);
        toast.error("Erro ao registrar descoberta.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (roleLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#50C878]" /></div>;
  }

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
            <Badge className="bg-emerald-600 hover:bg-emerald-700 gap-1">
                <Search className="h-3 w-3" />
                Tier 3: Garimpeiro
            </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Form Register */}
            <div className="space-y-6">
                <div className="text-left mb-4">
                    <h1 className="text-3xl font-bold text-slate-900">Registrar Descoberta</h1>
                    <p className="text-slate-500">Encontrou uma pedra? Registre aqui para certificação.</p>
                </div>

                <Card className="border-emerald-200 shadow-md">
                    <CardHeader className="bg-emerald-50 rounded-t-xl border-b border-emerald-100">
                        <CardTitle className="text-emerald-900 flex items-center gap-2">
                            <Gem className="h-5 w-5" />
                            Nova Esmeralda
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleRegisterFind} className="space-y-4">
                            
                            <div className="space-y-2">
                                <Label>Origem (Lote de Xisto)</Label>
                                <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o lote de origem..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {myBatches.length === 0 ? (
                                            <SelectItem value="none" disabled>Nenhum lote comprado encontrado</SelectItem>
                                        ) : (
                                            myBatches.map(batch => (
                                                <SelectItem key={batch.id} value={batch.id}>
                                                    {batch.weight_kg}kg - {new Date(batch.created_at).toLocaleDateString()} ({batch.batch_hash.slice(0,10)}...)
                                                </SelectItem>
                                            ))
                                        )}
                                        <SelectItem value="">Outra origem (Sem rastreio)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-slate-400">Vincular ao lote garante maior valor de mercado.</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Peso Aproximado (Quilates)</Label>
                                <Input 
                                    type="number" 
                                    placeholder="Ex: 5.2" 
                                    value={carats}
                                    onChange={(e) => setCarats(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer">
                                <Camera className="h-8 w-8 mb-2" />
                                <span className="text-sm">Adicionar Foto (Opcional)</span>
                            </div>

                            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
                                Registrar Pedra
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* History */}
            <div className="space-y-6">
                <div className="text-left mb-4">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Gem className="h-6 w-6 text-slate-400" />
                        Minhas Descobertas
                    </h2>
                </div>

                <div className="space-y-3">
                    {myFinds.length === 0 ? (
                        <Card className="bg-slate-50 border-dashed">
                            <CardContent className="py-8 text-center text-slate-500">
                                Nenhuma pedra registrada ainda.
                            </CardContent>
                        </Card>
                    ) : (
                        myFinds.map((find) => (
                            <Card key={find.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-100 rounded-full">
                                            <Gem className="h-4 w-4 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">{find.weight_carats} ct</p>
                                            <p className="text-xs text-slate-500">
                                                {find.shale_batches ? `Lote: ${find.shale_batches.batch_hash.slice(0,12)}...` : 'Sem origem vinculada'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-slate-400 block">{new Date(find.created_at).toLocaleDateString()}</span>
                                        <Badge variant={find.status === 'validated' ? 'default' : 'secondary'} className="text-[10px]">
                                            {find.status === 'validated' ? 'Certificada' : 'Em Análise'}
                                        </Badge>
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
