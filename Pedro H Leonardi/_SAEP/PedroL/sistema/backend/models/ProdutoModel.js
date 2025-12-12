import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

class ProdutoModel {
    static async listarTodos(pagina = 1, limite = 10) {
        try {
            const offset = (pagina - 1) * limite;
            
            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM produtos ORDER BY nome ASC LIMIT ? OFFSET ?'; 
                const [produtos] = await connection.execute(sql, [limite, offset]);
                
                const [totalResult] = await connection.execute('SELECT COUNT(*) as total FROM produtos');
                const total = totalResult[0].total;
                
                return {
                    produtos,
                    total,
                    pagina,
                    limite,
                    totalPaginas: Math.ceil(total / limite)
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            throw error;
        }
    }

    static async buscarPorId(id) {
        try {

            const rows = await read('produtos', `id_produto = ${id}`);
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar produto por ID:', error);
            throw error;
        }
    }

    static async criar(dadosProduto) {
        try {
            return await create('produtos', dadosProduto);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            throw error;
        }
    }

    static async atualizar(id, dadosProduto) {
        try {
            return await update('produtos', dadosProduto, `id_produto = ${id}`);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    }

    static async excluir(id) {
        try {
            return await deleteRecord('produtos', `id_produto = ${id}`);
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            throw error;
        }
    }

    static async buscarPorCategoria(categoria) {
        try {
            return await read('produtos', `categoria = '${categoria}'`);
        } catch (error) {
            console.error('Erro ao buscar produtos por categoria:', error);
            throw error;
        }
    }
}

export default ProdutoModel;