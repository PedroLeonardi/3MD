"use client"

import { useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation" //NECESSARIO USAR O ROUTER NAVIGATION
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { SEGMENT_EXPLORER_SIMULATED_ERROR_MESSAGE } from "next/dist/next-devtools/userspace/app/segment-explorer-node"

export function LoginForm({
  className,
  ...props
}) {

  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log({ username, password });
    
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      // ALTERAR .-. 

      const data = await response.json()
      if (!response.ok) {
        throw new Error("ERRO AO FAZER LOGIN")
      }



      if (data.accessToken) {
        Cookies.set("token", data.accessToken), {
          expires: 1,
          secure: true, // FEITO PARA ACESSA A REQUISIÇÃO SER FEITA SOMENTE
                        // HTTP, PARA SEGURANÇA, USAR EM PRODUÇÃO
          sameSite: "strict"
        }
        alert("Login bem sucedido")
        router.push("/lista")
      }

      // CHAMAR O DOT ENV (.env)
    } catch (error) {

    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Entre na sua conta</CardTitle>
          <CardDescription>
            prencha os campos abaixo e entre na sua conta 
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">usuario</FieldLabel>
                <Input
                  id="username"
                  type="username"
                  placeholder="m@example.com" required
                  value={username}
                  onChange={(e) => { setUsername(e.target.value) }}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password" required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button">
                  Entrar com o google
                </Button>
                <FieldDescription className="text-center">
                  Não tem uma conta/ <a href="#">Criar</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
