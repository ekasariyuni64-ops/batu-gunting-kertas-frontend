import React, { useState } from 'react';

const WelcomePage = ({ setPlayerName, setGameState }) => {
  const [name, setName] = useState('');

  const handleStart = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setPlayerName(name);
      setGameState('menu');
    }
  };

  return (
    <div className="game-container">
      <h1>Selamat Datang di Game Rock Paper Scissors!</h1>
      <form onSubmit={handleStart}>
        <input
          type="text"
          placeholder="Masukkan nama Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Mulai</button>
      </form>
    </div>
  );
};

export default WelcomePage;
