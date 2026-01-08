import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-[#50C878] p-1.5 rounded-lg">
                <ShieldCheck className="text-white h-5 w-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                GovChain
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Plataforma oficial de Governança 4.0 da COOPESMERALDA. 
              Tecnologia Blockchain a serviço da transparência e do desenvolvimento sustentável.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Acesso Rápido</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/governance" className="hover:text-[#50C878] transition-colors">Portal do Cooperado</Link></li>
              <li><Link href="/public" className="hover:text-[#50C878] transition-colors">Consulta Pública</Link></li>
              <li><Link href="/bylaws" className="hover:text-[#50C878] transition-colors">Estatuto Social</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/support" className="hover:text-[#50C878] transition-colors">Central de Ajuda</Link></li>
              <li><Link href="/support" className="hover:text-[#50C878] transition-colors">Fale Conosco</Link></li>
              <li><Link href="/privacy" className="hover:text-[#50C878] transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} COOPESMERALDA. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded text-[10px] font-mono border border-emerald-900/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Base Sepolia (Testnet)
            </span>
            <span>Powered by <strong>Campos Verdes 2050</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
