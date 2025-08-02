import React, { useState } from 'react';

function AddAlbumForm({ onAdd }) {
  const [newAlbum, setNewAlbum] = useState({
    name: '',
    image: '',
    favoriteTrack: '',
    rating: ''
  });

  const handleChange = (e) => {
    setNewAlbum({ ...newAlbum, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newAlbum);
    setNewAlbum({ name: '', image: '', favoriteTrack: '', rating: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input name="name" placeholder="Nome do álbum" value={newAlbum.name} onChange={handleChange} required />
      <input name="image" placeholder="URL da capa" value={newAlbum.image} onChange={handleChange} required />
      <input name="favoriteTrack" placeholder="Faixa favorita" value={newAlbum.favoriteTrack} onChange={handleChange} required />
      <input name="rating" type="number" step="0.1" placeholder="Nota (0–10)" value={newAlbum.rating} onChange={handleChange} required />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default AddAlbumForm;
