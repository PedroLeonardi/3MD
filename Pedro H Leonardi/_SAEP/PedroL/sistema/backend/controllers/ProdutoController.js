import ProdutoModel from '../models/ProdutoModel.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { removerArquivoAntigo } from '../middlewares/uploadMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProdutoController {
    
    static async listarTodos(req, res) {
        try {
            const paginaParam = req.query.pagina;
            const limiteParam = req.query.limite;
            
            let pagina = 1;
            if (paginaParam !== undefined && paginaParam !== null && paginaParam !== '') {
                pagina = parseInt(paginaParam);
                if (isNaN(pagina) || pagina <= 0) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Página inválida',
                        mensagem: 'A página deve ser um número maior que zero'
                    });
                }
            }
            
            let limite = 10;
            if (limiteParam !== undefined && limiteParam !== null && limiteParam !== '') {
                limite = parseInt(limiteParam);
                if (isNaN(limite) || limite <= 0) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Limite inválido',
                        mensagem: 'O limite deve ser um número maior que zero'
                    });
                }
            }
            
            const limiteMaximo = parseInt(process.env.PAGINACAO_LIMITE_MAXIMO) || 100;
            if (limite > limiteMaximo) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: `O limite deve ser um número entre 1 e ${limiteMaximo}`
                });
            }
            
            const resultado = await ProdutoModel.listarTodos(pagina, limite);
            
            res.status(200).json({
                sucesso: true,
                dados: resultado.produtos,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                }
            });
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os produtos'
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const produto = await ProdutoModel.buscarPorId(id);
            
            if (!produto) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Produto não encontrado',
                    mensagem: `Produto com ID ${id} não foi encontrado`
                });
            }

            res.status(200).json({
                sucesso: true,
                dados: produto
            });
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível buscar o produto'
            });
        }
    }

    static async criar(req, res) {
    try {
        const { 
            nome, 
            descricao, 
            unidade_medida, 
            estoque_atual, 
            estoque_minimo, 
            data_validade, 
            caracteristica_variacao 
        } = req.body;
        
        const erros = [];
        
        if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
            erros.push({
                campo: 'nome',
                mensagem: 'Nome é obrigatório.'
            });
        } else if (nome.trim().length < 3 || nome.trim().length > 100) {
            erros.push({
                campo: 'nome',
                mensagem: 'O nome deve ter entre 3 e 100 caracteres.'
            });
        }

        if (!unidade_medida || typeof unidade_medida !== 'string' || unidade_medida.trim().length === 0) {
            erros.push({
                campo: 'unidade_medida',
                mensagem: 'Unidade de medida é obrigatória.'
            });
        } else if (unidade_medida.trim().length > 20) {
            erros.push({
                campo: 'unidade_medida',
                mensagem: 'Unidade de medida deve ter no máximo 20 caracteres.'
            });
        }
        
        const minEstoque = parseInt(estoque_minimo);
        if (isNaN(minEstoque) || minEstoque < 0) {
            erros.push({
                campo: 'estoque_minimo',
                mensagem: 'Estoque mínimo é obrigatório e deve ser um número inteiro não negativo.'
            });
        }

        let atualEstoque = 0;
        if (estoque_atual !== undefined && estoque_atual !== null && estoque_atual !== '') {
            atualEstoque = parseInt(estoque_atual);
            if (isNaN(atualEstoque) || atualEstoque < 0) {
                erros.push({
                    campo: 'estoque_atual',
                    mensagem: 'Estoque atual deve ser um número inteiro não negativo.'
                });
            }
        }
        
        let dataValidadeFormatada = null;
        if (data_validade) {
            const dataObjeto = new Date(data_validade);
            if (isNaN(dataObjeto.getTime())) {
                erros.push({
                    campo: 'data_validade',
                    mensagem: 'Formato de data de validade inválido (esperado YYYY-MM-DD).'
                });
            } else {
                dataValidadeFormatada = dataObjeto.toISOString().split('T')[0];
            }
        }

        if (caracteristica_variacao && caracteristica_variacao.trim().length > 100) {
            erros.push({
                campo: 'caracteristica_variacao',
                mensagem: 'Característica de variação deve ter no máximo 100 caracteres.'
            });
        }
        
        if (erros.length > 0) {
            return res.status(400).json({
                sucesso: false,
                erro: 'Dados inválidos',
                detalhes: erros
            });
        }

        const dadosProduto = {
            nome: nome.trim(),
            descricao: descricao ? descricao.trim() : null, 
            unidade_medida: unidade_medida.trim(),
            estoque_atual: atualEstoque,
            estoque_minimo: minEstoque,
            data_validade: dataValidadeFormatada, 
            caracteristica_variacao: caracteristica_variacao ? caracteristica_variacao.trim() : null
        };


        const produtoId = await ProdutoModel.criar(dadosProduto);
        
        res.status(201).json({
            sucesso: true,
            mensagem: 'Produto criado com sucesso',
            dados: {
                id_produto: produtoId,
                ...dadosProduto
            }
        });
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({
            sucesso: false,
            erro: 'Erro interno do servidor',
            mensagem: 'Não foi possível criar o produto'
        });
    }
}

    static async atualizaMover(req, res) {
    try {
        const { id } = req.params;
        const { 
            nome, 
            descricao, 
            unidade_medida, 
            estoque_minimo, 
            data_validade,
            caracteristica_variacao
        } = req.body;
        
        const produtoId = parseInt(id);
        if (isNaN(produtoId) || produtoId <= 0) {
            return res.status(400).json({
                sucesso: false,
                erro: 'ID inválido',
                mensagem: 'O ID do produto deve ser um número válido e positivo.'
            });
        }

        const produtoExistente = await ProdutoModel.buscarPorId(produtoId); 
        if (!produtoExistente) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Produto não encontrado',
                mensagem: `Produto com ID ${produtoId} não foi encontrado`
            });
        }

        const dadosAtualizacao = {};
        const erros = [];
        
        if (nome !== undefined) {
            const nomeTrim = nome ? nome.trim() : '';
            if (nomeTrim.length === 0) {
                erros.push({ campo: 'nome', mensagem: 'O nome não pode estar vazio.' });
            } else if (nomeTrim.length > 100) {
                erros.push({ campo: 'nome', mensagem: 'O nome deve ter no máximo 100 caracteres.' });
            }
            dadosAtualizacao.nome = nomeTrim;
        }

        if (descricao !== undefined) {
            dadosAtualizacao.descricao = descricao ? descricao.trim() : null;
        }
        
        if (unidade_medida !== undefined) {
            const unidadeTrim = unidade_medida ? unidade_medida.trim() : '';
            if (unidadeTrim.length === 0) {
                erros.push({ campo: 'unidade_medida', mensagem: 'A unidade de medida não pode estar vazia.' });
            } else if (unidadeTrim.length > 20) {
                erros.push({ campo: 'unidade_medida', mensagem: 'A unidade de medida deve ter no máximo 20 caracteres.' });
            }
            dadosAtualizacao.unidade_medida = unidadeTrim;
        }

        if (estoque_minimo !== undefined) {
            const minEstoque = parseInt(estoque_minimo);
            if (isNaN(minEstoque) || minEstoque < 0) {
                erros.push({ campo: 'estoque_minimo', mensagem: 'Estoque mínimo deve ser um número inteiro não negativo.' });
            }
            dadosAtualizacao.estoque_minimo = minEstoque;
        }
        
        if (data_validade !== undefined) {
            if (data_validade) {
                const dataObjeto = new Date(data_validade);
                if (isNaN(dataObjeto.getTime())) {
                    erros.push({ campo: 'data_validade', mensagem: 'Formato de data de validade inválido (esperado YYYY-MM-DD).' });
                } else {
                    dadosAtualizacao.data_validade = dataObjeto.toISOString().split('T')[0];
                }
            } else {
                 dadosAtualizacao.data_validade = null;
            }
        }
        
        if (caracteristica_variacao !== undefined) {
             const variacaoTrim = caracteristica_variacao ? caracteristica_variacao.trim() : null;
             if (variacaoTrim && variacaoTrim.length > 100) {
                 erros.push({ campo: 'caracteristica_variacao', mensagem: 'A variação deve ter no máximo 100 caracteres.' });
             }
             dadosAtualizacao.caracteristica_variacao = variacaoTrim;
        }

        if (erros.length > 0) {
            return res.status(400).json({
                sucesso: false,
                erro: 'Dados inválidos',
                detalhes: erros
            });
        }
        
        if (req.file) {
        }


        if (Object.keys(dadosAtualizacao).length === 0) {
            return res.status(400).json({
                sucesso: false,
                erro: 'Nenhum dado para atualizar',
                mensagem: 'Forneça pelo menos um campo válido para atualizar'
            });
        }

        const resultado = await ProdutoModel.atualizar(produtoId, dadosAtualizacao);
        
        const linhasAfetadas = resultado.affectedRows || resultado; 
        
        if (linhasAfetadas === 0) {
             return res.status(404).json({
                sucesso: false,
                erro: 'Falha na atualização',
                mensagem: `Nenhum dado alterado no produto com ID ${produtoId}`
            });
        }
        
        res.status(200).json({
            sucesso: true,
            mensagem: 'Produto atualizado com sucesso',
            dados: {
                linhasAfetadas: linhasAfetadas
            }
        });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({
            sucesso: false,
            erro: 'Erro interno do servidor',
            mensagem: 'Não foi possível atualizar o produto'
        });
    }
}

    // PUT /produtos/:id - Atualizar produto
    static async atualizar(req, res) {
    try {
        const { id } = req.params;
        const { 
            nome, 
            descricao, 
            unidade_medida, 
            estoque_minimo, // Nota: estoque_atual deve ser atualizado via rota de movimentação
            data_validade,
            caracteristica_variacao
        } = req.body;
        
        const produtoId = parseInt(id);
        if (isNaN(produtoId) || produtoId <= 0) {
            return res.status(400).json({
                sucesso: false,
                erro: 'ID inválido',
                mensagem: 'O ID do produto deve ser um número válido e positivo.'
            });
        }

        const produtoExistente = await ProdutoModel.buscarPorId(produtoId); 
        if (!produtoExistente) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Produto não encontrado',
                mensagem: `Produto com ID ${produtoId} não foi encontrado`
            });
        }

        const dadosAtualizacao = {};
        const erros = [];
        
        if (nome !== undefined) {
            const nomeTrim = nome ? nome.trim() : '';
            if (nomeTrim.length === 0) {
                erros.push({ campo: 'nome', mensagem: 'O nome não pode estar vazio.' });
            } else if (nomeTrim.length > 100) {
                erros.push({ campo: 'nome', mensagem: 'O nome deve ter no máximo 100 caracteres.' });
            }
            dadosAtualizacao.nome = nomeTrim;
        }

        if (descricao !== undefined) {
            dadosAtualizacao.descricao = descricao ? descricao.trim() : null;
        }
        
        if (unidade_medida !== undefined) {
            const unidadeTrim = unidade_medida ? unidade_medida.trim() : '';
            if (unidadeTrim.length === 0) {
                erros.push({ campo: 'unidade_medida', mensagem: 'A unidade de medida não pode estar vazia.' });
            } else if (unidadeTrim.length > 20) {
                erros.push({ campo: 'unidade_medida', mensagem: 'A unidade de medida deve ter no máximo 20 caracteres.' });
            }
            dadosAtualizacao.unidade_medida = unidadeTrim;
        }

        if (estoque_minimo !== undefined) {
            const minEstoque = parseInt(estoque_minimo);
            if (isNaN(minEstoque) || minEstoque < 0) {
                erros.push({ campo: 'estoque_minimo', mensagem: 'Estoque mínimo deve ser um número inteiro não negativo.' });
            }
            dadosAtualizacao.estoque_minimo = minEstoque;
        }
        
        if (data_validade !== undefined) {
            if (data_validade) {
                const dataObjeto = new Date(data_validade);
                if (isNaN(dataObjeto.getTime())) {
                    erros.push({ campo: 'data_validade', mensagem: 'Formato de data de validade inválido (esperado YYYY-MM-DD).' });
                } else {
                    dadosAtualizacao.data_validade = dataObjeto.toISOString().split('T')[0];
                }
            } else {
                 dadosAtualizacao.data_validade = null;
            }
        }
        
        if (caracteristica_variacao !== undefined) {
             const variacaoTrim = caracteristica_variacao ? caracteristica_variacao.trim() : null;
             if (variacaoTrim && variacaoTrim.length > 100) {
                 erros.push({ campo: 'caracteristica_variacao', mensagem: 'A variação deve ter no máximo 100 caracteres.' });
             }
             dadosAtualizacao.caracteristica_variacao = variacaoTrim;
        }

        if (erros.length > 0) {
            return res.status(400).json({
                sucesso: false,
                erro: 'Dados inválidos',
                detalhes: erros
            });
        }
        
        if (req.file) {
        }


        if (Object.keys(dadosAtualizacao).length === 0) {
            return res.status(400).json({
                sucesso: false,
                erro: 'Nenhum dado para atualizar',
                mensagem: 'Forneça pelo menos um campo válido para atualizar'
            });
        }

        const resultado = await ProdutoModel.atualizar(produtoId, dadosAtualizacao);
        
        const linhasAfetadas = resultado.affectedRows || resultado; 
        
        if (linhasAfetadas === 0) {
             return res.status(404).json({
                sucesso: false,
                erro: 'Falha na atualização',
                mensagem: `Nenhum dado alterado no produto com ID ${produtoId}`
            });
        }
        
        res.status(200).json({
            sucesso: true,
            mensagem: 'Produto atualizado com sucesso',
            dados: {
                linhasAfetadas: linhasAfetadas
            }
        });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({
            sucesso: false,
            erro: 'Erro interno do servidor',
            mensagem: 'Não foi possível atualizar o produto'
        });
    }
}

    // DELETE /produtos/:id - Excluir produto
    static async excluir(req, res) {
        try {
            const { id } = req.params;
            
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const produtoExistente = await ProdutoModel.buscarPorId(id);
            if (!produtoExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Produto não encontrado',
                    mensagem: `Produto com ID ${id} não foi encontrado`
                });
            }

            if (produtoExistente.imagem) {
                await removerArquivoAntigo(produtoExistente.imagem, 'imagem');
            }

            const resultado = await ProdutoModel.excluir(id);
            
            res.status(200).json({
                sucesso: true,
                mensagem: 'Produto excluído com sucesso',
                dados: {
                    linhasAfetadas: resultado || 1
                }
            });
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível excluir o produto'
            });
        }
    }

    static async uploadImagem(req, res) {
        try {
            const { produto_id } = req.body;
            
            if (!produto_id || isNaN(produto_id)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID de produto inválido',
                    mensagem: 'O ID do produto é obrigatório e deve ser um número válido'
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Imagem não fornecida',
                    mensagem: 'É necessário enviar uma imagem'
                });
            }

            const produtoExistente = await ProdutoModel.buscarPorId(produto_id);
            if (!produtoExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Produto não encontrado',
                    mensagem: `Produto com ID ${produto_id} não foi encontrado`
                });
            }

            if (produtoExistente.imagem) {
                await removerArquivoAntigo(produtoExistente.imagem, 'imagem');
            }

            await ProdutoModel.atualizar(produto_id, { imagem: req.file.filename });
            
            res.status(200).json({
                sucesso: true,
                mensagem: 'Imagem enviada com sucesso',
                dados: {
                    nomeArquivo: req.file.filename,
                    caminho: `/uploads/imagens/${req.file.filename}`
                }
            });
        } catch (error) {
            console.error('Erro ao fazer upload de imagem:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível fazer upload da imagem'
            });
        }
    }
}

export default ProdutoController;

