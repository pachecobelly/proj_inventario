const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let inventario = [
  { id: 1, nome: 'Cadeira Gamer', quantidade: 12 },
  { id: 2, nome: 'Mesa de Escritório', quantidade: 7 },
  { id: 3, nome: 'Monitor 24"', quantidade: 15 },
];
let proximoId = 4;

// --- Rotas ---

// [GET] Listar todos os itens
app.get('/api/inventario', (req, res) => {
  res.json(inventario);
});

// [POST] Adicionar item 
app.post('/api/inventario', (req, res) => {
  const { nome, quantidade } = req.body;

  // Validação de campos obrigatórios
  if (!nome || quantidade === undefined) {
    return res.status(400).json({ message: 'Nome e quantidade são obrigatórios.' });
  }

  const quantidadeInt = parseInt(quantidade);

  // Não permite quantidade negativa ou zero
  if (isNaN(quantidadeInt) || quantidadeInt <= 0) {
    return res.status(400).json({ message: 'Quantidade deve ser um número positivo maior que zero.' });
  }

  // Verificar se já existe um item com o mesmo nome (case insensitive)
  const nomeNormalizado = nome.trim().toLowerCase();
  const itemExistente = inventario.find(item => item.nome.toLowerCase() === nomeNormalizado);

  if (itemExistente) {
    // Se o item já existir, apenas soma a quantidade
    itemExistente.quantidade += quantidadeInt;
    return res.status(200).json(itemExistente);
  } else {
    // Se for um novo item
    const novoItem = {
      id: proximoId,
      nome: nome.trim(),
      quantidade: quantidadeInt,
    };

    inventario.push(novoItem);
    proximoId++;

    return res.status(201).json(novoItem);
  }
});

// [DELETE] Excluir item por ID
app.delete('/api/inventario/:id', (req, res) => {
  const idParaDeletar = parseInt(req.params.id);

  const index = inventario.findIndex(item => item.id === idParaDeletar);

  if (index === -1) {
    return res.status(404).json({ message: 'Item não encontrado.' });
  }

  inventario.splice(index, 1);
  res.status(204).send();
});

// --- Iniciar o Servidor ---
app.listen(port, () => {
  console.log(`API do inventário rodando em http://localhost:${port}`);
});
