import { useState } from 'react';
import axios from 'axios';

function Adicionar({ onItemAdded }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || quantidade <= 0) {
      alert('Por favor, preencha o nome e a quantidade corretamente.');
      return;
    }

    axios.post('http://localhost:3001/api/inventario', { nome, quantidade })
      .then(response => {
        alert('Item adicionado com sucesso!');
        setNome('');
        setQuantidade(0);
        onItemAdded();
      })
      .catch(error => {
        console.error('Erro ao adicionar item:', error);
        alert('Falha ao adicionar o item.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Novo Item</h2>
      <label htmlFor="nome">Nome do Item</label>
      <input
        id="nome"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Ex: Cadeira Gamer"
      />
      <label htmlFor="quantidade">Quantidade</label>
      <input
        id="quantidade"
        type="number"
        value={quantidade}
        onChange={(e) => setQuantidade(parseInt(e.target.value))}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default Adicionar;
