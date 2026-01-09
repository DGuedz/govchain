"use client";

import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useUserRole } from "@/hooks/useUserRole";
import { useMockWallet } from "@/hooks/useMockWallet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2, ArrowLeft, CheckCircle2, XCircle, Scale, User, Box } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function ValidationDashboard() {
  const account = useActiveAccount();
  const { mockAddress, isConnected: isMockConnected } = useMockWallet();
  const activeAddress = account?.address || (isMockConnected ? mockAddress : null);
  
  const router = useRouter();
  const { role, isCouncil, loading: roleLoading } = useUserRole();
  
  const [pendingFinds, setPendingFinds] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Fetch pending finds
  useEffect(() => {
    if (account && isCouncil) {
      fetchPendingFinds();
    }
  }, [account, isCouncil]);

  async function fetchPendingFinds() {
    try {
      // Fetch finds with status 'pending_validation'
      // We also want to fetch the garimpeiro's wallet/details and the shale batch details
      const { data, error } = await supabase
        .from('emerald_finds')
        .select(`
            *,
            shale_batches (
                batch_hash,
                weight_kg
            ),
            profiles (
                wallet_address
            )
        `)
        .eq('status', 'pending_validation')
        .order('created_at', { ascending: true }); // Oldest first
      
      if (error) throw error;
      if (data) setPendingFinds(data);

    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar validações pendentes.");
    }
  }

  const handleValidation = async (findId: string, decision: 'validated' | 'rejected') => {
    if (!activeAddress) return;
    setIsProcessing(findId);

    try {
        // Get Validator Profile ID
        const { data: profile } = await supabase.from('profiles').select('id').eq('wallet_address', activeAddress).single();
        if (!profile) throw new Error("Perfil não encontrado.");

        const { error } = await supabase
            .from('emerald_finds')
            .update({
                status: decision,
                validator_id: profile.id,
                validated_at: new Date().toISOString()
            })
            .eq('id', findId);

        if (error) throw error;

        toast.success(decision === 'validated' ? "Pedra certificada com sucesso!" : "Pedra rejeitada.");
        
        // Remove from list locally
        setPendingFinds(prev => prev.filter(f => f.id !== findId));

    } catch (error) {
        console.error(error);
        toast.error("Erro ao processar validação.");
    } finally {
        setIsProcessing(null);
    }
  };

  if (roleLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#50C878]" /></div>;
  }

  if (!isCouncil) {
     return <div className="p-8 text-center">Acesso restrito ao Conselho Técnico.</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="mb-6 flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push('/governance')} className="gap-2 pl-0">
                <ArrowLeft className="h-4 w-4" /> Voltar ao Painel
            </Button>
            <Badge className="bg-slate-800 text-white gap-1">
                <Scale className="h-3 w-3" />
                Mesa de Classificação
            </Badge>
        </div>

        <div className="space-y-6">
            <div className="text-left mb-4">
                <h1 className="text-3xl font-bold text-slate-900">Validação de Pedras</h1>
                <p className="text-slate-500">Certifique a origem e qualidade das pedras registradas pelos garimpeiros.</p>
            </div>

            {pendingFinds.length === 0 ? (
                <Card className="bg-slate-50 border-dashed">
                    <CardContent className="py-12 text-center text-slate-500 flex flex-col items-center">
                        <CheckCircle2 className="h-12 w-12 text-slate-300 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">Tudo em dia!</h3>
                        <p>Nenhuma pedra pendente de validação no momento.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {pendingFinds.map((find) => (
                        <Card key={find.id} className="border-l-4 border-l-blue-500 shadow-md">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            {find.weight_carats} Quilates
                                            <Badge variant="outline" className="font-normal text-xs">Esmeralda Bruta</Badge>
                                        </CardTitle>
                                        <CardDescription className="text-xs font-mono mt-1">
                                            ID: {find.id}
                                        </CardDescription>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">
                                        Pendente
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-6 text-sm">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <User className="h-5 w-5 text-slate-400 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-slate-700">Garimpeiro</p>
                                            <p className="text-slate-500 font-mono text-xs truncate max-w-[200px]">
                                                {find.profiles?.wallet_address || 'Desconhecido'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Box className="h-5 w-5 text-slate-400 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-slate-700">Origem (Lote de Xisto)</p>
                                            {find.shale_batches ? (
                                                <>
                                                    <p className="text-slate-600">{find.shale_batches.weight_kg}kg registrados</p>
                                                    <p className="text-xs text-emerald-600 font-mono break-all">
                                                        {find.shale_batches.batch_hash}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-amber-600 font-medium flex items-center gap-1">
                                                    <XCircle className="h-3 w-3" /> Sem origem vinculada
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col justify-center items-center text-slate-400 text-xs">
                                    {find.photo_url ? (
                                        <img src={find.photo_url} alt="Foto da Pedra" className="max-h-32 rounded-md" />
                                    ) : (
                                        <>
                                            <div className="h-16 w-16 bg-slate-200 rounded-full mb-2" />
                                            <span>Sem foto anexada</span>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50 border-t gap-4 justify-end">
                                <Button 
                                    variant="outline" 
                                    className="border-red-200 text-red-700 hover:bg-red-50"
                                    onClick={() => handleValidation(find.id, 'rejected')}
                                    disabled={!!isProcessing}
                                >
                                    {isProcessing === find.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Rejeitar"}
                                </Button>
                                <Button 
                                    className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                                    onClick={() => handleValidation(find.id, 'validated')}
                                    disabled={!!isProcessing}
                                >
                                    {isProcessing === find.id ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                                        <>
                                            <CheckCircle2 className="h-4 w-4 mr-2" />
                                            Certificar
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
      </div>
    </main>
  );
}
