import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-50 text-center px-4">
      <div className="flex flex-col items-center space-y-6 max-w-md">
        <div className="rounded-full bg-emerald-100 p-4">
          <ShieldAlert className="h-12 w-12 text-[#50C878]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            404
          </h1>
          <h2 className="text-xl font-semibold text-slate-700">
            Caminho não encontrado no GovChain
          </h2>
          <p className="text-slate-500">
            A página que você procura não existe ou foi movida. 
            Verifique o endereço ou retorne ao Oráculo Central.
          </p>
        </div>
        <Button asChild className="bg-[#50C878] hover:bg-[#40b068] gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Voltar ao Início
          </Link>
        </Button>
      </div>
    </div>
  );
}
