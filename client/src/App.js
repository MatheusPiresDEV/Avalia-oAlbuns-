import React, { useState } from 'react';
import Galaxy from './Galaxy';
import TopAlbums from './TopAlbums';
import { sampleAlbums } from './Api';
import LoginForm from './LoginForm';
import AlbumWizard from './AlbumWizard';
import Existencia from './EXistencia';
import './App.css';

function App() {
  const [albums, setAlbums] = useState(sampleAlbums);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleAddAlbum = (newAlbum) => {
    const nextId = albums.length > 0
      ? Math.max(...albums.map(album => album.id)) + 1
      : 1;

    const rating = parseFloat(
      (
        newAlbum.trackRatings.reduce((acc, score) => acc + score, 0) /
        newAlbum.trackRatings.length
      ).toFixed(2)
    );

    setAlbums([
      ...albums,
      {
        ...newAlbum,
        id: nextId,
        createdAt: new Date(),
        rating,
      },
    ]);
  };

  return (
    <div className="App" style={{ position: 'relative', zIndex: 1 }}>
      {/* 🌌 Fundo Galáctico */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
        }}
      >
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.2}
          hueShift={0}
          saturation={0.0}
          transparent={false}
        />
      </div>

      {/* 🧭 Cabeçalho */}
      <header className="site-header">
        <div className="nav-container">
          <div className="logo">🎵 Meu Catálogo</div>
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle" className="emoji-menu">☰</label>
          <nav className="nav-items">
            <a href="#top-wrapper">Álbuns</a>
            <a href="#add-album">Adicionar</a>
            <a href="#edit-album">Editar</a>
            <a href="#rank">Rank</a>
            <a href="#rank-simplificado">Rank Simplificado</a>
            <a href="#observacoes">Observações</a>
            <a href="#historico">Histórico</a>
            <a href="#etc">Etc</a>
          </nav>
        </div>
      </header>

      {/* 🎧 Seção dos álbuns com painel à direita */}
      <section id="top-wrapper">
        <div className="main-columns">
          <div className="left-content">
            <TopAlbums albums={albums} />
          </div>

          <Existencia totalAlbums={albums.length} />
        </div>
      </section>

      {/* 🎛️ Demais seções */}
      <section id="add-album" className="add-section">
        <h2>Adicionar novo álbum</h2>
        {!isAuthenticated ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <AlbumWizard onComplete={handleAddAlbum} />
        )}
      </section>

      <section id="edit-album">
        <h2>Editar álbum</h2>
        <p>Função de edição será implementada aqui.</p>
      </section>

      <section id="rank">
        <h2>Ranking Geral</h2>
        <p>Aqui ficará o ranking baseado nas notas dos álbuns.</p>
      </section>

      <section id="rank-simplificado">
        <h2>Rank Simplificado</h2>
        <p>Exibição rápida e resumida dos melhores álbuns.</p>
      </section>

      <section id="observacoes">
        <h2>Observações</h2>
        <p>Anotações e detalhes adicionais sobre os álbuns.</p>
      </section>

      <section id="historico">
        <h2>Histórico</h2>
        <p>Registro de alterações, adições e atualizações.</p>
      </section>

      <section id="etc">
        <h2>Outros</h2>
        <p>Espaço reservado para futuras funcionalidades.</p>
      </section>
    </div>
  );
}

export default App;
