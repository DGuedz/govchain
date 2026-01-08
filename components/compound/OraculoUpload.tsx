"use client";

import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { ethers } from "ethers";
import { useAttest } from "@/hooks/useAttest";
import { client, chain } from "@/lib/thirdweb";
import { ethers6Adapter } from "thirdweb/adapters/ethers6";
import { supabase } from "@/lib/supabase";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ShieldCheck, Loader2, FileCheck, UploadCloud, CheckCircle2 } from "lucide-react";
import { TruthTimeline } from "./TruthTimeline";

export function OraculoUpload({ onAttestationComplete, isDemo = false }: { onAttestationComplete: (data: any) => void, isDemo?: boolean }) {
  const account = useActiveAccount();
  const { attestDocument, status } = useAttest();
  
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [docType, setDocType] = useState("Ata de Reunião");
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1: Idle, 0: Upload, 1: Hash, 2: Chain, 3: Success

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Por favor, selecione um arquivo PDF.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const processDocument = async () => {
    if (!file) return;
    if (!isDemo && !account) {
        toast.error("Conecte sua carteira para continuar.");
        return;
    }

    try {
      setCurrentStep(0); // Verdade Material
      
      if (isDemo) {
        // Simulação Demo com Timeline
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCurrentStep(1); // Verdade Matemática
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCurrentStep(2); // Verdade Eterna
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCurrentStep(3); // Sucesso

        toast.success("Documento Blindado com Sucesso!");
        
        const mockData = {
            id: `demo-${Date.now()}`,
            title: file.name.replace(".pdf", ""),
            type: docType,
            date: new Date().toISOString(),
            status: "Registrado (Demo)",
            hash: "0xdemo..." + Math.random().toString(36).substring(7),
            attestationId: "0xattest..." + Math.random().toString(36).substring(7),
            ipfsCid: "QmDemo..." + Math.random().toString(36).substring(7)
        };
        
        // Delay to show success state
        setTimeout(() => {
            onAttestationComplete(mockData);
            setIsOpen(false);
            setFile(null);
            setCurrentStep(-1);
        }, 1000);
        return;
      }

      // 1. Oráculo: Marca D'água (Verdade Material)
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      
      const dateStr = new Date().toLocaleString("pt-BR");
      const walletShort = `${account!.address.slice(0, 6)}...${account!.address.slice(-4)}`;
      const watermarkText = `Validado via GovChain | ${dateStr} | Resp: ${walletShort}`;

      firstPage.drawText(watermarkText, {
        x: 40,
        y: height - 40,
        size: 10,
        font: helveticaFont,
        color: rgb(0.31, 0.78, 0.47), // #50C878 (Emerald)
      });
      
      // Footer watermark
      firstPage.drawText("Protegido pelo Protocolo da Verdade Híbrida", {
        x: 40,
        y: 20,
        size: 8,
        font: helveticaFont,
        color: rgb(0.5, 0.5, 0.5),
      });

      const modifiedPdfBytes = await pdfDoc.save();
      
      // 2. Verdade Matemática: Hashing
      setCurrentStep(1);
      const hash = ethers.keccak256(new Uint8Array(modifiedPdfBytes));
      
      // Upload para Supabase Storage (Persistência Off-Chain mas segura)
      const blob = new Blob([modifiedPdfBytes as any], { type: "application/pdf" });
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("atas-govchain")
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("atas-govchain")
        .getPublicUrl(fileName);

      // 3. Verdade Eterna: Blockchain
      setCurrentStep(2);
      
      const signer = await ethers6Adapter.signer.toEthers({ 
        client, 
        chain, 
        account: account! 
      });

      const uid = await attestDocument(signer as any, hash, docType);
      
      // 5. Registro Final: Banco de Dados
      const { error: dbError } = await supabase
        .from("documents")
        .insert({
          title: docType,
          file_url: publicUrl,
          file_hash: hash,
          eas_uid: uid,
          signer_wallet: account!.address,
          status: "attested_onchain"
        });

      if (dbError) throw dbError;

      setCurrentStep(3);
      toast.success("Documento blindado e salvo com sucesso!");
      
      // Notify parent after delay
      setTimeout(() => {
        onAttestationComplete({
            fileName: file.name,
            uid,
            timestamp: new Date().toISOString(),
            hash,
            status: "Blindado",
            fileUrl: publicUrl
        });

        setIsOpen(false);
        setFile(null);
        setCurrentStep(-1);
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error("Falha no processo. Verifique conexão ou permissões.");
      setCurrentStep(-1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open && currentStep !== -1) return; // Prevent closing while processing
        setIsOpen(open);
    }}>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#50C878] hover:bg-[#40b068] gap-2 h-12 text-base font-semibold shadow-md transition-all active:scale-95">
          <UploadCloud className="h-5 w-5" />
          Enviar Documento para Blindagem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#50C878]">
            <ShieldCheck className="h-6 w-6" />
            Oráculo de Origem
          </DialogTitle>
          <DialogDescription>
            {currentStep === -1 
                ? "Envie a Ata ou Relatório para validação jurídica, armazenamento seguro e registro imutável."
                : "Acompanhe o processo de Tripla Blindagem em tempo real."
            }
          </DialogDescription>
        </DialogHeader>

        {currentStep === -1 ? (
            // Upload Form
            <div className="grid gap-6 py-4">
            <div className="grid gap-2">
                <Label htmlFor="doc-type" className="text-slate-600 font-medium">Tipo de Documento</Label>
                <Select value={docType} onValueChange={setDocType}>
                <SelectTrigger className="border-slate-300 focus:ring-[#50C878]">
                    <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Ata de Reunião">Ata de Reunião</SelectItem>
                    <SelectItem value="Pauta de Assembleia">Pauta de Assembleia</SelectItem>
                    <SelectItem value="Contrato">Contrato</SelectItem>
                    <SelectItem value="Laudo Técnico">Laudo Técnico</SelectItem>
                    <SelectItem value="Relatório Financeiro">Relatório Financeiro</SelectItem>
                    <SelectItem value="Parecer Jurídico">Parecer Jurídico</SelectItem>
                </SelectContent>
                </Select>
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="file" className="text-slate-600 font-medium">Arquivo PDF Original</Label>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-3 text-slate-400" />
                            <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Clique para enviar</span> ou arraste</p>
                            <p className="text-xs text-slate-400">PDF (MAX. 10MB)</p>
                        </div>
                        <Input 
                            id="file" 
                            type="file" 
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>
                {file && (
                    <div className="flex items-center gap-2 text-sm text-[#50C878] font-medium mt-1 bg-emerald-50 p-2 rounded border border-emerald-100">
                        <FileCheck className="h-4 w-4" />
                        {file.name}
                    </div>
                )}
            </div>

            <Button 
                onClick={processDocument} 
                disabled={!file}
                className="w-full bg-slate-900 hover:bg-slate-800 h-11"
            >
                Iniciar Processo de Blindagem
            </Button>
            </div>
        ) : (
            // Processing View (Timeline)
            <div className="py-6">
                <TruthTimeline currentStep={currentStep} />
                
                {currentStep === 3 && (
                    <div className="mt-6 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                        <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-8 w-8 text-[#50C878]" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Blindagem Concluída!</h3>
                        <p className="text-sm text-slate-500 text-center max-w-xs mt-1">
                            Seu documento agora é uma verdade eterna registrada na blockchain.
                        </p>
                    </div>
                )}
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
