import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { supabase } from "@/lib/supabase";
import { useMockWallet } from "@/hooks/useMockWallet";

export type UserRole = "council" | "miner" | "garimpeiro" | "auditor" | "admin" | "fiscal" | "legal" | "member" | "processor" | null;

export function useUserRole() {
  const account = useActiveAccount();
  const { mockAddress, isConnected: isMockConnected } = useMockWallet();
  const activeAddress = account?.address || (isMockConnected ? mockAddress : null);

  // --- DEV NET MODE (GOD MODE) ---
  // Quando true, libera acesso total para desenvolvimento e simulação.
  // Isso permite testar todas as telas (Garimpeiro, Jurídico, Conselho) sem barreiras.
  // SECURITY FIX: Agora controlado por variável de ambiente ou padrão false em prod
  const IS_DEV_NET = process.env.NEXT_PUBLIC_DEV_MODE === 'true'; 

  const [role, setRole] = useState<UserRole>(null);
  const [verifiedGovBr, setVerifiedGovBr] = useState(false);
  const [loading, setLoading] = useState(true);

  // DEV MODE ROLE OVERRIDE LISTENER
  useEffect(() => {
    if (!IS_DEV_NET && typeof window !== 'undefined') {
       // Also listen for localStorage override in normal mode for demo purposes
       const override = localStorage.getItem('dev_role_override');
       if (override) {
           setRole(override as UserRole);
           setLoading(false);
       }
    }

    // Listen for custom event 'roleChanged'
    const handleRoleChange = () => {
        const override = localStorage.getItem('dev_role_override');
        if (override) {
            setRole(override as UserRole);
        } else {
             // If cleared, re-fetch (simplification: just reload or let the main effect handle it)
             window.location.reload(); 
        }
    };

    window.addEventListener('roleChanged', handleRoleChange);
    return () => window.removeEventListener('roleChanged', handleRoleChange);
  }, []);

  useEffect(() => {
    async function fetchRole() {
      // Check for local override first
      if (typeof window !== 'undefined') {
          const override = localStorage.getItem('dev_role_override');
          if (override) {
              setRole(override as UserRole);
              setVerifiedGovBr(true);
              setLoading(false);
              return;
          }
      }

      if (IS_DEV_NET) {
        // Simulação de "Super Usuário" para Dev Net
        setRole("admin"); // Papel máximo
        setVerifiedGovBr(true);
        setLoading(false);
        return;
      }

      if (!activeAddress) {
        setRole(null);
        setVerifiedGovBr(false);
        setLoading(false);
        return;
      }

      try {
        // Try to find profile by wallet_address
        // Note: In a real prod app with Supabase Auth linked to Thirdweb, we would use auth.uid()
        // Here we simulate by querying the public profiles table for the wallet
        
        // First check if profile exists
        let { data, error } = await supabase
          .from("profiles")
          .select("role, verified_govbr")
          .eq("wallet_address", activeAddress)
          .single();

        if (!data && !error) {
            // If no profile, create a default 'garimpeiro' profile for this wallet (Auto-registration for MVP)
            const { data: newProfile, error: createError } = await supabase
                .from("profiles")
                .insert({
                    wallet_address: activeAddress,
                    role: 'garimpeiro' // Default Tier 3
                })
                .select("role, verified_govbr")
                .single();
            
            if (newProfile) {
                data = newProfile;
            }
        }

        if (data) {
          setRole(data.role as UserRole);
          setVerifiedGovBr(data.verified_govbr || false);
        } else {
            // Default to garimpeiro if something goes wrong or RLS prevents reading
            setRole("garimpeiro");
        }

      } catch (err) {
        console.error("Error fetching role:", err);
        setRole("garimpeiro"); // Fallback
      } finally {
        setLoading(false);
      }
    }

    fetchRole();
  }, [activeAddress]);

  // Map legacy roles to new tiers for backward compatibility
  const normalizedRole = role === 'admin' ? 'council' : role === 'fiscal' || role === 'legal' ? 'auditor' : role === 'member' ? 'garimpeiro' : role;

  if (IS_DEV_NET) {
    return {
        role: 'admin',
        verifiedGovBr: true,
        loading: false,
        isCouncil: true,
        isAdmin: true,
        isDeliberative: true,
        isMiner: true,
        isGarimpeiro: true,
        isMember: true,
        isAuditor: true,
        isFiscal: true,
        isLegal: true,
        isProcessor: true,
        isEntity: true
    };
  }

  return {
    role: normalizedRole,
    verifiedGovBr,
    loading,
    isCouncil: normalizedRole === 'council',
    isAdmin: normalizedRole === 'admin' || normalizedRole === 'council', // Admin is effectively council
    isDeliberative: normalizedRole === 'council' || normalizedRole === 'miner',
    isMiner: normalizedRole === 'miner',
    isGarimpeiro: normalizedRole === 'garimpeiro',
    isMember: normalizedRole === 'member',
    isAuditor: normalizedRole === 'auditor',
    isFiscal: normalizedRole === 'auditor' || normalizedRole === 'council',
    isLegal: normalizedRole === 'auditor' || normalizedRole === 'council',
    isProcessor: normalizedRole === 'processor',
    isEntity: normalizedRole === 'entity'
  };
}
