// @/lib/api-server.server.js

import { cookies } from "next/headers";

async function apiFetchServer(path, options = {}) {
  const { skipAuth = false, ...fetchOptions } = options;
  const cookiesStore = await cookies();

  // Só busca o token se não for para pular autenticação
  const token = skipAuth ? null : cookiesStore.get("token")?.value;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Só adiciona Authorization se existir token
    ...fetchOptions.headers,
  };
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;

  console.log(`Fetching URL: ${url} with options:`, {
    method: fetchOptions.method || "GET",
    headers,
    body: fetchOptions.body,
  });

  const res = await fetch(url, {
    ...fetchOptions,
    headers,
    cache: "no-store",
  });

  if (!skipAuth && res.status === 401) {
    // throw new UnauthorizedError();
  }

  const data = await res.json();

  if (!skipAuth && res.status === 403 && data?.code === "PROFILE_INCOMPLETE") {
    // throw new ProfileIncompleteError();
  }

  if (!res.ok) {
    let errorMessage = "Erro na requisição do servidor.";
    try {
      const err = data;
      console.log(err);

      if (err?.message) errorMessage = err.message;
    } catch {
      // fallback
    }
    throw new Error(errorMessage);
  }

  return data;
}

export const apiServer = {
  // Métodos normais (com token por padrão)
  get: (path, options = {}) => apiFetchServer(path, options),
  post: (path, body, options = {}) =>
    apiFetchServer(path, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    }),
  put: (path, body, options = {}) =>
    apiFetchServer(path, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    }),
  del: (path, options = {}) =>
    apiFetchServer(path, {
      method: "DELETE",
      ...options,
    }),

  // Métodos sem autenticação
  public: {
    get: (path) => apiFetchServer(path, { skipAuth: true }),
    post: (path, body) =>
      apiFetchServer(path, {
        method: "POST",
        body: JSON.stringify(body),
        skipAuth: true,
      }),
  },
};
