"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Box, Hash, Clock, CheckCircle2, Shield, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types for our simulation
interface Transaction {
  hash: string;
  type: "CERTIFICATION" | "KYC_VERIFICATION" | "SPLIT_PAYMENT" | "GOVERNANCE_VOTE";
  status: "CONFIRMED" | "PENDING";
  block: number;
  timestamp: string;
  from: string;
  details: string;
}

const MOCK_WALLETS = [
  "0x71C...9A21", "0x3D2...B4C5", "0x9F1...E2D3", "0xA4B...5C6D", "0xGov...Admin"
];

const ACTION_TYPES = {
  CERTIFICATION: { label: "Certificação de Origem", color: "text-emerald-400", icon: Shield },
  KYC_VERIFICATION: { label: "Validação de Identidade", color: "text-blue-400", icon: CheckCircle2 },
  SPLIT_PAYMENT: { label: "Pagamento Automático (Split)", color: "text-amber-400", icon: Activity },
  GOVERNANCE_VOTE: { label: "Voto em Assembleia", color: "text-purple-400", icon: Box },
};

export function GemlabExplorer() {
  const [blocks, setBlocks] = useState<number>(18293000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize with some data
  useEffect(() => {
    setIsConnected(true);
    const initialTx: Transaction[] = Array.from({ length: 5 }).map((_, i) => generateMockTx(18293000 - i));
    setTransactions(initialTx);
  }, []);

  // Simulate Live Network Activity
  useEffect(() => {
    const interval = setInterval(() => {
      // 30% chance of new block/tx every second
      if (Math.random() > 0.7) {
        setBlocks(prev => prev + 1);
        const newTx = generateMockTx(blocks + 1);
        setTransactions(prev => [newTx, ...prev].slice(0, 10)); // Keep last 10
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [blocks]);

  const generateMockTx = (blockNum: number): Transaction => {
    const types = Object.keys(ACTION_TYPES) as Array<keyof typeof ACTION_TYPES>;
    const type = types[Math.floor(Math.random() * types.length)];
    const randomHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    
    return {
      hash: randomHash,
      type,
      status: "CONFIRMED",
      block: blockNum,
      timestamp: new Date().toLocaleTimeString(),
      from: MOCK_WALLETS[Math.floor(Math.random() * MOCK_WALLETS.length)],
      details: type === "CERTIFICATION" ? `Esmeralda #${Math.floor(Math.random() * 9999)}` : "Registro Imutável"
    };
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-mono text-sm">
      {/* Network Status Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-400 gap-4">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                <span className="font-semibold text-slate-200">BASE SEPOLIA</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-2">
                <Box className="h-4 w-4" />
                <span>Bloco: <span className="text-blue-400">#{blocks}</span></span>
            </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
                <Activity className="h-3 w-3" /> Gas: <span className="text-amber-400">0.001 Gwei</span>
            </span>
            <span className="flex items-center gap-1">
                <Globe className="h-3 w-3" /> EAS Protocol: <span className="text-emerald-400">Online</span>
            </span>
        </div>
      </div>

      {/* Main Explorer View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Transactions Feed */}
        <Card className="lg:col-span-2 bg-slate-950 border-slate-800 shadow-xl">
            <CardHeader className="border-b border-slate-900 pb-4">
                <CardTitle className="text-slate-200 flex items-center gap-2">
                    <Hash className="h-5 w-5 text-emerald-500" />
                    Feed de Transações (Live)
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                    <div className="divide-y divide-slate-900">
                        <AnimatePresence initial={false}>
                            {transactions.map((tx) => {
                                const ActionIcon = ACTION_TYPES[tx.type].icon;
                                return (
                                    <motion.div
                                        key={tx.hash}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="p-4 hover:bg-slate-900/50 transition-colors flex items-center justify-between group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 p-2 rounded-md bg-slate-900 border border-slate-800 group-hover:border-slate-700">
                                                <ActionIcon className={`h-4 w-4 ${ACTION_TYPES[tx.type].color}`} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`font-bold ${ACTION_TYPES[tx.type].color}`}>
                                                        {ACTION_TYPES[tx.type].label}
                                                    </span>
                                                    <Badge variant="outline" className="border-slate-700 text-slate-500 text-[10px] h-5">
                                                        {tx.status}
                                                    </Badge>
                                                </div>
                                                <div className="text-slate-500 text-xs flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                                    <span className="truncate max-w-[120px]">Hash: {tx.hash.slice(0, 10)}...</span>
                                                    <span className="hidden sm:inline text-slate-700">•</span>
                                                    <span>De: {tx.from}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right text-xs text-slate-600">
                                            <div className="flex items-center justify-end gap-1 mb-1">
                                                <Clock className="h-3 w-3" />
                                                {tx.timestamp}
                                            </div>
                                            <div className="text-blue-500/60">Bk #{tx.block}</div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>

        {/* Stats & Info */}
        <div className="space-y-6">
            <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-slate-200 text-sm">Metricas da Rede</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="text-slate-500 text-xs mb-1">Total de Ativos RWA</div>
                        <div className="text-2xl font-bold text-white">1,205</div>
                    </div>
                    <div>
                        <div className="text-slate-500 text-xs mb-1">Volume Transacionado (24h)</div>
                        <div className="text-2xl font-bold text-emerald-400">R$ 4.2M</div>
                    </div>
                    <div>
                        <div className="text-slate-500 text-xs mb-1">Validadores Ativos</div>
                        <div className="text-2xl font-bold text-blue-400">12</div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-emerald-950/30 border-emerald-900/50">
                <CardContent className="p-4">
                    <h4 className="text-emerald-400 font-bold mb-2">Por que Blockchain?</h4>
                    <p className="text-emerald-200/60 text-xs leading-relaxed">
                        Ao contrário de um banco de dados comum, o GovChain usa a Base (Ethereum L2) para garantir que ninguém - nem mesmo a diretoria - possa alterar um registro passado.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
