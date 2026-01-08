import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { supabase } from "@/lib/supabase";

export type UserRole = "admin" | "council" | "member" | null;

export function useUserRole() {
  const account = useActiveAccount();
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      if (!account) {
        setRole(null);
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
          .select("role")
          .eq("wallet_address", account.address)
          .single();

        if (!data && !error) {
            // If no profile, create a default 'member' profile for this wallet (Auto-registration for MVP)
            const { data: newProfile, error: createError } = await supabase
                .from("profiles")
                .insert({
                    wallet_address: account.address,
                    role: 'member'
                })
                .select("role")
                .single();
            
            if (newProfile) {
                data = newProfile;
            }
        }

        if (data) {
          setRole(data.role as UserRole);
        } else {
            // Default to member if something goes wrong or RLS prevents reading
            setRole("member");
        }

      } catch (err) {
        console.error("Error fetching role:", err);
        setRole("member"); // Fallback
      } finally {
        setLoading(false);
      }
    }

    fetchRole();
  }, [account]);

  return { role, loading, isAdmin: role === "admin", isCouncil: role === "council" };
}
