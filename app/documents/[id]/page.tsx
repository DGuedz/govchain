"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { TruthTimeline } from "@/components/compound/TruthTimeline";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, ExternalLink, ShieldCheck, Download, QrCode } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function DocumentDetails() {
  const { id } = useParams();
  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoc() {
      if (!id) return;
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("id", id)
        .single();
      
      if (!error) setDoc(data);
      setLoading(false);
    }
    fetchDoc();
  }, [id]);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#50C878]" /></div>;
  if (!doc) return <div className="flex h-screen items-center justify-center">Documento não encontrado.</div>;

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs items={[{ label: "Consulta Pública", href: "/public" }, { label: "Detalhes do Ativo" }]} />

        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{doc.title}</h1>
                    <p className="text-slate-500 mt-1">ID: {doc.id}</p>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-[#50C878] border-[#50C878] px-3 py-1">
                    {doc.status === 'attested_onchain' ? 'BLINDADO' : doc.status}
                </Badge>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5 text-slate-500" />
                        Prévia do Documento
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-[16/9] bg-slate-100 rounded flex items-center justify-center border border-dashed border-slate-300">
                        <p className="text-slate-400 text-sm">Visualização não disponível. Baixe o PDF.</p>
                    </div>
                    <div className="mt-4 flex gap-4">
                        <Button className="w-full bg-[#50C878] hover:bg-[#40b068]" asChild>
                            <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Abrir PDF Original
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                            <a href={doc.file_url} download>
                                <Download className="mr-2 h-4 w-4" />
                                Baixar Cópia
                            </a>
                        </Button>
                    </div>
                    <div className="mt-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="w-full text-slate-500 hover:text-[#50C878]">
                                    <QrCode className="mr-2 h-4 w-4" />
                                    Gerar QR Code de Rastreabilidade
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-xs flex flex-col items-center">
                                <DialogHeader>
                                    <DialogTitle className="text-center">Selo Digital</DialogTitle>
                                </DialogHeader>
                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                    <img 
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/verify/${doc.id}` : '')}`} 
                                        alt="QR Code" 
                                        className="w-48 h-48"
                                    />
                                </div>
                                <p className="text-center text-xs text-slate-500 mt-2">
                                    Escaneie para auditar este documento na Blockchain.
                                </p>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Metadados Técnicos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div>
                        <span className="block font-medium text-slate-700">Hash SHA-256 (Impressão Digital)</span>
                        <code className="block bg-slate-100 p-2 rounded mt-1 text-slate-600 break-all">{doc.file_hash}</code>
                    </div>
                    <div>
                        <span className="block font-medium text-slate-700">UID do Atestado (Blockchain)</span>
                        <code className="block bg-slate-100 p-2 rounded mt-1 text-slate-600 break-all">{doc.eas_uid || "Pendente"}</code>
                    </div>
                    <div>
                        <span className="block font-medium text-slate-700">Carteira do Signatário</span>
                        <code className="block bg-slate-100 p-2 rounded mt-1 text-slate-600 break-all">{doc.signer_wallet || "Desconhecido"}</code>
                    </div>
                </CardContent>
            </Card>
          </div>

          {/* Timeline Sidebar */}
          <div className="md:col-span-1">
            <Card className="h-full border-l-4 border-l-[#50C878]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-[#50C878]" />
                        Linha do Tempo da Verdade
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <TruthTimeline 
                        createdAt={doc.created_at} 
                        signedAt={doc.created_at} // Assuming signed at creation for MVP
                        attestedAt={doc.eas_uid ? doc.created_at : undefined} // Assuming attested at creation for MVP
                        uid={doc.eas_uid}
                    />
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
