// frontend/src/components/MainMenuPage.jsx
import React from 'react';

const MainMenuPage = ({ playerName, setGameState }) => {
  return (
    <div className="game-container">
      <h1>Halo, {playerName}!</h1>
      <p>Silakan pilih untuk membuat room baru atau bergabung dengan room yang sudah ada.</p>
      <div className="menu-buttons">
        <button onClick={() => setGameState('createRoom')}>Buat Room</button>
        <button onClick={() => setGameState('joinRoom')}>Join Room</button>
      </div>
    </div>
  );
};

export default MainMenuPage;
