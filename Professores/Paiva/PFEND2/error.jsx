"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import NavBar from "@/components/blocks/navbar";
import Footer2 from "@/components/blocks/footers";

export default function GlobalError({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <NavBar />
      <main className="h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="flex flex-col items-center gap-4 max-w-md">
          <AlertTriangle className="w-12 h-12 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">
            Opa! Algo deu errado
          </h2>
          <p className="text-muted-foreground">
            {error.message ||
              "Ocorreu um erro inesperado. Por favor, tente novamente."}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              Voltar
            </Button>
            <Button onClick={() => reset()}>Tentar novamente</Button>
          </div>
        </div>
      </main>
      <Footer2 />
    </>
  );
}
