import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fingerprint, Microscope, ShieldCheck, QrCode, Activity } from "lucide-react";

interface GemLabCertificateProps {
    assetId: string;
    mineral: string;
    origin: string;
    spectralHash: string;
    weight: string;
    valueUsd: number;
    imageUrl?: string;
    description?: string;
}

export function GemLabCertificate({ assetId, mineral, origin, spectralHash, weight, valueUsd, imageUrl, description }: GemLabCertificateProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card className="w-full max-w-md bg-white border border-slate-200 shadow-xl overflow-hidden relative group">
            {/* Holographic Strip Effect */}
            <div className="h-2 w-full bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 animate-pulse" />
            
            <CardHeader className="pb-2 border-b border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Microscope className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-sm font-bold tracking-widest text-slate-800">GEMLAB CERTIFIED</CardTitle>
                    </div>
                    <Badge variant="outline" className="font-mono text-[10px] border-blue-200 text-blue-700 bg-blue-50">
                        Raman Verified
                    </Badge>
                </div>
            </CardHeader>
            
            <CardContent className="p-0">
                <div className="relative aspect-square bg-slate-900 flex items-center justify-center overflow-hidden">
                    {imageUrl ? (
                        <img src={imageUrl} alt={mineral} className="object-cover w-full h-full opacity-90 transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                        <div className="text-center p-8">
                            <div className="h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            <Fingerprint className="h-24 w-24 text-emerald-500/50 mx-auto relative z-10" />
                        </div>
                    )}
                    
                    {/* HUD Overlay (Scientific Data) */}
                    <div 
                        className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {/* Top Right Data Block */}
                        <div className="absolute top-4 right-4 text-right">
                            <div className="bg-black/60 backdrop-blur-md border border-emerald-500/30 p-2 rounded-sm inline-block mb-2 transform translate-x-0 transition-transform duration-500 ease-out">
                                <p className="text-[8px] text-emerald-400 uppercase tracking-widest mb-0.5">Formula</p>
                                <p className="text-xs font-mono text-white">Be₃Al₂Si₆O₁₈</p>
                            </div>
                            <div className="clear-both"></div>
                            <div className="bg-black/60 backdrop-blur-md border border-emerald-500/30 p-2 rounded-sm inline-block transform translate-x-0 transition-transform duration-500 delay-75 ease-out">
                                <p className="text-[8px] text-emerald-400 uppercase tracking-widest mb-0.5">Crystal System</p>
                                <p className="text-xs font-mono text-white">Hexagonal</p>
                            </div>
                        </div>

                        {/* Top Left Data Block */}
                        <div className="absolute top-4 left-4 text-left">
                            <div className="bg-black/60 backdrop-blur-md border border-emerald-500/30 p-2 rounded-sm inline-block mb-2">
                                <p className="text-[8px] text-emerald-400 uppercase tracking-widest mb-0.5">Hardness (Mohs)</p>
                                <p className="text-xs font-mono text-white">7.5 - 8.0</p>
                            </div>
                            <div className="clear-both"></div>
                            <div className="bg-black/60 backdrop-blur-md border border-emerald-500/30 p-2 rounded-sm inline-block">
                                <p className="text-[8px] text-emerald-400 uppercase tracking-widest mb-0.5">Refractive Index</p>
                                <p className="text-xs font-mono text-white">1.577 - 1.583</p>
                            </div>
                        </div>

                        {/* Center Grid/Target */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <div className="w-48 h-48 border border-emerald-500/50 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="w-40 h-40 border border-emerald-500/30 rounded-full absolute animate-[spin_15s_linear_infinite_reverse]" />
                            <div className="absolute w-full h-[1px] bg-emerald-500/20" />
                            <div className="absolute h-full w-[1px] bg-emerald-500/20" />
                        </div>
                    </div>

                    {/* Interactive Spectral Overlay */}
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 text-xs font-mono text-emerald-400 border-t border-emerald-500/30 transition-all duration-300 ease-in-out z-30 cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => setIsHovered(!isHovered)}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-slate-400 flex items-center gap-1">
                                <Activity className="h-3 w-3" />
                                SpectralHash:
                            </span>
                            <span className={`transition-all duration-300 ${isHovered ? 'w-auto opacity-100 text-[10px] break-all' : 'truncate max-w-[120px]'}`}>
                                {spectralHash}
                            </span>
                        </div>
                        
                        {/* Dynamic Spectral Graph (Raman) */}
                        <div className="h-8 w-full bg-slate-900/50 rounded-sm relative overflow-hidden border border-emerald-500/20">
                            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="spectralGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#34d399" stopOpacity="0.1" />
                                    </linearGradient>
                                </defs>
                                {/* Simulated Raman Spectrum for Beryl/Emerald */}
                                <path 
                                    d="M0,40 L5,38 L10,39 L15,20 L20,38 L25,39 L30,30 L35,38 L40,39 L45,10 L50,35 L55,38 L60,39 L65,25 L70,38 L75,39 L80,15 L85,38 L90,39 L95,35 L100,40 Z" 
                                    fill="url(#spectralGradient)" 
                                    stroke="#34d399" 
                                    strokeWidth="1"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </svg>
                            {/* Scanning Line Animation - Speeds up on hover */}
                            <div className={`absolute top-0 bottom-0 w-[1px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] ${isHovered ? 'animate-[scan_0.5s_ease-in-out_infinite]' : 'animate-[scan_2s_ease-in-out_infinite]'}`} />
                            
                            {/* Interactive Peak Markers */}
                            <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="absolute left-[45%] top-[25%] -translate-x-1/2 flex flex-col items-center">
                                    <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_5px_white]" />
                                    <span className="text-[6px] text-slate-900 bg-white/90 px-1 rounded-sm mt-1 font-bold">685 cm⁻¹</span>
                                </div>
                                <div className="absolute left-[80%] top-[35%] -translate-x-1/2 flex flex-col items-center">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_5px_#6ee7b7]" />
                                    <span className="text-[6px] text-slate-900 bg-emerald-200/90 px-1 rounded-sm mt-1 font-bold">1068 cm⁻¹</span>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info on Hover */}
                        <div className={`grid transition-all duration-300 ease-in-out ${isHovered ? 'grid-rows-[1fr] mt-2 opacity-100' : 'grid-rows-[0fr] mt-0 opacity-0'}`}>
                            <div className="overflow-hidden">
                                <p className="text-[10px] text-emerald-300 leading-tight">
                                    <span className="font-bold text-white">Signature Verified:</span> Beryl/Emerald structure confirmed via 532nm laser excitation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-slate-400 text-xs uppercase tracking-wider">Asset ID</p>
                            <p className="font-mono font-bold text-slate-700">{assetId}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 text-xs uppercase tracking-wider">Origin</p>
                            <p className="font-medium text-slate-700">{origin}</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs uppercase tracking-wider">Mineral</p>
                            <p className="font-medium text-slate-700">{mineral}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 text-xs uppercase tracking-wider">Weight</p>
                            <p className="font-medium text-slate-700">{weight}</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-emerald-600" />
                            <span className="text-xs text-slate-600 font-medium">Compliance (EAS #5)</span>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
                            CFEM Paid
                        </Badge>
                    </div>

                    {description && (
                        <div className="bg-slate-900/5 p-3 rounded-lg border border-slate-200/60">
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Expert Remarks</p>
                            <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
                                "{description}"
                            </p>
                        </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex justify-between items-end">
                        <div>
                            <p className="text-[10px] text-slate-400">Estimated Value (Export)</p>
                            <p className="text-2xl font-bold text-slate-900">US$ {valueUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <QrCode className="h-8 w-8 text-slate-300" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
