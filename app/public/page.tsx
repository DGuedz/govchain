"use client";

import { useEffect, useState, Suspense } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, FileText, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface DocumentRecord {
  id: string;
  title: string;
  file_url: string;
  file_hash: string;
  eas_uid: string;
  status: string;
  created_at: string;
}

// Mock Data for Public Demo
const MOCK_PUBLIC_DOCS: DocumentRecord[] = [
    {
        id: "demo-1",
        title: "Ata da Assembleia Geral Ordinária 2025",
        file_url: "#",
        file_hash: "0x8f9c2d1b...e4a3b1",
        eas_uid: "0x123abc456def7890",
        status: "attested_onchain",
        created_at: new Date().toISOString()
    },
    {
        id: "demo-2",
        title: "Relatório de Sustentabilidade Q4",
        file_url: "#",
        file_hash: "0x7e2a9b4c...f1d2e3",
        eas_uid: "0x456def789abc0123",
        status: "attested_onchain",
        created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
        id: "demo-3",
        title: "Certificado de Crédito de Carbono #882",
        file_url: "#",
        file_hash: "0x5c3b1f8a...d9e0f2",
        eas_uid: "0x789ghi012jkl3456",
        status: "attested_onchain",
        created_at: new Date(Date.now() - 86400000 * 12).toISOString()
    },
    {
        id: "demo-4",
        title: "Balanço Patrimonial Auditado 2024",
        file_url: "#",
        file_hash: "0xa1b2c3d4...e5f6g7",
        eas_uid: "0x987zyx654wvu3210",
        status: "attested_onchain",
        created_at: new Date(Date.now() - 86400000 * 30).toISOString()
    }
];

export default function PublicTransparencyPageWrapper() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#50C878]" /></div>}>
            <PublicTransparencyPage />
        </Suspense>
    );
}

function PublicTransparencyPage() {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';

  useEffect(() => {
    async function fetchDocuments() {
      // Use mock data if in demo mode OR if Supabase is not configured (preventing crash)
      const useMockData = isDemo || !isSupabaseConfigured();

      if (useMockData) {
          setTimeout(() => {
              setDocuments(MOCK_PUBLIC_DOCS);
              setLoading(false);
          }, 800);
          return;
      }

      try {
        const { data, error } = await supabase
          .from('documents')
          .select('*')
          .eq('status', 'attested_onchain') // Only show fully attested docs
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching documents:', error);
          // Fallback to mock data if error occurs during dev/demo phase request
          // setDocuments(MOCK_PUBLIC_DOCS); 
        } else {
          setDocuments(data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();
  }, [isDemo]);

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.eas_uid?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.file_hash?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shortHash = (hash: string) => hash ? `${hash.slice(0, 10)}...` : "-";
  const shortUID = (uid: string) => uid ? `${uid.slice(0, 10)}...` : "-";

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs items={[{ label: "Consulta Pública" }]} />
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Portal da Transparência
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Consulta Pública de Ativos
          </h1>
          <p className="mx-auto max-w-2xl text-slate-500">
            Acesso irrestrito a todos os documentos, atas e relatórios blindados pelo protocolo GovChain. 
            Verifique a autenticidade de cada registro na Blockchain.
          </p>
        </motion.div>

        {/* Search & Stats */}
        <div className="grid gap-6 mb-8 md:grid-cols-3">
          <Card className="md:col-span-2 border-emerald-100/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle>Busca Avançada</CardTitle>
              <CardDescription>Pesquise por título, hash do arquivo ou ID do registro.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Digite o nome da Ata, Hash ou UID..." 
                  className="pl-10 h-10 bg-slate-50 border-slate-200 focus:border-[#50C878] focus:ring-[#50C878]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#50C878] text-white border-none shadow-md">
            <CardContent className="flex flex-col items-center justify-center h-full py-6">
              <span className="text-4xl font-bold">{documents.length}</span>
              <span className="text-emerald-100 font-medium text-sm uppercase tracking-wide">Documentos Públicos</span>
            </CardContent>
          </Card>
        </div>

        {/* Results Table */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[300px]">Documento</TableHead>
                <TableHead>Hash (SHA-256)</TableHead>
                <TableHead>Registro (UID)</TableHead>
                <TableHead>Data de Blindagem</TableHead>
                <TableHead className="text-right">Acesso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-32">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Loader2 className="h-8 w-8 animate-spin mb-2" />
                      Carregando registros...
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredDocuments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-32 text-slate-500">
                    Nenhum documento encontrado para sua busca.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-medium text-slate-700">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#50C878]" />
                        {doc.title}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-slate-500">{shortHash(doc.file_hash)}</TableCell>
                    <TableCell className="font-mono text-xs text-slate-500">
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100">
                        {shortUID(doc.eas_uid)}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">
                      {new Date(doc.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm" className="text-slate-600 hover:text-[#50C878] hover:border-[#50C878] transition-all">
                        <Link href={`/verify/${doc.id}${isDemo ? '?demo=true' : ''}`} className="flex items-center gap-1">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          Auditar
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

      </div>
    </main>
  );
}
