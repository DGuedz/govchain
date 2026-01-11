"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { hybridStorage } from "@/lib/hybridStorage";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useActiveAccount } from "thirdweb/react";
import { useMockWallet } from "@/hooks/useMockWallet";
import { Loader2, Vote, Check, X, MinusCircle, PlusCircle, FileCheck, ExternalLink, HeartHandshake } from "lucide-react";

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: "active" | "closed";
  created_at: string;
  votes_yes: number;
  votes_no: number;
  votes_abstain: number;
  user_vote?: "yes" | "no" | "abstain";
  attestation_uid?: string;
  type?: "governance" | "social"; // Added type
  value?: number; // Added for social projects
  entity?: string; // Added for social projects
}

// Mock Data for Demo Mode
const MOCK_PROPOSALS: Proposal[] = [
    {
        id: "social-p1",
        title: "Reforma do Telhado da Creche",
        description: "Projeto de impacto social para reforma estrutural da Creche Municipal Pequeno Príncipe.",
        status: "active",
        created_at: new Date().toISOString(),
        votes_yes: 45,
        votes_no: 2,
        votes_abstain: 0,
        type: "social",
        value: 12000,
        entity: "Associação Benjamim"
    },
    {
        id: "demo-p1",
        title: "Aprovação do Balanço Financeiro 2024",
        description: "Votação para aprovação das contas do exercício de 2024, auditadas pela empresa externa.",
        status: "active",
        created_at: new Date().toISOString(),
        votes_yes: 45,
        votes_no: 2,
        votes_abstain: 5,
        type: "governance"
    },
    {
        id: "demo-p2",
        title: "Eleição do Conselho Fiscal",
        description: "Escolha dos novos membros para o biênio 2025-2026.",
        status: "active",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        votes_yes: 120,
        votes_no: 15,
        votes_abstain: 10,
        user_vote: "yes"
    },
    {
        id: "demo-p3",
        title: "Destinação de Sobras Líquidas",
        description: "Proposta para distribuição de 40% das sobras aos cooperados e 60% para fundo de reserva.",
        status: "closed",
        created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
        votes_yes: 300,
        votes_no: 50,
        votes_abstain: 20,
        user_vote: "no"
    }
];

export default function VoteRoomWrapper() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#50C878]" /></div>}>
            <VoteRoom />
        </Suspense>
    );
}

