
import { LifeBuoy, Mail, MessageCircle, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Central de Ajuda</h1>
          <p className="text-slate-600 text-lg">
            Como podemos ajudar você hoje?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-[#50C878]" />
                Chat Online
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">Atendimento em tempo real para cooperados.</p>
              <Button className="w-full bg-[#50C878] hover:bg-[#40b068]">Iniciar Chat</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#50C878]" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">suporte@coopersmeralda.com.br</p>
              <Button variant="outline" className="w-full">Enviar Email</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Perguntas Frequentes</h2>
          {/* Add Accordion or list of FAQs here if needed */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="font-semibold text-lg mb-2">Como valido um documento?</h3>
            <p className="text-slate-600">Acesse o Portal da Transparência, encontre o documento e clique em "Auditar" ou escaneie o QR Code.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="font-semibold text-lg mb-2">Como votar nas assembleias?</h3>
            <p className="text-slate-600">Faça login com sua conta Gov.br na área de Governança e acesse a aba "Votação".</p>
          </div>
        </div>
      </div>
    </main>
  );
}
