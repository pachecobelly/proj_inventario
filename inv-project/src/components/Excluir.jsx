import React from 'react';
import axios from 'axios';

function Excluir({ itens, onItemDeleted }) {

  const handleDelete = (id) => {
    if (!window.confirm(`Tem certeza que deseja excluir o item?`)) {
      return;
    }
    
    axios.delete(`http://localhost:3001/api/inventario/${id}`)
      .then(() => {
        alert('Item excluído com sucesso.');
        onItemDeleted();
      })
      .catch(error => {
        console.error('Erro ao excluir item:', error);
        alert('Falha ao excluir o item.');
      });
  };

  return (
    <div>
      <h2>Excluir Item do Inventário</h2>
      {itens.length === 0 ? (
        <p>Nenhum item para excluir.</p>
      ) : (
        <ul>
          {itens.map(item => (
            <li key={item.id}>
              <span>{item.nome} (Quantidade: {item.quantidade})</span>
              <button onClick={() => handleDelete(item.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Excluir;
