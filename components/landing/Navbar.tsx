"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { motion } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative h-12 w-12">
            <Image 
              src="/govchain-logo.png" 
              alt="GovChain Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${isScrolled ? "text-slate-900" : "text-slate-900"}`}>
            Gov.Chain
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#como-funciona" className="text-sm font-medium text-slate-600 hover:text-[#50C878] transition-colors">
            Como Funciona
          </Link>
          <Link href="#beneficios" className="text-sm font-medium text-slate-600 hover:text-[#50C878] transition-colors">
            Benefícios
          </Link>
          <Link href="/public" className="text-sm font-medium text-slate-600 hover:text-[#50C878] transition-colors">
            Transparência
          </Link>
          <Link href="/economy" className="text-sm font-medium text-slate-600 hover:text-[#50C878] transition-colors">
            Economia
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-[#50C878] transition-colors">
            Entrar
          </Link>
          <Button 
            asChild 
            size="sm" 
            className={`rounded-full font-semibold transition-all duration-300 ${
              isScrolled 
                ? "bg-[#50C878] hover:bg-[#40b068] text-white shadow-md shadow-emerald-200/50" 
                : "bg-slate-900 hover:bg-slate-800 text-white shadow-lg"
            }`}
          >
            <Link href="/kyc">
              Começar Agora
            </Link>
          </Button>
        </div>

        {/* Mobile Menu (Sheet) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 text-slate-600 hover:text-[#50C878] transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="mb-8 text-left">
                <SheetTitle className="flex items-center gap-2">
                  <div className="relative h-8 w-8">
                    <Image 
                      src="/govchain-logo.png" 
                      alt="GovChain Logo" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  Gov.Chain
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-6">
                <Link href="#como-funciona" className="text-lg font-medium text-slate-600 hover:text-[#50C878] transition-colors">
                  Como Funciona
                </Link>
                <Link href="#beneficios" className="text-lg font-medium text-slate-600 hover:text-[#50C878] transition-colors">
                  Benefícios
                </Link>
                <Link href="/public" className="text-lg font-medium text-slate-600 hover:text-[#50C878] transition-colors">
                  Transparência
                </Link>
                <Link href="/economy" className="text-lg font-medium text-slate-600 hover:text-[#50C878] transition-colors">
                  Economia
                </Link>
                <hr className="border-slate-100 my-2" />
                <Link href="/login" className="text-lg font-semibold text-slate-600 hover:text-[#50C878] transition-colors">
                  Entrar na Conta
                </Link>
                <Button asChild size="lg" className="w-full bg-[#50C878] hover:bg-[#40b068] text-white shadow-md shadow-emerald-200/50">
                  <Link href="/kyc">
                    Começar Agora
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
