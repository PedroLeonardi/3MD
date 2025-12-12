'use client'

import React, { useEffect, useState } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
import { Hero7 } from "@/components/blocks/Hero";
import { Contact7 } from "@/components/blocks/Contact";
import Timeline from "@/components/blocks/Timeline/comp-541";

export default function App() {

  const [api, setApi] = useState(null);

  const reviews = [
    {
      id: "1",
      photo: "https://github.com/shadcn.png",
      author: "João Silva",
      text: "Produto excelente! Chegou rápido e bem embalado.",
    },
    {
      id: "2",
      photo: "https://github.com/shadcn.png",
      author: "Maria Oliveira",
      text: "Muito bom, mas esperava um pouco mais de qualidade no acabamento.",
    },
    {
      id: "3",
      photo: "https://github.com/shadcn.png",
      author: "Pedro Santos",
      text: "Superou as expectativas! Recomendo muito.",
    },
  ];

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      const scrollSnaps = api.scrollSnapList();
      const selected = api.selectedScrollSnap();
      const nextIndex = (selected + 1) % scrollSnaps.length;
      api.scrollTo(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <>
      {/* HEADER */}
      <header className="flex flex-col md:flex-row bg-slate-100 items-center justify-between px-4 py-2">
        <div className="flex justify-center items-center mb-2 md:mb-0">
          <Avatar className={"h-12 w-12"}>
            <AvatarImage src="/logo-zenith.png" />
            <AvatarFallback>ZN</AvatarFallback>
          </Avatar>
        </div>

        <NavigationMenu className={"bg-slate-100 dark:bg-gray-900"}>
          <NavigationMenuList className="flex flex-wrap gap-2 md:gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Button className="bg-slate-100 dark:bg-gray-900 text-black shadow-none">Home</Button>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-slate-100 dark:bg-gray-900">Serviços</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Serviços Empresariais</NavigationMenuLink>
                <NavigationMenuLink>Serviços Pessoais</NavigationMenuLink>
                <NavigationMenuLink>Consultorias</NavigationMenuLink>
                <NavigationMenuLink>Comprar</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-slate-100 dark:bg-gray-900">Produtos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Adquirir</NavigationMenuLink>
                <NavigationMenuLink>Descrição</NavigationMenuLink>
                <NavigationMenuLink>Comprar</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-neutral-100 dark:bg-gray-900">Sobre Nós</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Nossa história</NavigationMenuLink>
                <NavigationMenuLink>Trabalhe Conosco</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <div className="container mx-auto"><Hero7 /></div>

      {/* BANNER */}
      <div className="w-full mt-5">
        <img src="/banner.png" className="w-full object-cover" alt="Banner" />
      </div>

      {/* DESCRITIVO */}
      <div className="flex flex-col gap-10 mt-10 px-4 md:px-10 py-10 bg-slate-100 dark:bg-gray-900">

        {/* Linha 1 */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img src="/homen-calendario.jpg" className="w-full md:w-1/2 h-60 rounded-2xl object-cover" />
          <div className="max-w-lg text-lg bg-gray-300 py-4 px-3 rounded-md">
            A Zenith permite que equipes visualizem prazos, eventos e metas em um calendário compartilhado,
            trazendo mais clareza, organização e alinhamento para a rotina de trabalho.
          </div>
        </div>

        {/* Linha 2 */}
        <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
          <img src="/scrum.jpg" className="w-full md:w-1/2 h-60 rounded-2xl object-cover" />
          <div className="max-w-lg text-lg bg-gray-300 py-4 px-3 rounded-md">
            Nosso sistema oferece painéis de tarefas com suporte a Kanban e Scrum, facilitando a gestão de fluxos,
            o acompanhamento de sprints e a colaboração entre times ágeis.
          </div>
        </div>

        {/* Linha 3 */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img src="/relatorios.jpg" className="w-full md:w-1/2 h-60 rounded-2xl object-cover" />
          <div className="max-w-lg text-lg bg-gray-300 py-4 px-3 rounded-md">
            A Zenith transforma dados operacionais em relatórios claros e acionáveis. Acompanhe produtividade,
            prazos cumpridos e desempenho por equipe ou projeto, com insights que ajudam na tomada de decisões estratégicas.
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-10">  {/* PRODUCTS*/}
        <div className="grid gap-15 grid-cols-1 mx-10 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Plano Essencial</CardTitle>
              <CardDescription>Organização simples para o dia a dia</CardDescription>
              <CardAction>Ver Mais</CardAction>
            </CardHeader>
            <CardContent>
            <img src="/plano-base.jfif" className="w-full" alt="" />
            
              <p>Ideal para quem está começando, esse plano oferece ferramentas básicas de controle de tarefas, calendário pessoal e lembretes automáticos. Perfeito para manter sua rotina organizada sem complicações.</p>
            </CardContent>

          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Plano Avançado</CardTitle>
              <CardDescription>Produtividade em outro nível</CardDescription>
              <CardAction>Ver Mais</CardAction>
            </CardHeader>
            <CardContent>
            <img src="/plano-avancado.jpg" className="w-full" alt="" />

            <p>Com recursos de análise de hábitos, metas personalizadas e integração com aplicativos externos, este plano ajuda você a acompanhar sua evolução e aumentar seu desempenho pessoal e profissional.</p>
            </CardContent>

          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Plano Premium</CardTitle>
              <CardDescription>Bem-estar completo com inteligência</CardDescription>
              <CardAction>Ver Mais</CardAction>
            </CardHeader>
            <CardContent> 
            <img src="/plano-premium.jpg"  className="w-full" alt="" />

            <p>Uma solução completa que une organização, produtividade e bem-estar. Inclui relatórios detalhados, suporte prioritário, insights baseados em inteligência artificial e acompanhamento personalizado para alcançar seus maiores objetivos.</p>
            </CardContent>

          </Card>

        </div>
      </div>

      {/* COMENTÁRIOS */}
      <div className="bg-slate-100 py-10 w-full mt-10 px-4">
        <div className="w-full max-w-md mx-auto">
          <Carousel loop={true} setApi={setApi}>
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem
                  key={review.id}
                  className="basis-full flex justify-center px-2"
                >
                  <div className="bg-white shadow-md rounded-lg p-6 w-full">
                    <div className="flex items-center mb-2">
                      <Avatar>
                        <AvatarImage src={review.photo} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="font-bold ms-3 text-lg">{review.author}</div>
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className=" justify-between mt-4 hidden sm:flex">
              <CarouselPrevious className="px-3 py-1 bg-gray-200 rounded">{"<"}</CarouselPrevious>
              <CarouselNext className="px-3 py-1 bg-gray-200 rounded">{">"}</CarouselNext>
            </div>
          </Carousel>
        </div>
      </div>

<div className="container mx-auto mt-25"><Timeline/></div>
      
      <div className="w-full">
      <div className="container mx-auto"><Contact7 /></div>
      </div>
      
      
      {/* FOOTER */}
      <footer className="w-full bg-slate-100 mt-10 flex flex-col gap-4 px-4 py-6  md:h-40 text-center  md:text-left">
        <div className="flex flex-col md:flex-row md:justify-center gap-6 ">
          <div className="md:text-end">
            <div>Sobre a Zenith</div>
            <div>Carreiras</div>
            <div>Contato corporativo</div>
          </div>
          <Separator orientation="vertical" className="hidden md:flex my-4 bg-black" />
          <div className="md:text-start">
            <div>Soluções para equipes</div>
            <div>Termos de serviço</div>
            <div>Política de privacidade</div>
          </div>
        </div>
        <div className="text-sm mx-auto ">Todos os direitos reservados a Zenith &copy; 2025</div>

      </footer>
    </>
  )
}

