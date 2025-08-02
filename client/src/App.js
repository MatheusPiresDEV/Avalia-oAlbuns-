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
      {/* Fundo galáctico */}
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
          glowIntensity={0.2}      // menos brilho exagerado
          hueShift={0}             // tonalidade neutra
          saturation={0.0}         // sem cor — estrelas brancas
          transparent={false}      // fundo totalmente preto
        />

      </div>

      {/* Conteúdo principal */}
      <TopAlbums albums={albums} />
      <Existencia />

      <section className="add-section">
        <h2>Adicionar novo álbum</h2>
        {!isAuthenticated ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <AlbumWizard onComplete={handleAddAlbum} />
        )}
      </section>
    </div>
  );
}

export default App;
