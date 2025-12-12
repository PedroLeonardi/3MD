"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch, FaEdit, FaExchangeAlt, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Header from '@/components/ui/header';


const API_URL = 'http://localhost:3001/api/produtos';

const initialModalState = {
  isOpen: false,
  type: null, 
  product: null,
};

const initialPaginationState = {
    pagina: 1,
    limite: 10,
    total: 0,
    totalPaginas: 1,
};


export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState(initialModalState);
  const [pagination, setPagination] = useState(initialPaginationState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);
    // VÍCIO DE CÓDIGO: ESSA LINHA ESTAVA FALTANDO E CAUSAVA O 'ReferenceError'
    const [modalError, setModalError] = useState(null); 
    
  const fetchProducts = useCallback(async (page = 1, search = '') => {
    setLoading(true);
    setError(null);

    let token = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;

    if (!token) {
        setError("Token de autenticação não encontrado. Faça login novamente.");
        setLoading(false);
        return;
    }

    const url = new URL(API_URL);
    url.searchParams.append('pagina', page);
    url.searchParams.append('limite', pagination.limite);
    if (search) {
        url.searchParams.append('q', search); 
    }

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.mensagem || `Erro HTTP: ${response.status}`);
        }

        const result = await response.json();
        setProducts(result.dados || []); 
        setPagination(result.paginacao || initialPaginationState); 

    } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError(err.message || "Não foi possível carregar os produtos.");
    } finally {
        setLoading(false);
    }
  }, [pagination.limite]);


  useEffect(() => {
    fetchProducts(pagination.pagina, searchTerm); 
  }, [pagination.pagina, searchTerm, fetchProducts]);


  const handlePageChange = (newPage) => {
      if (newPage > 0 && newPage <= pagination.totalPaginas) {
          setPagination(prev => ({ ...prev, pagina: newPage }));
      }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (pagination.pagina !== 1) {
        setPagination(prev => ({ ...prev, pagina: 1 })); 
    } else {
        fetchProducts(1, searchTerm);
    }
  };


  const openModal = (type, product) => {
    setModal({ isOpen: true, type, product });
    setModalError(null); 
    setLoadingModal(false); 
  };

  const closeModal = (shouldRefresh = false) => {
    setModal(initialModalState);
    setModalError(null); // Limpa o erro ao fechar o modal
    if (shouldRefresh) {
        fetchProducts(pagination.pagina, searchTerm); 
    }
  };
  
  const handleMoveStock = async (productId, type, quantity) => {
    setLoadingModal(true);
    setModalError(null);
    
    let token = localStorage.getItem("authToken");

    const moveApiUrl = `${API_URL}/${productId}/estoque`; 

    try {
        const response = await fetch(moveApiUrl, {
            method: 'POST', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                tipo: type,
                quantidade: parseInt(quantity) 
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.mensagem || "Falha na movimentação do estoque.");
        }
        
        alert(`Estoque movimentado com sucesso!`);
        closeModal(true);
    } catch (err) {
        console.error("Erro ao movimentar estoque:", err);
        setModalError(err.message || "Erro desconhecido ao movimentar estoque.");
    } finally {
        setLoadingModal(false);
    }
  };


  const handleEditProduct = async (productId, newData) => {
    setLoadingModal(true);
    setModalError(null);

    let token = localStorage.getItem("authToken");
    const putApiUrl = `${API_URL}/${productId}`;

    try {
        const response = await fetch(putApiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.detalhes ? errorData.detalhes.map(d => d.mensagem).join(' | ') : (errorData.mensagem || `Erro HTTP: ${response.status}`);
            throw new Error(errorMessage);
        }
        
        alert(`Produto ID ${productId} atualizado com sucesso!`);
        closeModal(true);
    } catch (err) {
        console.error("Erro ao editar produto:", err);
        setModalError(err.message || "Erro desconhecido ao editar produto.");
    } finally {
        setLoadingModal(false);
    }
  };


  return (
    <>
    <Header></Header>
    <div style={styles.container}>

      <h2>Inventário de Produtos</h2>
      <hr style={styles.separator} />

      <form onSubmit={handleSearchSubmit} style={styles.searchContainer}>
        <FaSearch style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Buscar por nome, descrição ou variação..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button type="submit" style={styles.searchButton}>Buscar</button>
      </form>

      {loading && <p style={styles.statusMessage.info}>⌛ Carregando produtos...</p>}
      {error && <p style={styles.statusMessage.error}>🚨 Erro ao carregar: {error}</p>}
      
      {!loading && !error && (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Nome / Variação</th>
                <th style={styles.th}>Estoque</th>
                <th style={styles.th}>Mínimo</th>
                <th style={styles.th}>Unidade</th>
                <th style={styles.th}>Validade</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map(product => (
                  <tr key={product.id_produto} style={product.estoque_atual < product.estoque_minimo ? styles.lowStockRow : {}}>
                    <td style={styles.td}>{product.id_produto}</td>
                    <td style={styles.td}>
                      **{product.nome}**
                      <br />
                      <small>Variação: {product.caracteristica_variacao || 'N/A'}</small>
                    </td>
                    <td style={styles.td}>
                      {product.estoque_atual}
                      {product.estoque_atual < product.estoque_minimo && <span style={{ color: 'red', marginLeft: '5px', fontWeight: 'bold' }}> (BAIXO)</span>}
                    </td>
                    <td style={styles.td}>{product.estoque_minimo}</td>
                    <td style={styles.td}>{product.unidade_medida}</td>
                    <td style={styles.td}>
                        {product.data_validade ? new Date(product.data_validade).toLocaleDateString() : 'N/A'}
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => openModal('movimentar', product)}
                        style={styles.actionButton.move}
                        title="Movimentar Estoque"
                      >
                        <FaExchangeAlt /> Movimentar
                      </button>
                      <button
                        onClick={() => openModal('editar', product)}
                        style={styles.actionButton.edit}
                        title="Editar Produto"
                      >
                        <FaEdit /> Editar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" style={styles.td}>Nenhum produto encontrado.</td></tr>
              )}
            </tbody>
          </table>
          
          {pagination.totalPaginas > 1 && (
              <PaginationControls 
                  pagination={pagination}
                  handlePageChange={handlePageChange}
              />
          )}
        </>
      )}

      {modal.isOpen && modal.product && (
        <Modal 
          modal={modal} 
          closeModal={closeModal} 
          handleMoveStock={handleMoveStock}
          handleEditProduct={handleEditProduct}
          loadingModal={loadingModal}
          modalError={modalError}
        />
      )}
    </div>
    </>
  );
}


