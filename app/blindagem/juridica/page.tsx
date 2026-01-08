"use client";

import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OraculoUpload } from "@/components/compound/OraculoUpload";
import { Scale, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/select"; // Using separator from select as temporary fallback or import from ui/separator if exists

export default function LegalDashboard() {
  const account = useActiveAccount();
  const router = useRouter();
  const { isLegal, loading } = useUserRole();

  if (loading) return <div className="p-8 text-center">Carregando...</div>;

  if (!isLegal) {
    return (
        <div className="flex h-screen items-center justify-center flex-col gap-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <h1 className="text-xl font-bold">Acesso Restrito</h1>
            <p>Esta área é exclusiva para o Conselho Jurídico.</p>
            <Button onClick={() => router.push("/governance")}>Voltar</Button>
        </div>
    );
  }

  const handleParecerUpload = (data: any) => {
    // Refresh or notify logic here
    console.log("Parecer uploaded:", data);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 md:px-6 space-y-8">
        <Breadcrumbs items={[
            { label: "Governança", href: "/governance" },
            { label: "Conselho Jurídico" }
        ]} />

        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                <Scale className="h-8 w-8 text-blue-600" />
                Mesa Jurídica
            </h1>
            <p className="text-slate-500">
                Emissão de pareceres, validação de contratos e compliance regulatório.
            </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            {/* Upload de Parecer */}
            <Card className="border-blue-200 shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                        <FileText className="h-5 w-5" />
                        Novo Parecer Jurídico
                    </CardTitle>
                    <CardDescription>
                        Registre oficialmente um parecer jurídico na blockchain para validar atos da cooperativa.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
                        <h4 className="font-semibold text-blue-900 text-sm mb-2">Fluxo de Validação</h4>
                        <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
                            <li>O documento receberá carimbo de tempo (Timestamp).</li>
                            <li>A assinatura digital do advogado será vinculada ao hash.</li>
                            <li>O parecer se tornará imutável e público para auditoria.</li>
                        </ul>
                    </div>
                    
                    <OraculoUpload 
                        onAttestationComplete={handleParecerUpload} 
                        isDemo={false} 
                    />
                </CardContent>
            </Card>

            {/* Lista de Demandas (Mock) */}
            <Card>
                <CardHeader>
                    <CardTitle>Demandas Pendentes</CardTitle>
                    <CardDescription>Solicitações de análise contratual.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex items-start justify-between p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-sm">Contrato de Fornecimento #{202400 + i}</span>
                                        <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Análise</Badge>
                                    </div>
                                    <p className="text-xs text-slate-500">Enviado por: Diretoria Executiva • Há 2 dias</p>
                                </div>
                                <Button size="sm" variant="outline">Verificar</Button>
                            </div>
                        ))}
                         <div className="flex items-center justify-center p-4 bg-slate-50 rounded border border-dashed border-slate-300">
                            <span className="text-xs text-slate-400">Nenhuma outra demanda pendente</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
