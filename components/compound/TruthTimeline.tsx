"use client";

import { CheckCircle2, FileText, PenTool, ShieldCheck, Clock } from "lucide-react";

interface TimelineEvent {
  title: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  status: "completed" | "pending";
}

export function TruthTimeline({ createdAt, signedAt, attestedAt, uid }: { createdAt: string, signedAt?: string, attestedAt?: string, uid?: string }) {
  const events: TimelineEvent[] = [
    {
      title: "Documento Criado",
      date: new Date(createdAt).toLocaleString(),
      description: "Upload realizado no Oráculo de Origem.",
      icon: <FileText className="h-4 w-4" />,
      status: "completed",
    },
    {
      title: "Assinado Legalmente",
      date: signedAt ? new Date(signedAt).toLocaleString() : "Pendente",
      description: "Autenticado via Gov.br (ICP-Brasil).",
      icon: <PenTool className="h-4 w-4" />,
      status: signedAt ? "completed" : "pending",
    },
    {
      title: "Eternizado na Blockchain",
      date: attestedAt ? new Date(attestedAt).toLocaleString() : "Pendente",
      description: uid ? `UID: ${uid.slice(0, 10)}...` : "Aguardando registro EAS.",
      icon: <ShieldCheck className="h-4 w-4" />,
      status: attestedAt ? "completed" : "pending",
    },
  ];

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
      {events.map((event, index) => (
        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            {event.status === "completed" ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
          </div>
          
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <div className="font-bold text-slate-900">{event.title}</div>
              <time className="font-mono text-xs text-slate-500">{event.date}</time>
            </div>
            <div className="text-slate-500 text-sm">
              {event.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
