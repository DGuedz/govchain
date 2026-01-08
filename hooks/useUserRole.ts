import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { supabase } from "@/lib/supabase";
import { useMockWallet } from "@/hooks/useMockWallet";

export type UserRole = "council" | "miner" | "garimpeiro" | "auditor" | "admin" | "fiscal" | "legal" | "member" | null;

export function useUserRole() {
  const account = useActiveAccount();
  const { mockAddress, isConnected: isMockConnected } = useMockWallet();
  const activeAddress = account?.address || (isMockConnected ? mockAddress : null);

  const [role, setRole] = useState<UserRole>(null);
  const [verifiedGovBr, setVerifiedGovBr] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
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

  return { 
    role,
    verifiedGovBr, 
    loading, 
    // Tier 1: Council (Strategists)
    isCouncil: normalizedRole === "council",
    isAdmin: normalizedRole === "council", // Alias for backward compatibility
    isDeliberative: normalizedRole === "council", // Alias
    
    // Tier 2: Miner (Producers)
    isMiner: normalizedRole === "miner" || normalizedRole === "council",
    
    // Tier 3: Garimpeiro (Community)
    isGarimpeiro: normalizedRole === "garimpeiro" || normalizedRole === "miner" || normalizedRole === "council",
    isMember: normalizedRole === "garimpeiro" || normalizedRole === "miner" || normalizedRole === "council", // Alias
    
    // Auditors
    isAuditor: normalizedRole === "auditor" || normalizedRole === "council",
    isFiscal: normalizedRole === "auditor" || normalizedRole === "council", // Alias
    isLegal: normalizedRole === "auditor" || normalizedRole === "council" // Alias
  };
}
