"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { hybridStorage } from "@/lib/hybridStorage";

export default function NewSocialProject() {
  const router = useRouter();
  const { isEntity, loading } = useUserRole();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [beneficiaries, setBeneficiaries] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const newProject = {
            id: `social-p${Date.now()}`,
            title: title,
            description: description,
            value: parseFloat(value),
            beneficiaries: beneficiaries,
            entity: "Associação Benjamim", // Hardcoded for simulation
            type: "social",
            status: "active",
            created_at: new Date().toISOString(),
            votes_yes: 0,
            votes_no: 0,
            votes_abstain: 0
        };

        // Use Hybrid Storage (Local Storage for simulation)
        // Note: In real app, this would go to a 'proposals' table with type='social'
        const table = await hybridStorage.from('proposals');
        
        // Check if table supports local write (it should if hybridStorage handles it)
        // If not, we manually patch local storage for the demo
        let existing = [];
        if (typeof window !== 'undefined') {
            const raw = localStorage.getItem('govchain_proposals');
            if (raw) existing = JSON.parse(raw);
        }
        
        const updated = [newProject, ...existing];
        localStorage.setItem('govchain_proposals', JSON.stringify(updated));

        // Also try standard insert for consistency if backend exists
        await table.insert(newProject).catch(() => {}); 

        toast.success("Projeto submetido para votação!");
        router.push('/social/dashboard');

    } catch (error) {
        console.error(error);
        toast.error("Erro ao submeter projeto");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center animate-pulse">Verificando permissões...</div>;

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
       <div className="bg-white border-b border-slate-200 pt-12 pb-6 px-4">
         <div className="container mx-auto max-w-3xl">
            <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
            </Button>
            <h1 className="text-2xl font-bold text-slate-900">Nova Proposta de Impacto</h1>
            <p className="text-slate-500">
                Preencha os detalhes do projeto para submissão ao voto da cooperativa.
            </p>
         </div>
       </div>

       <div className="container mx-auto max-w-3xl px-4 py-8">
         <form onSubmit={handleSubmit}>
            <Card className="shadow-sm border-slate-200">
                <CardContent className="p-6 space-y-6">
                    
                    <div className="space-y-2">
                        <Label>Título do Projeto</Label>
                        <Input 
                            placeholder="Ex: Reforma da Quadra Poliesportiva" 
                            required 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Valor Solicitado (R$)</Label>
                            <Input 
                                type="number" 
                                placeholder="0,00" 
                                required 
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Beneficiários Estimados</Label>
                            <Input 
                                type="number" 
                                placeholder="Ex: 150" 
                                required 
                                value={beneficiaries}
                                onChange={(e) => setBeneficiaries(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Descrição Detalhada & Impacto Esperado</Label>
                        <Textarea 
                            placeholder="Descreva como o recurso será utilizado e qual o retorno social para a comunidade..." 
                            className="min-h-[150px]"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Evidências Iniciais (Fotos/Orçamentos)</Label>
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:bg-slate-50 cursor-pointer transition-colors">
                            <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-600">Clique para fazer upload de arquivos (PDF, JPG)</p>
                            <p className="text-xs text-slate-400 mt-1">Máximo 5MB por arquivo</p>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancelar</Button>
                        <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 min-w-[150px]">
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                                <>
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Submeter Projeto
                                </>
                            )}
                        </Button>
                    </div>

                </CardContent>
            </Card>
         </form>
       </div>
    </main>
  );
}
