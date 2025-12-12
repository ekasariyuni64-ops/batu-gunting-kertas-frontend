// frontend/src/components/MainMenuPage.jsx
import React from 'react';

const MainMenuPage = ({ playerName, setGameState }) => {
  // Fungsi ini akan dipanggil saat tombol ditekan
  const handleCreateRoomClick = () => {
    console.log('Tombol "Buat Room" di menu ditekan. Mengubah state ke "createRoom"');
    setGameState('createRoom');
  };

  const handleJoinRoomClick = () => {
    console.log('Tombol "Join Room" di menu ditekan. Mengubah state ke "joinRoom"');
    setGameState('joinRoom');
  };

  return (
    <div className="game-container">
      <h1>Halo, {playerName}!</h1>
      <p>Silakan pilih untuk membuat room baru atau bergabung dengan room yang sudah ada.</p>
      <div className="menu-buttons">
        {/* Tombol ini akan mengubah gameState ke 'createRoom' */}
        <button onClick={handleCreateRoomClick}>Buat Room</button>
        
        {/* Tombol ini akan mengubah gameState ke 'joinRoom' */}
        <button onClick={handleJoinRoomClick}>Join Room</button>
      </div>
    </div>
  );
};

export default MainMenuPage;