function Modal({ modal, closeModal, handleMoveStock, handleEditProduct, loadingModal, modalError }) {
    const [quantity, setQuantity] = useState(1);
    const [moveType, setMoveType] = useState('inserir');
    
    const [editData, setEditData] = useState({
        nome: modal.product.nome,
        descricao: modal.product.descricao || '',
        unidade_medida: modal.product.unidade_medida,
        estoque_minimo: modal.product.estoque_minimo,
        data_validade: modal.product.data_validade ? modal.product.data_validade.substring(0, 10) : '', 
        caracteristica_variacao: modal.product.caracteristica_variacao || '',
    });
  
    const product = modal.product;

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleStockSubmit = (e) => {
        e.preventDefault();
        handleMoveStock(product.id_produto, moveType, quantity);
    };
    
    const handleEditSubmit = (e) => {
        e.preventDefault();
        
        const novoEstoqueMinimo = parseInt(editData.estoque_minimo);
        
        if (novoEstoqueMinimo > product.estoque_atual) {
            const confirmacao = window.confirm(
                `Atenção! O novo Estoque Mínimo (${novoEstoqueMinimo}) é MAIOR que o Estoque Atual (${product.estoque_atual}). Deseja continuar com a alteração?`
            );
            if (!confirmacao) {
                return; 
            }
        }
        
        const dataToSend = {
            ...editData,
            estoque_minimo: novoEstoqueMinimo, 
            data_validade: editData.data_validade || null, 
        };
        handleEditProduct(product.id_produto, dataToSend);
    };
  
    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <button onClick={() => closeModal(false)} style={styles.modalCloseButton}><FaTimes /></button>
          
          <h3>
            {modal.type === 'movimentar' ? 'Movimentar Estoque' : 'Editar Produto'} - {product.nome}
          </h3>
          <p>Estoque Atual: **{product.estoque_atual} {product.unidade_medida}**</p>
  
          {modalError && <p style={styles.statusMessage.error}>🚨 Erro: {modalError}</p>}

          <hr />
  
          {/* Formulário de Movimentação */}
          {modal.type === 'movimentar' && (
            <form onSubmit={handleStockSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ marginRight: '20px' }}>
                  <input 
                    type="radio" 
                    value="inserir" 
                    checked={moveType === 'inserir'} 
                    onChange={(e) => setMoveType(e.target.value)} 
                    disabled={loadingModal}
                  /> Inserir
                </label>
                <label>
                  <input 
                    type="radio" 
                    value="remover" 
                    checked={moveType === 'remover'} 
                    onChange={(e) => setMoveType(e.target.value)} 
                    disabled={loadingModal}
                  /> Remover
                </label>
              </div>
              
              <label style={styles.label}>
                Quantidade:
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  required
                  style={styles.input}
                  disabled={loadingModal}
                />
              </label>
              
              <button type="submit" style={{ ...styles.actionButton.move, marginTop: '10px' }} disabled={loadingModal}>
                {loadingModal ? 'Aguarde...' : 'Confirmar Movimentação'}
              </button>
            </form>
          )}
  
          {modal.type === 'editar' && (
            <form onSubmit={handleEditSubmit}>
                <label style={styles.label}>Nome: <input type="text" name="nome" value={editData.nome} onChange={handleEditChange} style={styles.input} disabled={loadingModal} required /></label>
                <label style={styles.label}>Unidade: <input type="text" name="unidade_medida" value={editData.unidade_medida} onChange={handleEditChange} style={styles.input} disabled={loadingModal} required /></label>
                <label style={styles.label}>Estoque Mínimo: <input type="number" name="estoque_minimo" value={editData.estoque_minimo} onChange={handleEditChange} style={styles.input} min="0" disabled={loadingModal} required /></label>
                <label style={styles.label}>Data Validade: <input type="date" name="data_validade" value={editData.data_validade} onChange={handleEditChange} style={styles.input} disabled={loadingModal} /></label>
                <label style={styles.label}>Variação: <input type="text" name="caracteristica_variacao" value={editData.caracteristica_variacao} onChange={handleEditChange} style={styles.input} disabled={loadingModal} /></label>
                <label style={styles.label}>
                    Descrição: 
                    <textarea name="descricao" value={editData.descricao} onChange={handleEditChange} rows="3" style={styles.textarea} disabled={loadingModal} />
                </label>
              
              <button type="submit" style={{ ...styles.actionButton.edit, marginTop: '20px' }} disabled={loadingModal}>
                {loadingModal ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </form>
          )}
        </div>
        
      </div>
    );
  }


