"use client";

import { useState, useCallback } from "react";
import { useActiveAccount } from "thirdweb/react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { ethers } from "ethers";
import { useAttest } from "@/hooks/useAttest";
import { client, chain } from "@/lib/thirdweb";
import { ethers6Adapter } from "thirdweb/adapters/ethers6";
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
import { FileUp, ShieldCheck, Loader2, FileCheck } from "lucide-react";

export function DocumentUploader({ onAttestationComplete }: { onAttestationComplete: (data: any) => void }) {
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
    if (!file || !account) return;

    try {
      setProgress(10);
      toast.info("Iniciando processamento seguro...");

      // 1. Load and Modify PDF
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width } = firstPage.getSize();
      
      const dateStr = new Date().toLocaleString("pt-BR");
      const watermarkText = `Assinado Digitalmente: ${account.address.slice(0, 8)}... | Data: ${dateStr}`;

      firstPage.drawText(watermarkText, {
        x: 50,
        y: 20,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0.5, 0), // Dark Green
      });

      const modifiedPdfBytes = await pdfDoc.save();
      setProgress(40);

      // 2. Generate Hash
      const hash = ethers.keccak256(new Uint8Array(modifiedPdfBytes));
      setProgress(60);

      // 3. Convert Thirdweb account to Ethers Signer
      const signer = await ethers6Adapter.signer.toEthers({ 
        client, 
        chain, 
        account 
      });

      // 4. Attest on Blockchain
      toast.info("Registrando no Cartório Digital (Blockchain)...");
      const uid = await attestDocument(signer as any, hash, docType);
      
      setProgress(100);
      toast.success("Documento registrado com sucesso!");
      
      // Notify parent
      onAttestationComplete({
        fileName: file.name,
        uid,
        timestamp: new Date().toISOString(),
        hash,
        status: "Registrado"
      });

      setIsOpen(false);
      setFile(null);
      setProgress(0);

    } catch (error) {
      console.error(error);
      toast.error("Falha na conexão com o Cartório Digital. Tente novamente.");
      setProgress(0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#50C878] hover:bg-[#40b068] gap-2">
          <FileUp className="h-4 w-4" />
          Nova Ata de Reunião
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#50C878]" />
            Registro de Documento
          </DialogTitle>
          <DialogDescription>
            Faça upload da Ata para assinatura digital e registro imutável.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="doc-type">Tipo de Documento</Label>
            <Input 
              id="doc-type" 
              value={docType} 
              onChange={(e) => setDocType(e.target.value)} 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="file">Arquivo PDF</Label>
            <div className="flex items-center gap-2 border rounded-md p-2 bg-slate-50">
                <Input 
                    id="file" 
                    type="file" 
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="cursor-pointer border-0 bg-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
            </div>
          </div>

          {progress > 0 && (
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                    <span>Processando...</span>
                    <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button 
            onClick={processDocument} 
            disabled={!file || status === 'signing' || status === 'attesting'}
            className="bg-[#50C878] hover:bg-[#40b068]"
          >
            {(status === 'signing' || status === 'attesting') ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando
                </>
            ) : (
                <>
                    <FileCheck className="mr-2 h-4 w-4" />
                    Assinar e Registrar
                </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
