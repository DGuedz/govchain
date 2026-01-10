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
import { Search, FileText, ShieldCheck, Loader2, Globe, Eye, Database, Activity } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Footer } from "@/components/landing/Footer";

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
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Premium Header Section */}
      <section className="bg-emerald-950 text-white py-16 border-b border-emerald-900 relative overflow-hidden">
         {/* Background Pattern */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-800/20 rounded-full blur-[80px] pointer-events-none" />
         
         <div className="container mx-auto px-4 lg:px-24 relative z-10">
            <div className="flex items-center gap-3 mb-6 text-emerald-400">
                <div className="p-2 bg-emerald-900/50 rounded-lg border border-emerald-800">
                    <Globe className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono tracking-widest uppercase">Transparência Ativa</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Portal da Transparência</h1>
                    <p className="text-emerald-100/70 max-w-2xl text-lg leading-relaxed">
                        Acesso irrestrito a todos os documentos, atas e relatórios blindados pelo protocolo GovChain. 
                        Verifique a autenticidade de cada registro na Blockchain.
                    </p>
                </div>
                
                {/* Real-time Stats Badge */}
                <div className="hidden md:flex flex-col items-end">
                    <div className="bg-emerald-900/50 backdrop-blur-md border border-emerald-500/30 px-6 py-4 rounded-2xl flex flex-col items-end">
                        <span className="text-3xl font-bold text-white tracking-tight">{documents.length}</span>
                        <span className="text-xs text-emerald-400 uppercase tracking-wider font-medium">Documentos Públicos</span>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* Main Content Area */}
      <div className="flex-1 container mx-auto px-4 lg:px-24 py-12 -mt-8">
        
        {/* Search & Filters Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 mb-8 relative z-20"
        >
            <div className="grid md:grid-cols-3 gap-6 items-end">
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-slate-700 ml-1">Busca Avançada</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input 
                          placeholder="Pesquise por nome da Ata, Hash ou ID do Registro..." 
                          className="pl-10 h-12 bg-slate-50 border-slate-200 focus:border-[#50C878] focus:ring-[#50C878] text-base"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 h-12">
                    <Activity className="h-4 w-4 text-emerald-500" />
                    <span>Última atualização: <strong className="text-slate-700">Hoje, 09:41</strong></span>
                </div>
            </div>
        </motion.div>

        {/* Results Table */}
        <Card className="border-slate-200 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/80">
              <TableRow>
                <TableHead className="w-[400px] font-semibold text-slate-700">Documento</TableHead>
                <TableHead className="font-semibold text-slate-700">Hash (SHA-256)</TableHead>
                <TableHead className="font-semibold text-slate-700">Registro (UID)</TableHead>
                <TableHead className="font-semibold text-slate-700">Data de Blindagem</TableHead>
                <TableHead className="text-right font-semibold text-slate-700">Ação</TableHead>
              </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-48">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <Loader2 className="h-10 w-10 animate-spin mb-4 text-emerald-500" />
                        <p className="text-lg font-medium text-slate-600">Carregando registros da Blockchain...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-48 text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <Database className="h-12 w-12 text-slate-300 mb-3" />
                        <p className="text-lg font-medium text-slate-600">Nenhum documento encontrado</p>
                        <p className="text-sm">Tente ajustar seus termos de busca</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id} className="hover:bg-emerald-50/30 transition-colors group">
                      <TableCell className="font-medium text-slate-700 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <FileText className="h-5 w-5" />
                          </div>
                          <span className="text-base group-hover:text-emerald-900 transition-colors">{doc.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-slate-500">{shortHash(doc.file_hash)}</TableCell>
                      <TableCell className="font-mono text-xs text-slate-500">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200 group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                          {shortUID(doc.eas_uid)}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-500 text-sm">
                        {new Date(doc.created_at).toLocaleDateString('pt-BR', {
                          day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 font-medium">
                          <Link href={`/verify/${doc.id}${isDemo ? '?demo=true' : ''}`} className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4" />
                            Auditar
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

      </div>
      
      <Footer />
    </main>
  );
}
