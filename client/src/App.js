import React, { useState } from 'react';
import TopAlbums from './TopAlbums';
import { sampleAlbums } from './Api';
import LoginForm from './LoginForm';
import AlbumWizard from './AlbumWizard';
import Existencia from './EXistencia'; // ✅ Corrigido aqui!
import './App.css';

function App() {
  const [albums, setAlbums] = useState(sampleAlbums);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleAddAlbum = (newAlbum) => {
    const nextId = albums.length > 0 ? Math.max(...albums.map(album => album.id)) + 1 : 1;
    setAlbums([
      ...albums,
      {
        ...newAlbum,
        id: nextId,
        createdAt: new Date(),
        rating: parseFloat(
          (newAlbum.trackRatings.reduce((acc, score) => acc + score, 0) / newAlbum.trackRatings.length).toFixed(2)
        ),
      },
    ]);
  };

  return (
    <main className="App">
      <TopAlbums albums={albums} />
      
      {/* ✅ Adiciona o painel Existência visivelmente */}
      <Existencia />

      <section className="add-section">
        <h2>Adicionar novo álbum</h2>
        {!isAuthenticated ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <AlbumWizard onComplete={handleAddAlbum} />
        )}
      </section>
    </main>
  );
}

export default App;
