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
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

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
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">username</FieldLabel>
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
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
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
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
