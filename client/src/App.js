import React, { useState } from 'react';
import TopAlbums from './TopAlbums';
import { sampleAlbums } from './Api';
import LoginForm from './LoginForm';
import AlbumWizard from './AlbumWizard'; // novo import
import './App.css';

function App() {
  const [albums, setAlbums] = useState(sampleAlbums);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleAddAlbum = (newAlbum) => {
    setAlbums([...albums, { ...newAlbum, id: albums.length + 1 }]);
  };

  return (
    <main className="App">
      <TopAlbums albums={albums} />

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
