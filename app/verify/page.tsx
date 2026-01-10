"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Footer } from "@/components/landing/Footer";

export default function VerifySearchPage() {
  const [searchId, setSearchId] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      router.push(`/verify/${searchId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-slate-200">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-emerald-100 p-3 rounded-full w-fit mb-4">
              <ShieldCheck className="h-8 w-8 text-[#50C878]" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Validar Certificado</CardTitle>
            <CardDescription>
              Insira o ID do documento ou hash da transação para verificar sua autenticidade na Blockchain.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Ex: 0x123...abc"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="pl-9 border-slate-300 focus:border-[#50C878] focus:ring-[#50C878]"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#50C878] hover:bg-[#40b068] text-white font-medium"
                disabled={!searchId.trim()}
              >
                Verificar Agora
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
