"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Header from '@/components/ui/header';

export default function UserDashboard() {
  const router = useRouter(); 
  
  const [token, setToken] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem("authToken");
      setToken(storedToken);
      console.log("Token carregado no cliente:", storedToken ? storedToken.substring(0, 10) + '...' : 'Nenhum');
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchPerfil = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/auth/perfil', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} - Falha ao carregar perfil.`);
          }

          const data = await response.json();

          if (data.sucesso && data.dados) {
            setPerfil(data.dados);
          } else {
            throw new Error("Resposta da API com formato inesperado.");
          }

        } catch (error) {
          console.error("Erro ao buscar perfil:", error);
          setErro(error.message);
          
          if (error.message.includes('401')) {
              handleLogout(true); 
          }
        }
      };

      fetchPerfil();
    }
  }, [token]); 

  const handleLogout = (shouldRedirect = true) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("authToken");
      setToken(null);
      setPerfil(null);
      console.log("Logout realizado e token destruído.");

      if (shouldRedirect) {
        router.push('/'); 
      }
    }
  };


  const handleGoToCriar = () => {
    router.push('/criar');
  };

  const handleGoToEstoque = () => {
    router.push('/estoque');
  };

  const buttonStyle = {
    backgroundColor: '#007bff', 
    color: 'white', 
    padding: '10px 15px', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer',
    margin: '5px',
    fontWeight: 'bold',
  };

  const logoutButtonStyle = {
    ...buttonStyle, 
    backgroundColor: '#dc3545', 
    display: 'block', 
    marginTop: '15px',
  };


  return (
    <>
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <Header></Header>
        <h2>Dashboard do Usuário</h2>

        {!token && <p>❌ **Você não está logado!** Por favor, faça login.</p>}
        {token && !perfil && !erro && <p>⌛ Carregando perfil...</p>}
        {erro && <p style={{ color: 'red' }}>🚨 **Erro ao carregar perfil:** {erro}</p>}

        ---

        {perfil ? (
          <>
            <p> Olá, **{perfil.nome_usuario}**!</p>
          </>
        ) : (
          <p>Nome</p>
        )}

        ---
        
        <h3>Opções de Gerenciamento</h3>
        <div>
          <button 
            onClick={handleGoToCriar}
            style={buttonStyle}
          >
            ➕ Criar Novo Item
          </button>
          <button 
            onClick={handleGoToEstoque}
            style={buttonStyle}
          >
            📦 Visualizar Estoque
          </button>
        </div>
        
        ---

        <p>
          <button 
            onClick={handleLogout} 
            style={logoutButtonStyle}
          >
            Sair (Logout)
          </button>
        </p>
      </div>
    </>
  );
}