function PaginationControls({ pagination, handlePageChange }) {
    const { pagina, total, totalPaginas } = pagination;
    
    return (
        <div style={paginationStyles.container}>
            <p style={paginationStyles.info}>
                Total de Produtos: **{total}** | Página **{pagina}** de **{totalPaginas}**
            </p>
            <div style={paginationStyles.buttons}>
                <button 
                    onClick={() => handlePageChange(pagina - 1)}
                    disabled={pagina === 1}
                    style={paginationStyles.button}
                >
                    Anterior
                </button>
                
                <span style={paginationStyles.current}>Pág. {pagina}</span>
                
                <button 
                    onClick={() => handlePageChange(pagina + 1)}
                    disabled={pagina === totalPaginas}
                    style={paginationStyles.button}
                >
                    Próximo
                </button>
            </div>
        </div>
    );
}



const paginationStyles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        paddingTop: '15px',
        borderTop: '1px solid #eee',
    },
    info: {
        fontSize: '14px',
        color: '#555',
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        padding: '8px 15px',
        backgroundColor: '#f1f1f1',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '0 5px',
        fontSize: '14px',
    },
    current: {
        fontWeight: 'bold',
        fontSize: '14px',
        margin: '0 10px',
    }
};

const styles = {
    container: {
        maxWidth: '1000px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        backgroundColor: '#f9f9f9',
    },
    separator: {
        border: '0',
        height: '1px',
        background: '#ddd',
        margin: '15px 0',
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        backgroundColor: '#fff',
        borderRadius: '6px',
        border: '1px solid #ddd',
        padding: '5px 10px',
    },
    searchIcon: {
        color: '#888',
        marginRight: '10px',
    },
    searchInput: {
        border: 'none',
        flexGrow: 1,
        padding: '8px',
        fontSize: '16px',
        outline: 'none',
    },
    searchButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '0 4px 4px 0',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
    },
    th: {
        borderBottom: '2px solid #333',
        padding: '12px 8px',
        textAlign: 'left',
        backgroundColor: '#eef',
        fontSize: '14px',
    },
    td: {
        borderBottom: '1px solid #eee',
        padding: '10px 8px',
        fontSize: '14px',
    },
    lowStockRow: {
        backgroundColor: '#ffe6e6', // Fundo vermelho claro para estoque baixo
    },
    actionButton: {
        move: {
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '5px',
            fontSize: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
        },
        edit: {
            backgroundColor: '#ffc107',
            color: '#333',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
        }
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        position: 'relative',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    },
    modalCloseButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        color: '#aaa',
    },
    label: {
        marginBottom: '10px',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '14px',
        marginTop: '10px',
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
    statusMessage: {
        info: { color: 'blue', padding: '10px', border: '1px solid blue', backgroundColor: '#e6f7ff', borderRadius: '4px', marginBottom: '15px' },
        error: { color: 'white', backgroundColor: '#dc3545', padding: '10px', borderRadius: '4px', marginBottom: '15px' },
    }
};