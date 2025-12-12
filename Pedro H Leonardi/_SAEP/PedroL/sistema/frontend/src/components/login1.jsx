"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



const API_LOGIN_URL = "http://localhost:3001/api/auth/login";
const DASHBOARD_ROUTE = "/dashboard";
const AUTH_TOKEN_KEY = "authToken";

const Login1 = ({
  heading = "Login",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  buttonText = "Login",
  signupText = "Need an account?",
  signupUrl = "https://shadcnblocks.com"
}) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(API_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          senha,
        }),
      });

      const data = await response.json();

      if (response.ok && data.sucesso) {
        console.log("--------------------------",data.dados.token)
        if (data.dados.token) {
            localStorage.setItem(AUTH_TOKEN_KEY, data.dados.token);
            console.log("Token armazenado no localStorage:", data.dados.token);
        } 
        console.log(localStorage.getItem('AUTH_TOKEN_KEY'))
        router.push(DASHBOARD_ROUTE); 
        
      } else {
        const errorMessage = data.mensagem || "Ocorreu um erro desconhecido.";
        setError(errorMessage);
      }
    } catch (err) {
      console.error("Erro ao tentar conectar à API:", err);
      const networkError = "Não foi possível conectar ao servidor. Tente novamente mais tarde.";
      setError(networkError);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <a href={logo.url}>
            <img
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-10 dark:invert" />
          </a>
          
          <form
            onSubmit={handleSubmit}
            className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
            
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
            
            <Input
              type="email"
              placeholder="Email"
              className="text-sm"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            
            <Input
              type="password"
              placeholder="Password"
              className="text-sm"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            {/* Mensagem de Erro */}
            {error && (
              <p className="text-sm text-red-500 w-full text-left">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Carregando...' : buttonText}
            </Button>
          </form>
          {/* Link de Cadastro */}
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <a href={signupUrl} className="text-primary font-medium hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login1 };