const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors')

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Inicializa o aplicativo Express
const app = express();
const PORT = 8080;
const DATA_FILE = path.join(__dirname, 'data.json');

// --- Middleware ---
app.use(express.json());
app.use(cors())

// --- Funções Auxiliares (mesmas de antes) ---
const readData = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
};

const writeData = async (data) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- ROTA DE AUTENTICAÇÃO ---

// Rota para login para obter um token
app.post('/login', (req, res) => {
  console.log(req.body);
  
    // Em uma aplicação real, você validaria o usuário e senha contra um banco de dados
    const { username, password } = req.body;

    // Para este exemplo, vamos usar credenciais fixas
    if (username === 'admin' && password === 'senai@123') {
        // Se as credenciais estiverem corretas, crie o token
        const userPayload = { username: username, role: 'admin' };
        
        // Assina o token com o segredo do .env e define uma expiração (ex: 1 hora)
        const accessToken = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ accessToken: accessToken });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas.' });
    }
});


// --- MIDDLEWARE DE VERIFICAÇÃO DE TOKEN ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // O token vem no formato "Bearer TOKEN"
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        // 401 Unauthorized - Se não houver token
        return res.status(401).json({ message: 'Token de acesso não fornecido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // 403 Forbidden - Se o token for inválido ou expirado
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }
        req.user = user; // Adiciona o payload do usuário ao objeto da requisição
        next(); // Passa para a próxima função (a rota em si)
    });
};


// --- ROTAS CRUD (AGORA PROTEGIDAS) ---
// Note que adicionamos `authenticateToken` como segundo argumento.
// Isso faz com que o middleware seja executado antes do código da rota.

app.get('/items', authenticateToken, async (req, res) => {
  // console.log('Usuário autenticado:', req.user); // Você pode acessar os dados do token aqui
  const items = await readData();
  res.status(200).json(items);
});

app.get('/items/:id', authenticateToken, async (req, res) => {
  const items = await readData();
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Item não encontrado.' });
  res.status(200).json(item);
});

app.post('/items', authenticateToken, async (req, res) => {
  const items = await readData();
  const newItem = { id: Date.now().toString(), ...req.body };
  items.push(newItem);
  await writeData(items);
  res.status(201).json(newItem);
});

app.put('/items/:id', authenticateToken, async (req, res) => {
    const items = await readData();
    const itemIndex = items.findIndex(i => i.id === req.params.id);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item não encontrado.' });
    
    const updatedItem = { ...items[itemIndex], ...req.body };
    items[itemIndex] = updatedItem;
    await writeData(items);
    res.status(200).json(updatedItem);
});

app.delete('/items/:id', authenticateToken, async (req, res) => {
    const items = await readData();
    const newItems = items.filter(i => i.id !== req.params.id);
    if (items.length === newItems.length) return res.status(404).json({ message: 'Item não encontrado.' });
    
    await writeData(newItems);
    res.status(200).json({ message: 'Item deletado com sucesso.' });
});


// --- Iniciar o Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor Express rodando em http://localhost:${PORT}`);
});