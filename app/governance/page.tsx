"use client";

import { useActiveAccount } from "thirdweb/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { ShieldCheck, FilePlus, Loader2, FileText, CheckCircle2, LayoutDashboard, History, ExternalLink, PlayCircle, Gavel, Scale, Coins } from "lucide-react";
import { OraculoUpload } from "@/components/compound/OraculoUpload";
import { useUserRole } from "@/hooks/useUserRole";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DocumentRecord {
  id: string;
  title: string;
  file_url: string;
  file_hash: string;
  eas_uid: string;
  status: string;
  created_at: string;
}

// Mock Data for Demo Mode
const MOCK_DOCS: DocumentRecord[] = [
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
    }
];

function GovernanceContent() {
  const account = useActiveAccount();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { role, isDeliberative, isFiscal, isLegal, isAdmin, isMiner, isGarimpeiro, isCouncil, loading: roleLoading } = useUserRole();
  const isDemo = searchParams.get('demo') === 'true';
  
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch documents
  useEffect(() => {
    async function fetchDocuments() {
        if (isDemo) {
            // Simulate network delay
            setTimeout(() => {
                setDocuments(MOCK_DOCS);
                setLoading(false);
            }, 800);
            return;
        }

        if (!account) {
            setLoading(false);
            return;
        }
        
        try {
            const { data, error } = await supabase
                .from('documents')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) {
                console.error('Error fetching documents:', error);
                // Fallback to empty
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
  }, [account, isDemo]);

  const handleNewAttestation = (data: any) => {
    if (isDemo) {
        const newDoc: DocumentRecord = {
            id: `demo-${Date.now()}`,
            title: "Novo Documento Simulado",
            file_url: "#",
            file_hash: "0xSimulatedHash...",
            eas_uid: "0xSimulatedUID...",
            status: "attested_onchain",
            created_at: new Date().toISOString()
        };
        setDocuments([newDoc, ...documents]);
        return;
    }

    async function refresh() {
        const { data: newData } = await supabase
            .from('documents')
            .select('*')
            .order('created_at', { ascending: false });
        if (newData) setDocuments(newData);
    }
    refresh();
  };

  if (loading || roleLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#50C878]" />
      </div>
    );
  }

  // Auth Check (Bypassed if Demo)
  if (!account && !isDemo) {
    return (
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-slate-50">
            <div className="text-center space-y-6 max-w-md px-4">
                <div className="bg-white p-4 rounded-full inline-flex shadow-sm mb-2">
                    <ShieldCheck className="h-12 w-12 text-[#50C878]" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Acesso Restrito</h1>
                <p className="text-slate-500">
                    Esta área é exclusiva para membros da cooperativa. Por favor, conecte sua carteira Gov.br para acessar o painel de governança.
                </p>
                
                <div className="space-y-3">
                    <div className="flex justify-center">
                        <p className="text-sm font-medium text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
                            Utilize o botão "Acessar com Gov.br" no topo da página
                        </p>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-slate-50 px-2 text-slate-400">Ou para testes</span>
                        </div>
                    </div>

                    <Button 
                        variant="secondary" 
                        className="w-full"
                        onClick={() => router.push("/governance?demo=true")}
                    >
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Entrar em Modo Demonstração
                    </Button>
                </div>

                <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
                    Voltar para Início
                </Button>
            </div>
        </div>
    );
  }

  const shortAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const shortUID = (uid: string) => {
    if (!uid) return "-";
    return `${uid.slice(0, 10)}...`;
  };

  const getRoleBadge = () => {
    switch (role) {
        case 'council':
        case 'admin':
            return <Badge className="bg-red-600 hover:bg-red-700">Conselho Deliberativo</Badge>;
        case 'fiscal':
            return <Badge className="bg-yellow-500 hover:bg-yellow-600">Conselho Fiscal</Badge>;
        case 'legal':
            return <Badge className="bg-blue-600 hover:bg-blue-700">Conselho Jurídico</Badge>;
        case 'miner':
            return <Badge className="bg-amber-600 hover:bg-amber-700">Minerador (Tier 2)</Badge>;
        case 'garimpeiro':
            return <Badge className="bg-emerald-600 hover:bg-emerald-700">Garimpeiro (Tier 3)</Badge>;
        default:
            return <Badge className="bg-slate-600 hover:bg-slate-700">Membro</Badge>;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 md:px-6 space-y-8">
        <Breadcrumbs items={[{ label: "Governança" }]} />

        {isDemo && (
             <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg flex items-center gap-3 text-sm">
                <ShieldCheck className="h-5 w-5" />
                <p><strong>Modo Demonstração Ativo:</strong> Você está visualizando dados fictícios. Nenhuma transação real será realizada.</p>
                <Button variant="ghost" size="sm" className="ml-auto text-blue-700 hover:bg-blue-100" onClick={() => router.push("/governance")}>
                    Sair do Demo
                </Button>
            </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Painel de Governança</h1>
            <p className="text-slate-500">Gerencie documentos e participe das decisões da cooperativa.</p>
            <div className="flex items-center gap-2 mt-2">
                {getRoleBadge()}
                {isDemo && (
                    <p className="text-sm text-slate-400">
                        Logado como: <span className="font-mono bg-slate-100 px-1 rounded">0xDemoUser...1234</span> (Visitante)
                    </p>
                )}
            </div>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" onClick={() => router.push("/governance/votes" + (isDemo ? "?demo=true" : ""))}>
                Sala de Votação
             </Button>
          </div>
        </div>

        {/* Upload Section */}
        <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2 shadow-sm border-emerald-100/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <History className="h-5 w-5 text-emerald-600" />
                        Histórico de Registros
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Documento</TableHead>
                                    <TableHead>Hash (SHA-256)</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {documents.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                                            Nenhum documento registrado ainda.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    documents.map((doc) => (
                                        <TableRow key={doc.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-slate-400" />
                                                    {doc.title}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-mono text-xs text-slate-500">
                                                {doc.file_hash ? `${doc.file_hash.slice(0, 8)}...` : '-'}
                                            </TableCell>
                                            <TableCell>
                                                {doc.status === 'attested_onchain' ? (
                                                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex w-fit items-center gap-1">
                                                        <CheckCircle2 className="h-3 w-3" />
                                                        Blockchain
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary">Pendente</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <a href={`/verify/${isDemo ? '1' : doc.id}`} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-4 w-4 text-slate-400" />
                                                    </a>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Role Based Action Cards */}
            <div className="space-y-4">
                {isMiner && (
                    <Card className="shadow-lg border-amber-200 bg-gradient-to-b from-white to-amber-50/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-amber-800">
                                <Coins className="h-5 w-5" />
                                Produção Mineral
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-slate-600">
                                Registre a saída de xisto bruto para os garimpeiros e gere o lastro de origem.
                            </p>
                            <Button 
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                                onClick={() => router.push("/miner/dashboard")}
                            >
                                Acessar Painel do Minerador
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {isGarimpeiro && (
                    <Card className="shadow-lg border-emerald-200 bg-gradient-to-b from-white to-emerald-50/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-emerald-800">
                                <FilePlus className="h-5 w-5" />
                                Registrar Descoberta
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-slate-600">
                                Encontrou uma pedra? Registre aqui vinculando ao lote de xisto para certificação.
                            </p>
                            <Button 
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                                onClick={() => router.push("/garimpeiro/dashboard")}
                            >
                                Acessar Painel do Garimpeiro
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {isCouncil && (
                    <Card className="shadow-lg border-blue-200 bg-gradient-to-b from-white to-blue-50/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-800">
                                <Scale className="h-5 w-5" />
                                Validação Técnica
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-slate-600">
                                Analise e certifique as pedras registradas pelos garimpeiros antes de entrarem no mercado.
                            </p>
                            <Button 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => router.push("/council/validation")}
                            >
                                Acessar Mesa de Classificação
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {isDeliberative && (
                    <Card className="shadow-lg border-emerald-200 bg-gradient-to-b from-white to-emerald-50/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FilePlus className="h-5 w-5 text-emerald-600" />
                                Novo Registro
                            </CardTitle>
                            <p className="text-sm text-slate-500">
                                Faça upload de atas ou contratos para registrá-los eternamente na Base Sepolia.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <OraculoUpload onAttestationComplete={handleNewAttestation} isDemo={isDemo} />
                        </CardContent>
                    </Card>
                )}

                {isLegal && (
                    <Card className="shadow-lg border-blue-200 bg-gradient-to-b from-white to-blue-50/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Scale className="h-5 w-5 text-blue-600" />
                                Pareceres Legais
                            </CardTitle>
                            <p className="text-sm text-slate-500">
                                Valide minutas contratuais e emita pareceres jurídicos.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center p-4 bg-slate-50 rounded border border-dashed border-slate-300">
                                <span className="text-xs text-slate-400">Upload de Parecer (Em breve)</span>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {isFiscal && (
                     <Card className="shadow-lg border-yellow-200 bg-gradient-to-b from-white to-yellow-50/30">
                         <CardHeader>
                             <CardTitle className="flex items-center gap-2">
                                 <Coins className="h-5 w-5 text-yellow-600" />
                                 {isAdmin ? "Auditoria (Diretoria)" : "Auditoria Fiscal"}
                             </CardTitle>
                             <p className="text-sm text-slate-500">
                                 Verifique notas fiscais e saldo do cofre.
                             </p>
                         </CardHeader>
                         <CardContent>
                             <div className="flex justify-center p-4 bg-slate-50 rounded border border-dashed border-slate-300">
                                 <span className="text-xs text-slate-400">Auditar Cofre (Em breve)</span>
                             </div>
                         </CardContent>
                     </Card>
                 )}

                {!isDeliberative && !isLegal && !isFiscal && (
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Gavel className="h-5 w-5 text-slate-500" />
                                Minhas Votações
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-500">Acompanhe seu histórico de participação nas assembleias.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
      </div>
    </main>
  );
}

export default function GovernanceDashboard() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-emerald-500" /></div>}>
        <GovernanceContent />
    </Suspense>
  );
}