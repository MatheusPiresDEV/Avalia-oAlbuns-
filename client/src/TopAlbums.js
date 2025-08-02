import './TopAlbums.css';
import React from 'react';

function TopAlbums({ albums }) {
  // Ordena os álbuns em ordem decrescente pela nota
  const sortedAlbums = [...albums].sort((a, b) => b.rating - a.rating);

  return (
    <section className="album-list">
      {sortedAlbums.map(album => (
        <div className="album-item" key={album.id}>
          <img
            src={album.coverUrl}
            alt={`Capa do álbum ${album.name}`}
            className="album-cover"
          />
          <div className="album-title">{album.name}</div>
          <div className="album-band">{album.band}</div>
          <div className="album-year">Lançado em {album.releaseYear}</div>
          <div className="album-details">
            <p><strong>Concluído em:</strong> {new Date(album.createdAt).toLocaleString()}</p>
            <p><strong>Faixa favorita:</strong> {album.favoriteTrack}</p>
            <p><strong>Nota percentual:</strong> {album.rating}%</p>
            <p><strong>Notas por faixa:</strong> {album.trackRatings.join(', ')}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default TopAlbums;
