"use client";

import { CheckCircle2, Circle, Loader2, ShieldCheck, FileDigit, Link } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  title: string;
  description: string;
  status: "waiting" | "active" | "completed";
  icon: React.ElementType;
}

interface TruthTimelineProps {
  currentStep: number; // 0 to 3
}

export function TruthTimeline({ currentStep }: TruthTimelineProps) {
  const steps: TimelineStep[] = [
    {
      title: "Verdade Material",
      description: "Digitalização e Marca D'água",
      status: currentStep > 0 ? "completed" : currentStep === 0 ? "active" : "waiting",
      icon: FileDigit,
    },
    {
      title: "Verdade Matemática",
      description: "Cálculo de Hash Único (SHA-256)",
      status: currentStep > 1 ? "completed" : currentStep === 1 ? "active" : "waiting",
      icon: Link,
    },
    {
      title: "Verdade Eterna",
      description: "Registro Imutável na Blockchain",
      status: currentStep > 2 ? "completed" : currentStep === 2 ? "active" : "waiting",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto py-4">
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-4 h-[80%] w-0.5 bg-slate-200" />
        
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-start gap-4">
              {/* Icon Bubble */}
              <div
                className={cn(
                  "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-all duration-500",
                  step.status === "completed"
                    ? "border-[#50C878] bg-emerald-50 text-[#50C878]"
                    : step.status === "active"
                    ? "border-blue-500 bg-blue-50 text-blue-600 ring-4 ring-blue-100"
                    : "border-slate-200 text-slate-300"
                )}
              >
                {step.status === "active" ? (
                   <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                   <step.icon className="h-6 w-6" />
                )}
                
                {step.status === "completed" && (
                    <div className="absolute -right-1 -bottom-1 bg-[#50C878] rounded-full p-0.5 border-2 border-white">
                        <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                )}
              </div>

              {/* Text Content */}
              <div className={cn("pt-1 transition-all duration-500", step.status === "waiting" && "opacity-50")}>
                <h3 className={cn("font-bold text-sm", 
                    step.status === "active" ? "text-blue-700" : 
                    step.status === "completed" ? "text-[#50C878]" : "text-slate-500"
                )}>
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
