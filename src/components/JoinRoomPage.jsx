// frontend/src/components/JoinRoomPage.jsx
import React, { useState } from 'react';

const JoinRoomPage = ({ isCreate, playerName, onSubmit, error }) => {
  const [roomCode, setRoomCode] = useState('');
  const [rounds, setRounds] = useState(3);
  const [isSpectator, setIsSpectator] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    console.log('Form disubmit. isCreate:', isCreate);
    if (isCreate) {
      console.log('Mengirim emit createRoom dengan rounds:', rounds);
      onSubmit(playerName, rounds);
    } else {
      console.log('Mengirim emit joinRoom dengan kode:', roomCode);
      onSubmit(playerName, roomCode.toUpperCase(), isSpectator);
    }
  };

  return (
    <div className="game-container">
      <h1>{isCreate ? 'Buat Room Baru' : 'Join Room'}</h1>
      <form onSubmit={handleSubmit}>
        {isCreate ? (
          <>
            <label>Jumlah Ronde:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={rounds}
              onChange={(e) => setRounds(e.target.value)}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Masukkan kode room"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              required
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="spectatorCheck"
                checked={isSpectator}
                onChange={(e) => setIsSpectator(e.target.checked)}
              />
              <label htmlFor="spectatorCheck">Join sebagai Penonton</label>
            </div>
          </>
        )}
        {/* Tombol ini bertipe 'submit' dan akan menjalankan fungsi handleSubmit */}
        <button type="submit">{isCreate ? 'Buat Room' : 'Join Room'}</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default JoinRoomPage;
