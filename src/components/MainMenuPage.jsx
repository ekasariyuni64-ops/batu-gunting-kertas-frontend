import React from 'react';

const MainMenuPage = ({ playerName, setGameState }) => {
  return (
    <div className="game-container">
      <h1>Halo, {playerName}!</h1>
      <div className="menu-buttons">
        <button onClick={() => setGameState('createRoom')}>Main</button>
      </div>
    </div>
  );
};

export default MainMenuPage;
