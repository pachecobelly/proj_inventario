import React from 'react';

function Sidebar({ className, onSelectPage }) {
  return (
    <div className={`sidebar ${className}`}>
      <h2>Inventário</h2>
      
      <nav>
        <button onClick={() => onSelectPage('listar')}>
          Listar Itens
        </button>
        <button onClick={() => onSelectPage('adicionar')}>
          Adicionar Item
        </button>
        <button onClick={() => onSelectPage('excluir')}>
          Excluir Item
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
