import React from 'react';

function Listar({ itens }) {
  return (
    <div>
      <h2>Lista de Itens no Inventário</h2>
      {itens.length === 0 ? (
        <p>O inventário está vazio.</p>
      ) : (
        <ul>
          {itens.map(item => (
            <li key={item.id}>
              <span>{item.nome}</span>
              <span>Quantidade: {item.quantidade}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Listar;
