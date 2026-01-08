import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { StatsSection } from "@/components/landing/StatsSection";
import { TripleShieldSection } from "@/components/landing/TripleShieldSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <HeroSection />
      <StatsSection />
      <TripleShieldSection />
      <HowItWorks />
      
      {/* CTA Final Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Pronto para blindar a gestão?
            </h2>
            <p className="text-slate-500 text-lg">
              Faça parte da revolução da Mineração Inteligente. Acesse o GovChain agora e garanta que cada decisão tenha força de lei e alcance global.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
