
import { Users, HeartHandshake, Megaphone, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlindagemSocialPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-sm font-medium text-white">
            <Users className="mr-2 h-4 w-4" />
            Pilar 2: Confiança Comunitária
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Blindagem Social
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Eliminando o "Ciúme Político" através da transparência radical.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-8">
          <Card className="border-l-4 border-l-emerald-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Activity className="h-6 w-6 text-emerald-600" />
                O Desafio
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 text-lg leading-relaxed">
              Em comunidades cooperativas, a desconfiança sobre o uso de recursos e favorecimentos pode corroer a união. Rumores e falta de clareza geram instabilidade política e social.
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#50C878]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <HeartHandshake className="h-6 w-6 text-[#50C878]" />
                A Solução GovChain
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 text-lg leading-relaxed">
              <p>
                Democratizamos o acesso à informação. O "Portal da Transparência" não é apenas um site, é um compromisso ético.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Acesso Universal:</strong> Qualquer cooperado, cidadão ou parceiro pode auditar as contas e decisões em tempo real.</li>
                <li><strong>Prestação de Contas Ativa:</strong> Relatórios não são escondidos em gavetas, mas publicados na blockchain.</li>
                <li><strong>Votação Segura:</strong> Assembleias digitais onde cada voto é contado e verificado, sem margem para fraudes.</li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-slate-500" />
                  Impacto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Redução de conflitos internos.</li>
                  <li>Aumento do engajamento dos cooperados.</li>
                  <li>Fortalecimento da reputação na comunidade.</li>
                </ul>
              </CardContent>
            </Card>
            <div className="flex items-center justify-center p-6 bg-slate-100 rounded-xl">
              <div className="text-center space-y-4">
                <p className="text-slate-600 font-medium">Participe das decisões da sua cooperativa.</p>
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                  <Link href="/governance">Portal do Cooperado</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
