"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-[#50C878] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-4 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              <Link 
                href="#como-funciona" 
                className="text-lg font-medium text-slate-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Como Funciona
              </Link>
              <Link 
                href="#beneficios" 
                className="text-lg font-medium text-slate-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Benefícios
              </Link>
              <Link 
                href="/public" 
                className="text-lg font-medium text-slate-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Transparência
              </Link>
              <hr className="border-slate-100" />
              <Link 
                href="/login" 
                className="text-lg font-semibold text-slate-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Entrar
              </Link>
              <Button asChild size="lg" className="w-full bg-[#50C878] hover:bg-[#40b068] text-white rounded-full shadow-lg">
                <Link href="/kyc" onClick={() => setIsMobileMenuOpen(false)}>
                  Começar Agora
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
