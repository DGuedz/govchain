"use client";

import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function AuthRedirect() {
  const account = useActiveAccount();
  const router = useRouter();

  useEffect(() => {
    if (account) {
      toast.success("Identidade Gov.br verificada com sucesso!", {
        description: "Redirecionando para a Área do Oráculo...",
        duration: 3000,
      });
      router.push("/governance");
    }
  }, [account, router]);

  return null; // This component doesn't render anything visually
}
