import React from 'react';

const RoundResultPage = ({ roundResult, scores, currentRound, totalRounds, onNextRound, onLeaveRoom }) => {
  const isGameOver = currentRound > totalRounds;

  const getChoiceEmoji = (choice) => {
    switch (choice) {
      case 'rock': return '✊';
      case 'paper': return '✋';
      case 'scissors': return '✌️';
      default: return '❓';
    }
  };

  return (
    <div className="game-container">
      <h1>{isGameOver ? 'Permainan Selesai!' : `Hasil Ronde ${currentRound}`}</h1>
      
      {roundResult && (
        <div className="result-display">
          <span>{getChoiceEmoji(roundResult.player1.choice)}</span>
          <span className="vs">VS</span>
          <span>{getChoiceEmoji(roundResult.player2.choice)}</span>
        </div>
      )}

      <div className="scores">
        {scores.map((score) => (
          <div key={score.name} className="score-card">
            <h3>{score.name}</h3>
            <p>Skor: {score.score}</p>
          </div>
        ))}
      </div>

      <div className="menu-buttons">
        {!isGameOver ? (
          <button onClick={onNextRound}>Lanjut ke Ronde {currentRound + 1}</button>
        ) : (
          <button onClick={onLeaveRoom}>Kembali ke Menu Utama</button>
        )}
      </div>
    </div>
  );
};

export default RoundResultPage;
