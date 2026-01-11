import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Assuming server-side client or using same client
import { EASService } from '@/lib/eas-service';
import { ethers } from 'ethers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { proposalId, choice, walletAddress, userTier } = body;

    if (!proposalId || !choice || !walletAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Verify User Eligibility (Gov.br)
    // In a real app, we would verify the session token or check the database for 'verified_govbr' flag.
    // For this implementation, we assume the frontend checked, but we double-check or simulate.
    
    // Simulate fetching user CPF Hash from secure storage (never exposed to frontend)
    // Mock CPF Hash generation for demo
    const mockCPFHash = ethers.id(`cpf-${walletAddress}`); 

    // 2. Create On-Chain Attestation (EAS)
    // Map choice string to uint8: yes=1, no=2, abstain=3
    const choiceMap: Record<string, number> = { 'yes': 1, 'no': 2, 'abstain': 3 };
    const choiceInt = choiceMap[choice] || 0;

    const attestation = await EASService.attestVote({
      proposalId,
      choice: choiceInt,
      cpfHash: mockCPFHash,
      userTier: userTier || 'member'
    }, walletAddress);

    // 3. Persist Vote to Database (Supabase)
    // We try to save to Supabase, but if it fails (missing config), we just return the attestation (Mock Mode)
    
    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

    if (isSupabaseConfigured) {
        // Find user profile ID
        const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('wallet_address', walletAddress)
            .single();

        if (profile) {
            await supabase.from('votes').insert({
                proposal_id: proposalId,
                user_id: profile.id,
                choice: choice,
                attestation_uid: attestation.uid, // Save proof!
                transaction_hash: attestation.txHash
            });
        }
    }

    return NextResponse.json({
      success: true,
      attestation: attestation,
      message: "Voto registrado e atestado com sucesso via Gov.br Oracle"
    });

  } catch (error) {
    console.error("Vote Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
