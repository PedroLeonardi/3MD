import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero01 = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-3xl">
        {/* <Badge variant="secondary" className="rounded-full py-1 border-border" asChild>
          <Link href="#">
            A mais premiada do ano<ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Badge> */}
        <h1
          className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
          EMPRESA 
        </h1>
        <span className="mt-6 text-1xl sm:text-2xl md:text-3xl lg:text-4xl md:leading-[1.2]  tracking-tighter"> acompanhando o seu progresso</span>
        <p className="mt-6 md:text-lg">
          Desde 2024 auxuliando e desenvolvendo sistemas e meios de auxliar no seu progresso e organização, detemos de planos e opções 
          empresarias pessoais tudo com desconto para estudante
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            Cadastre-se <ArrowUpRight className="size-5" />
          </Button>
          <Link href="/login">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
            
            >
            <CirclePlay className="size-5" /> Login
          </Button>
              </Link> 
        </div>
      </div>
    </div>
  );
};

export default Hero01;
