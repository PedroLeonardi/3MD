// lib/api.js
import { toast } from "sonner";

export function getTokenFromCookie(ctx) {
  if (ctx && ctx.req) {
    const cookie = ctx.req.headers.cookie || "";
    const match = cookie.match(/(^|;)\s*token=([^;]*)/);
    return match ? match[2] : null;
  } else if (typeof window !== "undefined") {
    const match = document.cookie.match(/(^|;)\s*token=([^;]*)/);
    return match ? match[2] : null;
  }
  return null;
}

export async function apiFetch(path, options = {}) {
  const token = getTokenFromCookie();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  
  try {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}${path}`);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      ...options,
      headers,
    });

    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (response.status === 401) {
      toast.error("Sessão expirada. Faça login novamente.");
      document.cookie = "token=; Max-Age=0; path=/";
      return null;
    }

    if (!response.ok) {
      if (data?.message) {
        console.error(data.message);
        throw new Error(data.message);
      } else if (data?.errors) {
        console.error(data.errors);
        throw new Error(data.errors);
      } else {
        console.error(`Erro ${response.status}`);
        throw new Error(response.status);
      }
    }

    return data;
  } catch (err) {
    if (!err.handled) {
      console.error("Erro inesperado no apiFetch:", err);
    }
    return { error: true, message: err.message };
  }
}

// Atalhos para métodos comuns
export const api = {
  get: (path) => apiFetch(path),
  post: (path, body) =>
    apiFetch(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (path, body) =>
    apiFetch(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  del: (path) =>
    apiFetch(path, {
      method: "DELETE",
    }),
};
