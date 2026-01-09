"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { TruthTimeline } from "@/components/compound/TruthTimeline";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, ExternalLink, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Mock Data for Demo
const MOCK_DOCS_MAP: Record<string, any> = {
    "demo-1": {
        id: "demo-1",
        title: "Ata da Assembleia Geral Ordinária 2025",
        file_url: "#",
        file_hash: "0x8f9c2d1b7a6e5f4d3c2b1a0987654321fedcba09876543211234567890abcdef",
        eas_uid: "0x123abc456def7890123abc456def7890123abc456def7890123abc456def7890",
        status: "attested_onchain",
        created_at: new Date().toISOString(),
        signer_wallet: "0x71C...9A21"
    },
    "demo-2": {
        id: "demo-2",
        title: "Relatório de Sustentabilidade Q4",
        file_url: "#",
        file_hash: "0x7e2a9b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
        eas_uid: "0x456def789abc0123456def789abc0123456def789abc0123456def789abc0123",
        status: "attested_onchain",
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        signer_wallet: "0x3D2...1B4F"
    },
    // Generic fallback for any other demo id
    "demo-generic": {
        id: "demo-generic",
        title: "Documento Simulado (Demo)",
        file_url: "#",
        file_hash: "0xSimulatedHashForDemoPurposesOnly...",
        eas_uid: "0xSimulatedUIDForDemoPurposesOnly...",
        status: "attested_onchain",
        created_at: new Date().toISOString(),
        signer_wallet: "0xDemo...Wallet"
    }
};

export default function PublicVerificationPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true' || (typeof id === 'string' && id.startsWith('demo-'));
  
  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoc() {
      if (!id) return;
      
      if (isDemo || !isSupabaseConfigured()) {
        // Simulate fetch
        setTimeout(() => {
            const mockDoc = MOCK_DOCS_MAP[id as string] || { ...MOCK_DOCS_MAP["demo-generic"], id: id };
            setDoc(mockDoc);
            setLoading(false);
        }, 800);
        return;
      }

      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("id", id)
        .single();
      
      if (!error) setDoc(data);
      setLoading(false);
    }
    fetchDoc();
  }, [id, isDemo]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-[#50C878]" />
            <p className="text-slate-500 font-medium">Verificando integridade na Blockchain...</p>
        </div>
    </div>
  );

  if (!doc) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
            <ShieldCheck className="h-16 w-16 text-slate-300 mx-auto" />
            <h1 className="text-2xl font-bold text-slate-900">Documento não encontrado</h1>
            <p className="text-slate-500 max-w-md">
                Este registro não existe ou foi removido. Verifique o link ou o QR Code utilizado.
            </p>
            <Button asChild variant="outline">
                <Link href="/">Voltar ao GovChain</Link>
            </Button>
        </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        <div className="mb-8 flex items-center justify-between">
            <Link href={isDemo ? "/public?demo=true" : "/public"} className="text-slate-500 hover:text-[#50C878] flex items-center gap-2 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Voltar para Transparência
            </Link>
            <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Verificação Pública</span>
                <Badge variant="outline" className="bg-[#50C878]/10 text-[#50C878] border-[#50C878] px-3">
                    AUTENTICADO
                </Badge>
            </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 leading-tight">{doc.title}</h1>
                        <p className="text-slate-500 mt-2 flex items-center gap-2 text-sm">
                            <ClockIcon date={doc.created_at} />
                            Registrado em {new Date(doc.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                    <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <FileText className="h-6 w-6 text-[#50C878]" />
                    </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Hash SHA-256</span>
                            <code className="font-mono text-slate-700 break-all">{doc.file_hash}</code>
                        </div>
                        <div>
                            <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Signatário (Wallet)</span>
                            <code className="font-mono text-slate-700 break-all">{doc.signer_wallet || "N/A"}</code>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 bg-[#50C878] hover:bg-[#40b068] h-12 text-base" asChild>
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-5 w-5" />
                            Visualizar Documento Original
                        </a>
                    </Button>
                    <Button variant="outline" className="flex-1 h-12 text-base" asChild>
                        <a href={`https://base-sepolia.easscan.org/attestation/view/${doc.eas_uid}`} target="_blank" rel="noopener noreferrer">
                            <ShieldCheck className="mr-2 h-5 w-5 text-slate-500" />
                            Prova na Blockchain (EAS)
                        </a>
                    </Button>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
                <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 leading-relaxed">
                    <strong>Garantia de Integridade:</strong> Este documento foi criptograficamente selado. Qualquer alteração em um único pixel do arquivo original resultaria em um hash diferente, invalidando esta verificação. A prova matemática de sua existência reside na rede Base Sepolia.
                </p>
            </div>
          </motion.div>

          {/* Timeline Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <Card className="h-full border-l-4 border-l-[#50C878] shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <ShieldCheck className="h-5 w-5 text-[#50C878]" />
                        Linha do Tempo
                    </CardTitle>
                    <CardDescription>Rastreabilidade completa do ativo.</CardDescription>
                </CardHeader>
                <CardContent>
                    <TruthTimeline currentStep={3} />
                </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

function ClockIcon({ date }: { date: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
        </svg>
    )
}
