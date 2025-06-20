import React from 'react';

function Dashboard({ totalItens, onViewChange }) {
  return (
    <div>
      <div className="dashboard-welcome">
        <h1>Bem-vindo ao seu Inventário</h1>
        <p>Gerencie seus itens de forma rápida e eficiente.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total de Itens</h3>
          <p className="card-value">{totalItens}</p>
          <a href="#" className="card-link" onClick={() => onViewChange('listar')}>
            Ver todos os itens &rarr;
          </a>
        </div>

        <div className="dashboard-card">
          <h3>Adicionar Novo Item</h3>
          <p>Clique aqui para cadastrar um novo produto no seu estoque.</p>
          <a href="#" className="card-link" onClick={() => onViewChange('adicionar')}>
            Adicionar agora &rarr;
          </a>
        </div>

        <div className="dashboard-card">
          <h3>Ações Rápidas</h3>
          <p>Exclua itens ou edite as informações do seu inventário.</p>
           <a href="#" className="card-link" onClick={() => onViewChange('excluir')}>
            Ir para exclusão &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;