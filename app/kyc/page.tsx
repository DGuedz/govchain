"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, ShieldCheck, Pickaxe, Search, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useActiveAccount } from "thirdweb/react";
import { useMockWallet } from "@/hooks/useMockWallet";

export default function KYCPage() {
  const router = useRouter();
  const account = useActiveAccount();
  const { mockAddress, isConnected: isMockConnected } = useMockWallet();
  
  // Use real account or mock address
  const activeAddress = account?.address || (isMockConnected ? mockAddress : null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>("garimpeiro");

  // Form States
  const [formData, setFormData] = useState({
    fullName: "",
    cpf: "",
    phone: "",
    miningLicense: "", // Miner only
    councilToken: "" // Council only
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (tier: 'garimpeiro' | 'miner' | 'council') => {
    if (!activeAddress) {
        toast.error("Por favor, conecte sua carteira primeiro ou use o modo Simulação.");
        return;
    }

    if (!formData.fullName || !formData.cpf) {
        toast.error("Preencha os campos obrigatórios.");
        return;
    }

    setIsSubmitting(true);

    try {
        // Prepare profile data
        const profileData: any = {
            wallet_address: activeAddress,
            role: tier,
            full_name: formData.fullName,
            cpf: formData.cpf, // In prod, encrypt this!
            phone: formData.phone,
            verified_govbr: true, // Assuming this form acts as the Gov.br proxy for MVP
            updated_at: new Date().toISOString()
        };

        if (tier === 'miner') {
            if (!formData.miningLicense) {
                toast.error("Licença de Lavra é obrigatória para mineradores.");
                setIsSubmitting(false);
                return;
            }
            // Store license in a metadata column or separate table. For MVP, we skip or add if column exists.
            // For now, we assume validation passed.
        }

        if (tier === 'council') {
            if (formData.councilToken !== 'ELOS-ADMIN-KEY') { // Hardcoded check for MVP
                toast.error("Token de Conselho inválido.");
                setIsSubmitting(false);
                return;
            }
        }

        const { error } = await supabase
            .from('profiles')
            .upsert(profileData, { onConflict: 'wallet_address' });

        if (error) throw error;

        toast.success(`Cadastro de ${tier.toUpperCase()} realizado com sucesso!`);
        router.push("/governance");

    } catch (error) {
        console.error(error);
        toast.error("Erro ao realizar cadastro.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900">Associe-se à COOPERSMERALDA</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Escolha seu perfil de atuação e faça parte da revolução digital do xisto e da esmeralda.
            Sua identidade será validada via <strong>Gov.br</strong>.
          </p>
        </div>

        <Tabs defaultValue="garimpeiro" className="w-full" onValueChange={setSelectedTier}>
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-slate-200 rounded-xl">
            <TabsTrigger value="garimpeiro" className="py-4 data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all">
                <div className="flex flex-col items-center gap-2">
                    <Search className="h-6 w-6" />
                    <span className="font-bold">Garimpeiro</span>
                    <span className="text-xs opacity-80 font-normal">Tier 3 (Comunidade)</span>
                </div>
            </TabsTrigger>
            <TabsTrigger value="miner" className="py-4 data-[state=active]:bg-amber-600 data-[state=active]:text-white rounded-lg transition-all">
                <div className="flex flex-col items-center gap-2">
                    <Pickaxe className="h-6 w-6" />
                    <span className="font-bold">Minerador</span>
                    <span className="text-xs opacity-80 font-normal">Tier 2 (Produção)</span>
                </div>
            </TabsTrigger>
            <TabsTrigger value="council" className="py-4 data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-lg transition-all">
                <div className="flex flex-col items-center gap-2">
                    <ShieldCheck className="h-6 w-6" />
                    <span className="font-bold">Conselho</span>
                    <span className="text-xs opacity-80 font-normal">Tier 1 (Gestão)</span>
                </div>
            </TabsTrigger>
          </TabsList>

          {/* TIER 3: GARIMPEIRO */}
          <TabsContent value="garimpeiro">
            <Card className="border-emerald-100 shadow-lg mt-6">
                <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                    <CardTitle className="text-emerald-800">Cadastro de Garimpeiro</CardTitle>
                    <CardDescription>
                        Para quem compra xisto, beneficia pedras e vota nas assembleias.
                        <br/><strong>Benefício:</strong> Voto Garantido (1 CPF = 1 Voto) e Registro de Descobertas.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Nome Completo (Conforme Gov.br)</Label>
                            <Input name="fullName" placeholder="Seu nome" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label>CPF</Label>
                            <Input name="cpf" placeholder="000.000.000-00" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label>Celular / WhatsApp</Label>
                            <Input name="phone" placeholder="(00) 90000-0000" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg flex gap-3 items-start">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
                        <p className="text-sm text-emerald-800">
                            Ao se cadastrar, você receberá um <strong>Soulbound Token (SBT)</strong> intransferível que garante sua identidade na Blockchain.
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-lg" onClick={() => handleRegister('garimpeiro')} disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <ArrowRight className="mr-2" />}
                        Confirmar Identidade Gov.br
                    </Button>
                </CardFooter>
            </Card>
          </TabsContent>

          {/* TIER 2: MINERADOR */}
          <TabsContent value="miner">
            <Card className="border-amber-100 shadow-lg mt-6">
                <CardHeader className="bg-amber-50/50 border-b border-amber-100">
                    <CardTitle className="text-amber-800">Cadastro de Minerador (Dono de Maquinário)</CardTitle>
                    <CardDescription>
                        Para quem extrai e vende xisto bruto.
                        <br/><strong>Benefício:</strong> Emissão de Certificado de Origem (Lastro) para suas vendas.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Razão Social / Nome do Proprietário</Label>
                            <Input name="fullName" placeholder="Nome ou Empresa" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label>CNPJ / CPF</Label>
                            <Input name="cpf" placeholder="Documento Fiscal" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Número da Licença de Lavra / Protocolo ANM</Label>
                            <Input name="miningLicense" placeholder="Ex: 800.000/2023" onChange={handleInputChange} />
                            <p className="text-xs text-slate-500">Obrigatório para emissão de lastro.</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white h-12 text-lg" onClick={() => handleRegister('miner')} disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <ArrowRight className="mr-2" />}
                        Cadastrar Mina
                    </Button>
                </CardFooter>
            </Card>
          </TabsContent>

          {/* TIER 1: CONSELHO */}
          <TabsContent value="council">
            <Card className="border-slate-200 shadow-lg mt-6">
                <CardHeader className="bg-slate-100 border-b border-slate-200">
                    <CardTitle className="text-slate-800">Acesso Administrativo (Conselho)</CardTitle>
                    <CardDescription>
                        Área restrita para Diretoria Executiva, Conselho Fiscal e Jurídico.
                        <br/><strong>Requisito:</strong> Token de Acesso Especial.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Nome do Conselheiro</Label>
                            <Input name="fullName" placeholder="Seu nome" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label>CPF</Label>
                            <Input name="cpf" placeholder="000.000.000-00" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Token de Segurança (Chave Privada)</Label>
                            <Input name="councilToken" type="password" placeholder="Insira a chave de acesso do conselho" onChange={handleInputChange} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-slate-800 hover:bg-slate-900 text-white h-12 text-lg" onClick={() => handleRegister('council')} disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <ShieldCheck className="mr-2" />}
                        Validar Credenciais
                    </Button>
                </CardFooter>
            </Card>
          </TabsContent>

        </Tabs>

      </div>
    </main>
  );
}
