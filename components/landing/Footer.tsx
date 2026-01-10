import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Linkedin, Instagram, Youtube, ArrowRight, Lock, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100/80 py-16 border-t border-emerald-900 font-sans">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="relative h-16 w-16">
                  <Image 
                    src="/govchain-logo.png" 
                    alt="GovChain Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-xl text-white tracking-tight">
                  Gov.Chain
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-500 bg-emerald-950/30 px-2 py-0.5 rounded w-fit border border-emerald-900/50">
                Powered by GEMLAB
              </span>
            </div>
            <p className="text-sm text-emerald-200/60 leading-relaxed">
              A COOPESMERALDA lidera a Mineração Regenerativa 4.0. Através do Gov.Chain, transformamos a riqueza de Campos Verdes em ativos digitais imutáveis (RWA). Unimos a legitimidade do Gov.br à segurança da Blockchain para garantir a Tripla Blindagem: Origem Auditável, Segurança Jurídica e Inclusão Social. Mais que pedras, mineramos confiança.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center hover:bg-[#50C878] transition-colors cursor-pointer group">
                <Instagram className="h-4 w-4 text-emerald-200/60 group-hover:text-white transition-colors" />
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center hover:bg-[#50C878] transition-colors cursor-pointer group">
                <Linkedin className="h-4 w-4 text-emerald-200/60 group-hover:text-white transition-colors" />
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center hover:bg-[#50C878] transition-colors cursor-pointer group">
                <Youtube className="h-4 w-4 text-emerald-200/60 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
          
          {/* Links Column 1: Acesso à Plataforma */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold tracking-wide uppercase text-xs">Acesso à Plataforma</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/kyc" className="hover:text-[#50C878] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#50C878] rounded-full opacity-0 hover:opacity-100 transition-opacity"/> Portal do Cooperado</Link></li>
              <li><Link href="/public" className="hover:text-[#50C878] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#50C878] rounded-full opacity-0 hover:opacity-100 transition-opacity"/> Rastreabilidade Pública</Link></li>
              <li><Link href="/gemlab" className="hover:text-[#50C878] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#50C878] rounded-full opacity-0 hover:opacity-100 transition-opacity"/> Explorer GEMLAB</Link></li>
              <li><Link href="/verify" className="hover:text-[#50C878] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#50C878] rounded-full opacity-0 hover:opacity-100 transition-opacity"/> Validar Certificado</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Governança */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold tracking-wide uppercase text-xs">Governança</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/bylaws" className="hover:text-[#50C878] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#50C878] rounded-full opacity-0 hover:opacity-100 transition-opacity"/> Estatuto Social</Link></li>
              <li><Link href="/public" className="hover:text-[#50C878] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#50C878] rounded-full opacity-0 hover:opacity-100 transition-opacity"/> Portal da Transparência</Link></li>
              <li><Link href="/social" className="hover:text-[#50C878] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#50C878] rounded-full opacity-0 hover:opacity-100 transition-opacity"/> Associação Benjamim</Link></li>
              <li><Link href="/compliance" className="hover:text-[#50C878] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#50C878] rounded-full opacity-0 hover:opacity-100 transition-opacity"/> Canal de Denúncia</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact Column */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold tracking-wide uppercase text-xs">Conexão com o Mercado</h4>
            <div className="space-y-3">
                <p className="text-sm font-medium text-emerald-400">Newsletter "O Brilho do Verde"</p>
                <div className="text-xs text-emerald-200/60 space-y-2 leading-relaxed">
                    <p>Conecte-se à inteligência da Mineração 4.0. Associe-se e receba insights exclusivos do Oráculo da COOPESMERALDA:</p>
                    <ul className="space-y-2 mt-2">
                        <li className="leading-snug">
                            <strong className="text-emerald-300 font-semibold">Mercado:</strong> Cotação atualizada do quilate e tendências de ativos RWA.
                        </li>
                        <li className="leading-snug">
                            <strong className="text-emerald-300 font-semibold">Transparência:</strong> Relatórios de auditoria da Coopesmeraldas e validações na Blockchain.
                        </li>
                        <li className="leading-snug">
                            <strong className="text-emerald-300 font-semibold">Impacto:</strong> Acompanhe a transformação social do projeto 'Mãos de Pedra'.
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="Seu e-mail corporativo" 
                className="bg-emerald-900/50 border-emerald-800 text-emerald-100 focus:border-[#50C878] h-10 text-sm placeholder:text-emerald-200/40"
              />
              <Button size="sm" className="bg-[#50C878] hover:bg-[#40b068] text-white">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar - Extended */}
        <div className="pt-8 border-t border-emerald-900 space-y-6">
            
            {/* Row 1: Address & Contact */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-emerald-200/60">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-[#50C878]" />
                        <span>Av. Costelão, S/N, Q. 02, Lt. 01, Setor Central, Campos Verdes - GO | CEP: 76.515-000</span>
                    </div>
                    <div className="hidden sm:block w-px h-3 bg-emerald-800"></div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-[#50C878]" />
                        <span>(62) 8150-1015 | coopesmeraldacamposverdes@gmail.com</span>
                    </div>
                </div>
            </div>

            {/* Row 2: CNPJ & Legal */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] text-slate-600 font-mono border-t border-slate-900 pt-4">
                <div>
                    CNPJ: 34.926.901/0001-20 (COOPESMERALDA) | CNPJ: 47.005.591/0001-53 (ABC - Social)
                </div>
                <div>
                    Governança em conformidade com a Lei 12.690/2012 e IN RFB 2.291.
                </div>
            </div>

            {/* Row 3: Status & Copyright */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 pt-2">
                <p>&copy; 2026 COOPESMERALDA. Todos os direitos reservados.</p>
                
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 bg-red-950/30 text-red-400 px-2 py-1 rounded text-[10px] font-mono border border-red-900/30">
                        <Lock className="h-3 w-3" />
                        Vault Físico: Seguro
                    </span>
                    <span className="flex items-center gap-1.5 bg-emerald-950/50 text-emerald-400 px-2 py-1 rounded text-[10px] font-mono border border-emerald-900/30">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        Protocolo GEMLAB: System Operational
                    </span>
                    <span className="opacity-70 ml-2">Desenvolvido por <strong>Campos Verdes 2050</strong></span>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
