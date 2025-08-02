import './TopAlbums.css';
import React from 'react';

function TopAlbums({ albums }) {
  return (
    <section className="album-list">
      {albums.map(album => (
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
