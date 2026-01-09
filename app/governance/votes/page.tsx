"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/lib/supabase";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, Vote, Check, X, MinusCircle, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useActiveAccount } from "thirdweb/react";
import { useMockWallet } from "@/hooks/useMockWallet";

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
}

// Mock Data for Demo Mode
const MOCK_PROPOSALS: Proposal[] = [
    {
        id: "demo-p1",
        title: "Aprovação do Balanço Financeiro 2024",
        description: "Votação para aprovação das contas do exercício de 2024, auditadas pela empresa externa.",
        status: "active",
        created_at: new Date().toISOString(),
        votes_yes: 45,
        votes_no: 2,
        votes_abstain: 5,
        user_vote: undefined
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
    if (isDemo) {
        // Simulate network delay
        setTimeout(() => {
            setProposals(MOCK_PROPOSALS);
            setLoading(false);
        }, 800);
        return;
    }

    if (!activeAddress) return;

    try {
      setLoading(true);
      // Fetch proposals
      const { data: proposalsData, error } = await supabase
        .from("proposals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch votes for these proposals to calculate counts and check user vote
      // Note: In a real app, use Supabase aggregation or a view. Here we do client-side for MVP simplicity.
      const { data: votesData } = await supabase
        .from("votes")
        .select("proposal_id, choice, user_id, profiles(wallet_address)") // Assuming profiles linked
        
      // Since we don't have user_id easily mapped from wallet without querying profiles first, 
      // let's just get all votes and filter.
      
      // Map proposals with vote counts
      const mappedProposals = await Promise.all(proposalsData.map(async (p) => {
        const pVotes = votesData?.filter(v => v.proposal_id === p.id) || [];
        
        const yes = pVotes.filter(v => v.choice === 'yes').length;
        const no = pVotes.filter(v => v.choice === 'no').length;
        const abstain = pVotes.filter(v => v.choice === 'abstain').length;

        // Check if current user voted
        // We need to find the profile id for current wallet to match user_id in votes
        // Optimization: We could store profile_id in state, but let's query it or assume we can match by wallet if we joined profiles.
        // Let's do a quick lookup for current user vote.
        let userVote = undefined;
        
        // This is inefficient but works for MVP. Better to have user_id in context.
        if (activeAddress) {
            const { data: myProfile } = await supabase.from('profiles').select('id').eq('wallet_address', activeAddress).single();
            if (myProfile) {
                const myVote = pVotes.find(v => v.user_id === myProfile.id);
                if (myVote) userVote = myVote.choice;
            }
        }

        return {
          ...p,
          votes_yes: yes,
          votes_no: no,
          votes_abstain: abstain,
          user_vote: userVote
        };
      }));

      setProposals(mappedProposals as Proposal[]);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateProposal = async () => {
    if (!newTitle) return;
    setIsCreating(true);
    try {
        // Get admin profile id
        const { data: profile } = await supabase.from('profiles').select('id').eq('wallet_address', account?.address).single();
        
        if (!profile) throw new Error("Perfil não encontrado");

        const { error } = await supabase.from('proposals').insert({
            title: newTitle,
            description: newDesc,
            created_by: profile.id,
            status: 'active'
        });

        if (error) throw error;
        
        toast.success("Pauta criada com sucesso!");
        setNewTitle("");
        setNewDesc("");
        fetchProposals();
    } catch (error) {
        console.error(error);
        toast.error("Erro ao criar pauta.");
    } finally {
        setIsCreating(false);
    }
  };

  const handleVote = async (proposalId: string, choice: "yes" | "no" | "abstain") => {
    try {
        // Get profile id
        const { data: profile } = await supabase.from('profiles').select('id').eq('wallet_address', account?.address).single();
        if (!profile) {
            toast.error("Perfil não encontrado. Tente reconectar.");
            return;
        }

        const { error } = await supabase.from('votes').insert({
            proposal_id: proposalId,
            user_id: profile.id,
            choice: choice
        });

        if (error) {
            if (error.code === '23505') { // Unique violation
                toast.error("Você já votou nesta pauta.");
            } else {
                throw error;
            }
        } else {
            toast.success("Voto registrado na Blockchain (Simulado)!");
            fetchProposals();
        }
    } catch (error) {
        console.error(error);
        toast.error("Erro ao registrar voto.");
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
        </div>
        {role && (
            <Badge variant="outline" className="text-sm px-3 py-1 border-[#50C878] text-[#50C878] uppercase">
                {role === 'council' ? 'Conselho Deliberativo' : role === 'miner' ? 'Minerador (Tier 2)' : role === 'garimpeiro' ? 'Garimpeiro (Tier 3)' : role === 'auditor' ? 'Auditor' : 'Cooperado'}
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
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-xl mb-2">{proposal.title}</CardTitle>
                                    <CardDescription>{proposal.description}</CardDescription>
                                </div>
                                <Badge variant={proposal.status === 'active' ? 'default' : 'secondary'} className={proposal.status === 'active' ? 'bg-[#50C878]' : ''}>
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
                        <CardFooter className="bg-slate-50 p-4 flex justify-end gap-3">
                            {proposal.user_vote ? (
                                <span className="text-sm text-slate-500 font-medium">
                                    Você votou: <span className="uppercase text-[#50C878]">{proposal.user_vote === 'yes' ? 'Sim' : proposal.user_vote === 'no' ? 'Não' : 'Abstenção'}</span>
                                </span>
                            ) : (
                                <>
                                    <Button variant="outline" onClick={() => handleVote(proposal.id, 'abstain')} className="border-slate-300">Abster</Button>
                                    <Button variant="outline" onClick={() => handleVote(proposal.id, 'no')} className="border-red-200 text-red-700 hover:bg-red-50">Não</Button>
                                    <Button onClick={() => handleVote(proposal.id, 'yes')} className="bg-[#50C878] hover:bg-[#40b068]">Sim</Button>
                                </>
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
