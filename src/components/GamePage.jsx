import React, { useState } from 'react';
import { useSocket } from '../hooks/useSocket';

const GamePage = ({ playerName, players, currentRound, totalRounds, onChoice }) => {
  const [hasChosen, setHasChosen] = useState(false);
  const socket = useSocket(import.meta.env.VITE_BACKEND_URL);

  const handleChoiceClick = (choice) => {
    if (!hasChosen) {
      setHasChosen(true);
      onChoice(choice);
    }
  };

  // Temukan data pemain dan lawan
  const currentPlayer = players.find(p => p.name === playerName);
  const opponent = players.find(p => p.name !== playerName);

  return (
    <div className="game-container">
      {opponent && <div className="player-info">{opponent.name}</div>}
      <div className="game-area">
        <div className="round-info">Ronde {currentRound} dari {totalRounds}</div>
        <div className="choices">
          <button className="choice-btn" onClick={() => handleChoiceClick('rock')} disabled={hasChosen}>✊ Batu</button>
          <button className="choice-btn" onClick={() => handleChoiceClick('paper')} disabled={hasChosen}>✋ Kertas</button>
          <button className="choice-btn" onClick={() => handleChoiceClick('scissors')} disabled={hasChosen}>✌️ Gunting</button>
        </div>
        {hasChosen && <p>Menunggu lawan membuat pilihan...</p>}
      </div>
      <div className="player-info">{currentPlayer.name}</div>
    </div>
  );
};

export default GamePage;
