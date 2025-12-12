import React from 'react';

const RoomCreatedPage = ({ roomCode, playerName, players, onStartFirstRound }) => {
  return (
    <div className="game-container">
      <h1>Room Berhasil Dibuat!</h1>
      <p>Bagikan kode room ini kepada teman Anda:</p>
      <h2>{roomCode}</h2>
      <p>Menunggu pemain lain bergabung...</p>
      {players.length === 2 && (
        <button onClick={onStartFirstRound}>Mulai Ronde 1</button>
      )}
      <div className="players-in-room">
        {players.map((player) => (
          <div key={player.id} className="player-info">
            {player.name} {player.id === socket.id ? "(Anda)" : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomCreatedPage;
