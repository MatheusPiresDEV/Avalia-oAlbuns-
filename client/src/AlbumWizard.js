import React, { useState } from 'react';

function AlbumWizard({ onComplete }) {
  const [step, setStep] = useState(1);
  const [albumData, setAlbumData] = useState({
    name: '',
    createdAt: '',
    band: '',
    releaseYear: '',
    coverUrl: '',
    tracks: []
  });

  const [currentRating, setCurrentRating] = useState('');
  const [askFavorite, setAskFavorite] = useState(false);
  const [favoriteIndex, setFavoriteIndex] = useState('');

  const ratingMap = {
    'foda': 10,
    'otimiaa': 9,
    'otima': 8,
    'boa': 7,
    'mais ou menos': 5,
    'desgracera': 3,
    'funk': -1
  };

  const handleNext = () => {
    if (step === 2) {
      setAlbumData(prev => ({
        ...prev,
        createdAt: new Date().toISOString()
      }));
    }
    setStep(prev => prev + 1);
  };

  const handleChange = (field, value) => {
    setAlbumData(prev => ({ ...prev, [field]: value }));
  };

  const addTrack = () => {
    const normalized = currentRating.trim().toLowerCase();
    const value = ratingMap[normalized];
    if (value !== undefined) {
      setAlbumData(prev => ({
        ...prev,
        tracks: [...prev.tracks, { rating: value }]
      }));
      setCurrentRating('');
    } else {
      alert('Nota inválida. Digite uma das opções válidas: ' + Object.keys(ratingMap).join(', '));
    }
  };

  const finalizeAlbum = () => {
    if (albumData.tracks.length === 0) {
      alert('Adicione pelo menos uma faixa antes de finalizar.');
      return;
    }
    setAskFavorite(true);
  };

  const confirmFavoriteTrack = () => {
    const index = parseInt(favoriteIndex) - 1;
    if (isNaN(index) || index < 0 || index >= albumData.tracks.length) {
      alert(`Digite um número entre 1 e ${albumData.tracks.length}`);
      return;
    }

    const totalRating = albumData.tracks.reduce((acc, track) => acc + track.rating, 0);
    const maxPossible = albumData.tracks.length * 10;
    const percentage = maxPossible > 0 ? (totalRating / maxPossible) * 100 : 0;

    const completedAlbum = {
      ...albumData,
      rating: Number(percentage.toFixed(2)),
      trackRatings: albumData.tracks.map(track => track.rating),
      favoriteTrack: `Faixa ${index + 1}`,
      id: Date.now()
    };

    onComplete(completedAlbum);
    setStep(1);
    setAlbumData({
      name: '',
      createdAt: '',
      band: '',
      releaseYear: '',
      coverUrl: '',
      tracks: []
    });
    setAskFavorite(false);
    setFavoriteIndex('');
  };

  const totalRating = albumData.tracks.reduce((acc, track) => acc + track.rating, 0);
  const maxPossible = albumData.tracks.length * 10;
  const percentage = maxPossible > 0 ? ((totalRating / maxPossible) * 100).toFixed(2) : '0.00';

  return (
    <div className="wizard-container">
      {/* Nome do álbum */}
      {step === 1 && (
        <>
          <label>Nome do álbum:</label>
          <input
            type="text"
            value={albumData.name}
            onChange={e => handleChange('name', e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleNext()}
            required
          />
          <button onClick={handleNext}>Validar Nome</button>
        </>
      )}

      {/* Nome da banda */}
      {step === 2 && (
        <>
          <label>Nome da banda:</label>
          <input
            type="text"
            value={albumData.band}
            onChange={e => handleChange('band', e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleNext()}
            required
          />
          <button onClick={handleNext}>Validar Banda</button>
        </>
      )}

      {/* Ano de lançamento */}
      {step === 3 && (
        <>
          <label>Ano de lançamento:</label>
          <input
            type="number"
            value={albumData.releaseYear}
            onChange={e => handleChange('releaseYear', e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleNext()}
            placeholder="Ex: 2020"
            required
          />
          <button onClick={handleNext}>Validar Ano</button>
        </>
      )}

      {/* URL da capa */}
      {step === 4 && (
        <>
          <label>URL da capa (opcional):</label>
          <input
            type="text"
            value={albumData.coverUrl}
            onChange={e => handleChange('coverUrl', e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleNext()}
          />
          <button onClick={handleNext}>Avançar para avaliação</button>
        </>
      )}

      {/* Avaliação das faixas */}
      {step >= 5 && !askFavorite && (
        <>
          <label>Avaliação da faixa {albumData.tracks.length + 1}:</label>
          <input
            type="text"
            placeholder="Ex: foda, boa, funk..."
            value={currentRating}
            onChange={e => setCurrentRating(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTrack()}
          />
          <button onClick={addTrack}>Adicionar faixa</button>

          <div className="track-controls">
            <button onClick={finalizeAlbum}>Finalizar Álbum</button>
            <button onClick={() => setStep(step + 1)}>Adicionar próxima faixa</button>
          </div>

          {albumData.tracks.length > 0 && (
            <div className="track-summary">
              <p>Total de faixas: {albumData.tracks.length}</p>
              <p>Nota somada: {totalRating}</p>
              <p>Nota percentual: {percentage}%</p>
            </div>
          )}
        </>
      )}

      {/* Faixa favorita */}
      {askFavorite && (
        <>
          <label>Digite o número da faixa favorita (1 até {albumData.tracks.length}):</label>
          <input
            type="number"
            min="1"
            max={albumData.tracks.length}
            value={favoriteIndex}
            onChange={e => setFavoriteIndex(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && confirmFavoriteTrack()}
          />
          <button onClick={confirmFavoriteTrack}>Confirmar faixa favorita</button>
        </>
      )}
    </div>
  );
}

export default AlbumWizard;
