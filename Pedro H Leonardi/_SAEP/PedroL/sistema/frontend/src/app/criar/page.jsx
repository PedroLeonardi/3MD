"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/ui/header';


const API_URL = 'http://localhost:3001/api/produtos';

const INITIAL_STATE = {
    nome: '',
    descricao: '',
    unidade_medida: '',
    estoque_atual: 0,
    estoque_minimo: 0,
    data_validade: '', 
    caracteristica_variacao: ''
};

export default function CriarProdutoForm() {
    const router = useRouter();
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        let token = null;
        if (typeof window !== 'undefined') {
            token = localStorage.getItem("authToken");
        }

        if (!token) {
            setError("Token de autenticação não encontrado. Por favor, faça login.");
            setLoading(false);
            return;
        }

        const dataToSend = {
            nome: formData.nome,
            descricao: formData.descricao || null,
            unidade_medida: formData.unidade_medida,
            estoque_atual: parseInt(formData.estoque_atual) || 0,
            estoque_minimo: parseInt(formData.estoque_minimo) || 0,
            caracteristica_variacao: formData.caracteristica_variacao || null,
            
            data_validade: formData.data_validade || null 
        };
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Adiciona o Token Bearer no cabeçalho
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.erro || `Erro HTTP: ${response.status}`;
                throw new Error(errorMessage);
            }

            setSuccess(true);

            setTimeout(() => {
                router.push('/dahsboard');
            }, 1500); 

        } catch (err) {
            console.error("Erro ao criar produto:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Header></Header>
        <div style={styles.container}>
            
            <h2> Criar Novo Produto</h2>
            <hr style={styles.separator} />

            {loading && <p style={styles.message.info}>Enviando dados...</p>}
            {error && <p style={styles.message.error}>Erro: {error}</p>}
            {success && <p style={styles.message.success}>Produto criado com sucesso! Redirecionando...</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                
                <label style={styles.label}>
                    Nome do Produto: <span style={styles.required}>*</span>
                    <input 
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        style={styles.input}
                    />
                </label>

                <label style={styles.label}>
                    Unidade de Medida (ex: UNIDADE, KG, LT): <span style={styles.required}>*</span>
                    <input 
                        type="text"
                        name="unidade_medida"
                        value={formData.unidade_medida}
                        onChange={handleChange}
                        required
                        maxLength={20}
                        style={styles.input}
                    />
                </label>
                
                <label style={styles.label}>
                    Estoque Mínimo: <span style={styles.required}>*</span>
                    <input 
                        type="number"
                        name="estoque_minimo"
                        value={formData.estoque_minimo}
                        onChange={handleChange}
                        required
                        min="0"
                        style={styles.input}
                    />
                </label>

                <label style={styles.label}>
                    Estoque Atual:
                    <input 
                        type="number"
                        name="estoque_atual"
                        value={formData.estoque_atual}
                        onChange={handleChange}
                        min="0"
                        style={styles.input}
                    />
                </label>
                
                <label style={styles.label}>
                    Data de Validade:
                    <input 
                        type="date"
                        name="data_validade"
                        value={formData.data_validade}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </label>
                
                <label style={styles.label}>
                    Característica de Variação (ex: Tamanho, Cor):
                    <input 
                        type="text"
                        name="caracteristica_variacao"
                        value={formData.caracteristica_variacao}
                        onChange={handleChange}
                        maxLength={100}
                        style={styles.input}
                    />
                </label>

                <label style={styles.label}>
                    Descrição:
                    <textarea 
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        rows="4"
                        style={styles.textarea}
                    />
                </label>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={styles.button}
                >
                    {loading ? 'Aguarde...' : 'Criar Produto'}
                </button>
            </form>
        </div>
        </>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    separator: {
        border: '0',
        height: '1px',
        background: '#eee',
        margin: '15px 0',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '10px',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '14px',
    },
    input: {
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    textarea: {
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        resize: 'vertical',
    },
    button: {
        padding: '12px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
        fontSize: '16px',
    },
    required: {
        color: 'red',
        marginLeft: '4px',
    },
    message: {
        info: { color: 'blue', marginBottom: '10px' },
        error: { color: 'white', backgroundColor: '#dc3545', padding: '10px', borderRadius: '4px', marginBottom: '10px' },
        success: { color: 'white', backgroundColor: '#28a745', padding: '10px', borderRadius: '4px', marginBottom: '10px' },
    }
};