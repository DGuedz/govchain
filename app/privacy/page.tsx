
import { Shield, Lock, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Política de Privacidade</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6 text-slate-700">
          <p className="text-sm text-slate-500">Última atualização: 08 de Janeiro de 2026</p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#50C878]" />
              1. Coleta de Dados
            </h2>
            <p>
              A GovChain coleta apenas os dados estritamente necessários para a autenticação via Gov.br e para o registro imutável de ações na blockchain (wallet address). Não armazenamos senhas ou dados sensíveis em nossos servidores centrais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#50C878]" />
              2. Uso da Blockchain
            </h2>
            <p>
              Ao utilizar a plataforma, o usuário compreende que transações registradas na blockchain (votos, hashes de documentos) são públicas e imutáveis por natureza. Nenhuma informação pessoal identificável (PII) é gravada on-chain, apenas identificadores criptográficos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#50C878]" />
              3. Transparência Ativa
            </h2>
            <p>
              Documentos classificados como públicos pela cooperativa estarão disponíveis no Portal da Transparência, acessível a qualquer cidadão, em conformidade com o Protocolo de Gestão Transparente.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
