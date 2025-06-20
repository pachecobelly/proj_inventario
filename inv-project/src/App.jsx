import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Listar from './components/Listar';
import Adicionar from './components/Adicionar';
import Excluir from './components/Excluir';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [pagina, setPagina] = useState('dashboard');
  const [itens, setItens] = useState([]); 
  const [sidebarAberta, setSidebarAberta] = useState(false);

  const fetchItens = () => {
    axios.get('http://localhost:3001/api/inventario')
      .then(response => {
        setItens(response.data);
      })
      .catch(error => console.error("Erro ao buscar itens:", error));
  };

  useEffect(() => {
    fetchItens();
  }, []);
  
  const handlePageSelect = (novaPagina) => {
    setPagina(novaPagina);
    setSidebarAberta(false);
  };

  const renderPage = () => {
    if (pagina === 'dashboard') {
      return <Dashboard totalItens={itens.length} onViewChange={handlePageSelect} />;
    }
    if (pagina === 'listar') {
      return <Listar itens={itens} />;
    }
    if (pagina === 'adicionar') {
      return <Adicionar onItemAdded={fetchItens} />;
    }
    if (pagina === 'excluir') {
      return <Excluir itens={itens} onItemDeleted={fetchItens} />;
    }
  };

  return (
    <div className="app">
      {!sidebarAberta && (
        <button className="menu-toggle" onClick={() => setSidebarAberta(true)}>
          &#9776;
        </button>
      )}

      <div 
        className={`overlay ${sidebarAberta ? 'show' : ''}`}
        onClick={() => setSidebarAberta(false)}
      ></div>
      
      <Sidebar 
        className={sidebarAberta ? 'open' : ''} 
        onSelectPage={handlePageSelect}
        onClose={() => setSidebarAberta(false)}
      />

      <div className="content">
        {pagina !== 'dashboard' && (
          <button className="btn-back" onClick={() => setPagina('dashboard')}>
            &larr; Voltar ao Dashboard
          </button>
        )}
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
