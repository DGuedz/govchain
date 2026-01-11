"use client";

import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building2, Plus, Wallet, HeartHandshake, History, FileText, CheckCircle2, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function SocialEntityDashboard() {
  const router = useRouter();
  const { isEntity, loading } = useUserRole();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data
  const treasuryBalance = 45000.00; // Saldo do Fundo de Impacto
  const myProjects = [
    { id: 1, title: "Reforma do Telhado da Creche", value: 12000, status: "voting", votes: 45 },
    { id: 2, title: "Horta Comunitária Escolar", value: 3500, status: "approved", votes: 120 },
    { id: 3, title: "Kit Esportivo Jovem Atleta", value: 5000, status: "completed", votes: 89 },
  ];

  if (loading) return <div className="p-8 text-center animate-pulse">Carregando painel social...</div>;

  // Gatekeeper (commented out for development/demo purposes if needed, but good to have)
  // if (!isEntity) {
  //   return (
  //       <div className="flex h-screen items-center justify-center flex-col gap-4 p-4 text-center">
  //           <Building2 className="h-12 w-12 text-blue-500" />
  //           <h1 className="text-xl font-bold">Área da Entidade Social</h1>
  //           <p className="text-sm text-slate-500">Acesso restrito a entidades cadastradas.</p>
  //           <Button onClick={() => router.push("/")}>Voltar</Button>
  //       </div>
  //   );
  // }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white pt-12 pb-24 px-4 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
         <div className="container mx-auto max-w-5xl relative z-10">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" className="text-blue-100 hover:text-white hover:bg-white/10 p-0 h-8 w-8" onClick={() => router.push('/governance')}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <Badge className="bg-blue-500/50 text-blue-100 border-none">
                    Tier 5: Entidade Social
                </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Associação Benjamim</h1>
                    <p className="text-blue-100 max-w-xl">
                        CNPJ: 12.345.678/0001-90 • Campos Verdes, GO
                    </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 min-w-[200px]">
                    <p className="text-xs text-blue-200 uppercase tracking-wider mb-1">Saldo do Fundo Social</p>
                    <p className="text-2xl font-bold">R$ {treasuryBalance.toLocaleString('pt-BR')}</p>
                </div>
            </div>
         </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 -mt-16 relative z-20 space-y-6">
        
        {/* Action Card */}
        <Card className="border-none shadow-lg">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <HeartHandshake className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Novo Projeto de Impacto</h3>
                        <p className="text-sm text-slate-500">Submeta uma proposta para financiamento coletivo.</p>
                    </div>
                </div>
                <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 h-12 px-6 text-base" onClick={() => router.push('/social/projects/new')}>
                    <Plus className="mr-2 h-5 w-5" />
                    Criar Proposta
                </Button>
            </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
            <Button 
                variant={activeTab === 'overview' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('overview')}
                className={activeTab === 'overview' ? "bg-slate-900" : "bg-white border-slate-200"}
            >
                Meus Projetos
            </Button>
            <Button 
                variant={activeTab === 'wallet' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('wallet')}
                className={activeTab === 'wallet' ? "bg-slate-900" : "bg-white border-slate-200"}
            >
                Prestação de Contas
            </Button>
        </div>

        {/* Projects List */}
        <div className="grid gap-4">
            {myProjects.map((project) => (
                <Card key={project.id} className="bg-white hover:shadow-md transition-shadow cursor-pointer border-slate-200">
                    <CardContent className="p-5">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-slate-900">{project.title}</h4>
                                    <Badge className={`
                                        ${project.status === 'voting' ? 'bg-amber-100 text-amber-800' : ''}
                                        ${project.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : ''}
                                        ${project.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''}
                                    `}>
                                        {project.status === 'voting' ? 'Em Votação' : project.status === 'approved' ? 'Aprovado' : 'Concluído'}
                                    </Badge>
                                </div>
                                <p className="text-sm text-slate-500 flex items-center gap-4">
                                    <span>Valor: <strong className="text-slate-700">R$ {project.value.toLocaleString('pt-BR')}</strong></span>
                                    <span>•</span>
                                    <span>Votos: {project.votes}</span>
                                </p>
                            </div>

                            {project.status === 'voting' && (
                                <div className="flex items-center gap-3 w-full md:w-48">
                                    <div className="flex-1">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>Meta de Votos</span>
                                            <span>{Math.round((project.votes / 100) * 100)}%</span>
                                        </div>
                                        <Progress value={project.votes} max={100} className="h-2" />
                                    </div>
                                </div>
                            )}

                            {project.status === 'approved' && (
                                <Button size="sm" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                                    <Wallet className="mr-2 h-4 w-4" />
                                    Receber Recurso
                                </Button>
                            )}

                             {project.status === 'completed' && (
                                <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Ver Relatório
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

      </div>
    </main>
  );
}
