import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { StatsSection } from "@/components/landing/StatsSection";
import { TripleShieldSection } from "@/components/landing/TripleShieldSection";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <HeroSection />
      <StatsSection />
      <TripleShieldSection />
      <HowItWorks />
      
      {/* CTA Final Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container px-4 lg:px-24 mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Pronto para blindar a gestão?
            </h2>
            <p className="text-slate-500 text-lg">
              Faça parte da revolução da Mineração Inteligente. Acesse o Gov.Chain agora e garanta que cada decisão tenha força de lei e alcance global.
            </p>
            <div className="pt-4 flex justify-center">
              <Button asChild size="lg" className="bg-[#50C878] hover:bg-[#40b068] text-white font-semibold h-14 min-h-[44px] px-8 rounded-full shadow-lg shadow-emerald-200/50 w-full sm:w-auto transition-all hover:scale-105">
                <Link href="/login" className="flex items-center justify-center">
                  Acessar Sistema
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
