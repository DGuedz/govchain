
import { Scale, BookOpen, Gavel } from "lucide-react";

export default function BylawsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Estatuto Social</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-8 text-slate-700">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
            Este é um resumo digital. O documento completo autenticado pode ser encontrado no Portal da Transparência sob o ID: <strong>EST-2026-FINAL</strong>.
          </div>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Scale className="h-5 w-5 text-[#50C878]" />
              Capítulo I: Da Denominação e Sede
            </h2>
            <p>
              A COOPERSMERALDA rege-se pelo presente Estatuto e pelas disposições legais vigentes, tendo sede e foro na cidade de atuação, com prazo de duração indeterminado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#50C878]" />
              Capítulo II: Do Objeto Social
            </h2>
            <p>
              A cooperativa tem por objeto a organização e gestão democrática dos interesses econômicos e sociais de seus cooperados, promovendo o desenvolvimento sustentável e a transparência.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Gavel className="h-5 w-5 text-[#50C878]" />
              Capítulo III: Dos Direitos e Deveres
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Participar das Assembleias Gerais, discutindo e votando os assuntos que nelas forem tratados.</li>
                <li>Votar e ser votado para os cargos sociais, desde que atendidas as disposições regulamentares.</li>
                <li>Zelar pelo patrimônio moral e material da Cooperativa.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
