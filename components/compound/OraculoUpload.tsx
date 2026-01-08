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
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ShieldCheck, Loader2, FileCheck, UploadCloud } from "lucide-react";

export function OraculoUpload({ onAttestationComplete, isDemo = false }: { onAttestationComplete: (data: any) => void, isDemo?: boolean }) {
  const account = useActiveAccount();
  const { attestDocument, status } = useAttest();
  
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [docType, setDocType] = useState("Ata de Reunião");
  const [progress, setProgress] = useState(0);

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
      setProgress(10);
      toast.info("Iniciando a Tripla Blindagem...");

      if (isDemo) {
        // Simulação Demo
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProgress(30);
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(50);
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(80);
        toast.success("Documento Simulado com Sucesso!");
        
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
        
        onAttestationComplete(mockData);
        setIsOpen(false);
        setFile(null);
        setProgress(0);
        return;
      }

      // 1. Oráculo: Marca D'água
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
      setProgress(30);

      // 2. Verdade Matemática: Hashing
      const hash = ethers.keccak256(new Uint8Array(modifiedPdfBytes));
      setProgress(50);

      // 3. Persistência: Upload para Supabase Storage
      toast.info("Salvando na Nuvem Segura...");
      const blob = new Blob([modifiedPdfBytes as any], { type: "application/pdf" });
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("atas-govchain")
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("atas-govchain")
        .getPublicUrl(fileName);

      setProgress(70);

      // 4. Verdade Eterna: Blockchain
      const signer = await ethers6Adapter.signer.toEthers({ 
        client, 
        chain, 
        account: account! 
      });

      toast.info("Conectando ao EAS (Ethereum Attestation Service)...");
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

      setProgress(100);
      toast.success("Documento blindado e salvo com sucesso!");
      
      // Notify parent
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
      setProgress(0);

    } catch (error) {
      console.error(error);
      toast.error("Falha no processo. Verifique conexão ou permissões.");
      setProgress(0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#50C878] hover:bg-[#40b068] gap-2 h-12 text-base font-semibold shadow-md">
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
            Envie a Ata ou Relatório para validação jurídica, armazenamento seguro e registro imutável.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="doc-type" className="text-slate-600 font-medium">Tipo de Documento</Label>
            <Input 
              id="doc-type" 
              value={docType} 
              onChange={(e) => setDocType(e.target.value)}
              className="border-slate-300 focus:border-[#50C878] focus:ring-[#50C878]" 
            />
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
                <div className="flex items-center gap-2 text-sm text-[#50C878] font-medium mt-1">
                    <FileCheck className="h-4 w-4" />
                    {file.name}
                </div>
            )}
          </div>

          {progress > 0 && (
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                    <span>Aplicando Tripla Blindagem e Armazenamento...</span>
                    <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-slate-100" />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button 
            onClick={processDocument} 
            disabled={!file || status === 'signing' || status === 'attesting'}
            className="bg-[#50C878] hover:bg-[#40b068] min-w-[140px]"
          >
            {(status === 'signing' || status === 'attesting') ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando
                </>
            ) : (
                <>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Blindar Agora
                </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
