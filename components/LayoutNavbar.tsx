"use client";

import { usePathname } from "next/navigation";
import { Navbar as AppNavbar } from "@/components/compound/Navbar";
import { Navbar as LandingNavbar } from "@/components/landing/Navbar";
import { RoleSwitcher } from "@/components/debug/RoleSwitcher";

export function LayoutNavbar() {
  const pathname = usePathname();

  // Se estiver na rota raiz, exibe o Navbar específico da Landing Page
  if (pathname === "/") {
    return (
      <>
        <LandingNavbar />
        <RoleSwitcher />
      </>
    );
  }

  // Caso contrário, exibe o Navbar padrão do sistema
  return (
    <>
      <AppNavbar />
      <RoleSwitcher />
    </>
  );
}
