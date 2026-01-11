"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger, 
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Shield, ChevronDown, Check, Users, Pickaxe, Gem, Building2, Gavel } from "lucide-react";
import { useUserRole, UserRole } from "@/hooks/useUserRole";
import { Badge } from "@/components/ui/badge";

export function RoleSwitcher() {
    const { role } = useUserRole();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const switchRole = (newRole: UserRole) => {
        if (newRole) {
            localStorage.setItem('dev_role_override', newRole);
        } else {
            localStorage.removeItem('dev_role_override');
        }
        window.dispatchEvent(new Event('roleChanged'));
        // Force reload to ensure all hooks update cleanly if event isn't enough for some edge cases
        setTimeout(() => window.location.reload(), 100); 
    };

    const currentRoleLabel = () => {
        switch(role) {
            case 'admin': return 'Admin (God Mode)';
            case 'council': return 'Conselho Deliberativo';
            case 'miner': return 'Minerador (Tier 2)';
            case 'garimpeiro': return 'Garimpeiro (Tier 3)';
            case 'processor': return 'Beneficiador (Tier 4)';
            case 'entity': return 'Entidade Social (Tier 5)';
            case 'auditor': return 'Auditor Externo';
            default: return 'Visitante';
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-slate-900 text-white border-slate-700 shadow-xl gap-2 h-10 px-4 rounded-full hover:bg-slate-800">
                        <Shield className="h-4 w-4 text-[#50C878]" />
                        <span className="text-xs font-medium max-w-[120px] truncate">{currentRoleLabel()}</span>
                        <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Simular Perfil (Dev)</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={() => switchRole('council')} className="gap-2">
                        {role === 'council' && <Check className="h-4 w-4 text-emerald-500" />}
                        <Users className="h-4 w-4 text-slate-500" />
                        <span>Conselho</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => switchRole('miner')} className="gap-2">
                        {role === 'miner' && <Check className="h-4 w-4 text-emerald-500" />}
                        <Pickaxe className="h-4 w-4 text-slate-500" />
                        <span>Minerador</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => switchRole('garimpeiro')} className="gap-2">
                        {role === 'garimpeiro' && <Check className="h-4 w-4 text-emerald-500" />}
                        <Gem className="h-4 w-4 text-slate-500" />
                        <span>Garimpeiro</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => switchRole('entity')} className="gap-2">
                        {role === 'entity' && <Check className="h-4 w-4 text-emerald-500" />}
                        <Building2 className="h-4 w-4 text-slate-500" />
                        <span>Entidade Social</span>
                        <Badge className="ml-auto text-[10px] h-4 px-1 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">NEW</Badge>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => switchRole('auditor')} className="gap-2">
                        {role === 'auditor' && <Check className="h-4 w-4 text-emerald-500" />}
                        <Gavel className="h-4 w-4 text-slate-500" />
                        <span>Auditor</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => switchRole(null)} className="text-red-600 gap-2">
                        Resetar (Padrão)
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