function VoteRoom() {
  const { role, loading: roleLoading, isAdmin: realIsAdmin, isDeliberative } = useUserRole();
  const account = useActiveAccount();
  const { mockAddress, isConnected: isMockConnected } = useMockWallet();
  const activeAddress = account?.address || (isMockConnected ? mockAddress : null);

  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';
  const router = useRouter();

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [votingId, setVotingId] = useState<string | null>(null);

  // For Demo: Simulate Admin if demo mode
  // For Real: Check if role is admin (Deliberativo)
  const canCreateProposal = isDemo ? true : isDeliberative;

  // For Admin: Create Proposal
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchProposals();
  }, [activeAddress, isDemo]); // Refetch when account changes

    async function fetchProposals() {
        // Use Hybrid Storage (Supabase -> LocalStorage Fallback)
        const table = await hybridStorage.from('proposals');
        const { data, error } = await table
            .select('*')
            .order('created_at', { ascending: false });

        let finalProposals = [...MOCK_PROPOSALS];

        // Merge with local storage override if in demo/simulation
        if (typeof window !== 'undefined') {
            const raw = localStorage.getItem('govchain_proposals');
            if (raw) {
                const localProposals = JSON.parse(raw);
                // Prepend local proposals to mock ones
                finalProposals = [...localProposals, ...finalProposals];
            }
        }

        if (data && data.length > 0) {
            // If backend returns data, merge it too (deduplicating by ID would be ideal)
             finalProposals = [...finalProposals, ...(data as Proposal[])];
        }

        // Deduplicate by ID just in case
        const uniqueProposals = Array.from(new Map(finalProposals.map(item => [item.id, item])).values());

        setProposals(uniqueProposals);
        setLoading(false);
    }

  function sanitize(input: string) {
    if (typeof window === 'undefined') return input; // Server-side
    return DOMPurify.sanitize(input);
  }

  const handleCreateProposal = async () => {
    if (!newTitle.trim() || !newDesc.trim()) {
        toast.error("Preencha título e descrição");
        return;
    }
    
    // Sanitize Inputs
    const cleanTitle = sanitize(newTitle);
    const cleanDesc = sanitize(newDesc);

    setIsCreating(true);

    // Detect if we are in "Missing Backend" mode (Supabase URL is placeholder or empty)
    const isSupabaseMissing = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

    if (isDemo || isSupabaseMissing) {
        setTimeout(() => {
            const newProposal: Proposal = {
                id: `demo-p${Date.now()}`,
                title: cleanTitle,
                description: cleanDesc,
                status: "active",
                created_at: new Date().toISOString(),
                votes_yes: 0,
                votes_no: 0,
                votes_abstain: 0
            };
            setProposals([newProposal, ...proposals]);
            setNewTitle("");
            setNewDesc("");
            setIsCreating(false);
            
            if (isSupabaseMissing) {
                toast.success("Pauta criada (Modo Local - Sem Backend Conectado)");
            } else {
                toast.success("Pauta criada com sucesso! (Simulação)");
            }
        }, 1000);
        return;
    }

    try {
        // Get profile id for user
        const profilesTable = await hybridStorage.from('profiles');
        const { data: profile } = await profilesTable.select('id').eq('wallet_address', activeAddress).single();
        
        if (!profile) throw new Error("Perfil não encontrado");

        const proposalData = {
            title: cleanTitle,
            description: cleanDesc,
            created_by: profile.id,
            status: 'active',
            votes_yes: 0,
            votes_no: 0,
            votes_abstain: 0
        };

        // Use Hybrid Storage for writing too
        const table = await hybridStorage.from('proposals');
        const { error } = await table.insert(proposalData);

        if (error) throw error;
        
        toast.success("Pauta criada com sucesso!");
        setNewTitle("");
        setNewDesc("");
        fetchProposals();
    } catch (error) {
        console.error(error);
        toast.error("Erro ao criar pauta. Verifique permissões.");
    } finally {
        setIsCreating(false);
    }
  };

  const handleVote = async (proposalId: string, choice: "yes" | "no" | "abstain") => {
    // Detect if we are in "Missing Backend" mode
    const isSupabaseMissing = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

    if (isDemo || isSupabaseMissing) {
        const updatedProposals = proposals.map(p => {
            if (p.id === proposalId) {
                return {
                    ...p,
                    votes_yes: choice === 'yes' ? p.votes_yes + 1 : p.votes_yes,
                    votes_no: choice === 'no' ? p.votes_no + 1 : p.votes_no,
                    votes_abstain: choice === 'abstain' ? p.votes_abstain + 1 : p.votes_abstain,
                    user_vote: choice
                };
            }
            return p;
        });
        setProposals(updatedProposals);
        
        if (isSupabaseMissing) {
            toast.success(`Voto registrado localmente: ${choice.toUpperCase()}`);
        } else {
            toast.success(`Voto registrado: ${choice.toUpperCase()}`);
        }
        return;
    }

    try {
        setVotingId(proposalId);

        // Get profile
        const profilesTable = await hybridStorage.from('profiles');
        const { data: profile } = await profilesTable.select('id').eq('wallet_address', activeAddress).single();
        if (!profile) {
            toast.error("Perfil não encontrado.");
            setVotingId(null);
            return;
        }

        // Use Hybrid Storage for votes
        const table = await hybridStorage.from('votes');
        const { error } = await table.insert({
            proposal_id: proposalId,
            user_id: profile.id,
            choice: choice,
            transaction_hash: `0x${Math.random().toString(16).slice(2)}` // Simulated
        });

        if (error) {
            if ((error as any).code === '23505') { // Unique violation
                toast.error("Você já votou nesta pauta.");
            } else {
                throw error;
            }
        } else {
            toast.success("Voto registrado na Blockchain!");
            fetchProposals();
        }
    } catch (error) {
        console.error(error);
        toast.error("Erro ao registrar voto.");
    } finally {
        setVotingId(null);
    }
  };

  if (roleLoading && !isDemo) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#50C878]" />
        </div>
    );
  }

  // Redirect if not logged in and not demo
  if (!activeAddress && !isDemo && !loading) {
     // In a real app we might redirect or show login. 
     // Since the parent page handles login, maybe we just show a message or redirect back.
     // For now, let's just show a simple unauthorized message or button to demo.
     return (
        <div className="flex h-screen items-center justify-center flex-col gap-4">
            <h2 className="text-xl font-bold">Acesso Restrito</h2>
            <Button onClick={() => router.push('/governance?demo=true')}>Entrar como Demo</Button>
        </div>
     );
  }

  return (
    <main className="container mx-auto px-4 py-8 bg-slate-50 min-h-screen">
      <Breadcrumbs items={[{ label: "Área do Oráculo", href: isDemo ? "/governance?demo=true" : "/governance" }, { label: "Sala de Votação" }]} />

      {isDemo && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-md flex items-center justify-between">
            <p className="text-blue-700 text-sm">
                <strong>Modo de Demonstração:</strong> Você está visualizando dados fictícios e atuando como Administrador.
            </p>
            <Button variant="ghost" size="sm" onClick={() => router.push("/governance/votes")}>Sair do Demo</Button>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                <Vote className="h-8 w-8 text-[#50C878]" />
                Assembleia Digital
            </h1>
            <p className="text-slate-500">Participe das decisões estratégicas da Cooperativa.</p>
            {role === 'garimpeiro' && (
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                    <Check className="h-3 w-3" />
                    Sua voz está garantida: 1 CPF = 1 Voto (Validado via Gov.br)
                </div>
            )}
            {role === 'processor' && (
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                    <Check className="h-3 w-3" />
                    Membro Beneficiador: Voto Garantido
                </div>
            )}
        </div>
        {role && (
            <Badge variant="outline" className="text-sm px-3 py-1 border-[#50C878] text-[#50C878] uppercase">
                {role === 'council' ? 'Conselho Deliberativo' : role === 'miner' ? 'Minerador (Tier 2)' : role === 'garimpeiro' ? 'Garimpeiro (Tier 3)' : role === 'processor' ? 'Beneficiador (Tier 4)' : role === 'auditor' ? 'Auditor' : 'Cooperado'}
            </Badge>
        )}
      </div>

      {canCreateProposal && (
        <Card className="mb-8 border-emerald-100 shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5 text-[#50C878]" />
                    Nova Pauta (Apenas Diretoria)
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <input 
                    className="w-full p-2 border rounded-md" 
                    placeholder="Título da Pauta (ex: Aprovação de Contas)"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea 
                    className="w-full p-2 border rounded-md" 
                    placeholder="Descrição detalhada..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                />
                <Button onClick={handleCreateProposal} disabled={isCreating} className="bg-[#50C878] hover:bg-[#40b068]">
                    {isCreating ? "Criando..." : "Abrir Votação"}
                </Button>
            </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {proposals.length === 0 ? (
            <div className="text-center text-slate-500 py-12">Nenhuma pauta ativa no momento.</div>
        ) : (
            proposals.map((proposal) => {
                const totalVotes = proposal.votes_yes + proposal.votes_no + proposal.votes_abstain;
                const yesPercent = totalVotes ? (proposal.votes_yes / totalVotes) * 100 : 0;
                const noPercent = totalVotes ? (proposal.votes_no / totalVotes) * 100 : 0;

                return (
                    <Card key={proposal.id} className="shadow-md">
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        {proposal.type === 'social' && (
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                <HeartHandshake className="h-3 w-3 mr-1" />
                                                Impacto Social
                                            </Badge>
                                        )}
                                        <CardTitle className="text-xl">{proposal.title}</CardTitle>
                                    </div>
                                    <CardDescription>{proposal.description}</CardDescription>
                                    {proposal.type === 'social' && proposal.value && (
                                        <div className="mt-2 text-sm text-slate-600 bg-slate-100 p-2 rounded inline-block">
                                            Valor Solicitado: <strong>R$ {proposal.value.toLocaleString('pt-BR')}</strong>
                                            <span className="mx-2">•</span>
                                            Entidade: <strong>{proposal.entity}</strong>
                                        </div>
                                    )}
                                </div>
                                <Badge variant={proposal.status === 'active' ? 'default' : 'secondary'} className={proposal.status === 'active' ? 'bg-[#50C878] shrink-0' : 'shrink-0'}>
                                    {proposal.status === 'active' ? 'Em Andamento' : 'Encerrada'}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="flex items-center gap-1"><Check className="h-4 w-4 text-emerald-600"/> Sim ({proposal.votes_yes})</span>
                                        <span>{yesPercent.toFixed(1)}%</span>
                                    </div>
                                    <Progress value={yesPercent} className="h-2 bg-slate-100" indicatorClassName="bg-emerald-500" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="flex items-center gap-1"><X className="h-4 w-4 text-red-600"/> Não ({proposal.votes_no})</span>
                                        <span>{noPercent.toFixed(1)}%</span>
                                    </div>
                                    <Progress value={noPercent} className="h-2 bg-slate-100" indicatorClassName="bg-red-500" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50 p-4 flex flex-col items-end gap-3">
                            {proposal.user_vote ? (
                                <div className="w-full flex justify-between items-center">
                                    <div className="text-sm text-slate-500 font-medium flex items-center gap-2">
                                        <FileCheck className="h-4 w-4 text-emerald-500" />
                                        Voto Atestado: <span className="uppercase text-[#50C878]">{proposal.user_vote === 'yes' ? 'Sim' : proposal.user_vote === 'no' ? 'Não' : 'Abstenção'}</span>
                                    </div>
                                    {proposal.attestation_uid && (
                                        <Button variant="link" size="sm" className="text-xs text-slate-400 h-auto p-0 flex items-center gap-1" onClick={() => window.open(`https://base-sepolia.easscan.org/attestation/view/${proposal.attestation_uid}`, '_blank')}>
                                            Ver Recibo EAS <ExternalLink className="h-3 w-3" />
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <div className="w-full flex gap-3">
                                    <Button variant="outline" onClick={() => handleVote(proposal.id, 'abstain')} disabled={votingId === proposal.id} className="border-slate-300 flex-1">
                                        {votingId === proposal.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Abster"}
                                    </Button>
                                    <Button variant="outline" onClick={() => handleVote(proposal.id, 'no')} disabled={votingId === proposal.id} className="border-red-200 text-red-700 hover:bg-red-50 flex-1">
                                        {votingId === proposal.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Não"}
                                    </Button>
                                    <Button onClick={() => handleVote(proposal.id, 'yes')} disabled={votingId === proposal.id} className="bg-[#50C878] hover:bg-[#40b068] flex-1">
                                        {votingId === proposal.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sim"}
                                    </Button>
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                );
            })
        )}
      </div>
    </main>
  );
}
