import './TopAlbums.css';
import React from 'react';

function TopAlbums({ albums }) {
  // Ordena os álbuns em ordem decrescente pela nota
  const sortedAlbums = [...albums].sort((a, b) => b.rating - a.rating);

  return (
    <section className="album-list">
      {sortedAlbums.map(album => (
        <div className="album-card" key={album.id}>
          <img src={album.coverUrl} alt={`Capa do álbum ${album.name}`} />
          <h3>{album.name}</h3>
          <p><strong>Banda:</strong> {album.band}</p>
          <p><strong>Lançado em:</strong> {album.releaseYear}</p>
          <p><strong>Concluído em:</strong> {new Date(album.createdAt).toLocaleString()}</p>
          <p><strong>Faixa favorita:</strong> {album.favoriteTrack}</p>
          <p><strong>Nota percentual:</strong> {album.rating}%</p>
          <p><strong>Notas por faixa:</strong> {album.trackRatings.join(', ')}</p>
        </div>
      ))}
    </section>
  );
}

export default TopAlbums;
