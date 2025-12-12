import { useState, useEffect } from 'react';
import { useSocket } from './hooks/useSocket';
import WelcomePage from './components/WelcomePage';
import MainMenuPage from './components/MainMenuPage';
import JoinRoomPage from './components/JoinRoomPage';
import RoomCreatedPage from './components/RoomCreatedPage';
import GamePage from './components/GamePage';
import RoundResultPage from './components/RoundResultPage';
import SpectatorPage from './components/SpectatorPage';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('welcome'); // welcome, menu, createRoom, joinRoom, roomCreated, waitingForPlayer, game, roundResult, gameOver, spectator
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [totalRounds, setTotalRounds] = useState(3);
  const [players, setPlayers] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [playerRole, setPlayerRole] = useState(''); // 'player' or 'spectator'
  const [roundResult, setRoundResult] = useState(null);
  const [error, setError] = useState('');
  const [scores, setScores] = useState([]);

  const socket = useSocket(import.meta.env.VITE_BACKEND_URL);

  useEffect(() => {
    if (!socket) return;

    // Event listeners dari backend
    socket.on('roomCreated', (data) => {
      setRoomCode(data.roomCode);
      setPlayerRole(data.playerRole);
      setGameState('roomCreated');
      setError('');
    });

    socket.on('roomJoined', (data) => {
      setRoomCode(data.roomCode);
      setPlayerRole(data.playerRole);
      if (data.playerRole === 'player') {
        setGameState('waitingForPlayer');
      } else {
        setGameState('spectator');
      }
      setError('');
    });

    socket.on('playerJoined', () => {
      setGameState('waitingForPlayer');
    });

    socket.on('gameStart', (data) => {
      setPlayers(data.players);
      setCurrentRound(data.currentRound);
      setTotalRounds(data.totalRounds);
      setGameState('waitingForPlayer'); // Menunggu host memulai ronde pertama
    });

    socket.on('newRound', (data) => {
      setCurrentRound(data.currentRound);
      setGameState('game');
    });

    socket.on('roundResult', (data) => {
      setRoundResult(data);
      setScores(data.scores);
      setGameState('roundResult');
    });

    socket.on('gameOver', (data) => {
      setScores(data.scores);
      setGameState('gameOver');
    });

    socket.on('roomError', (data) => {
      setError(data.message);
    });

    socket.on('playerLeft', () => {
      // Handle pemain lain keluar
      alert('Pemain lain telah meninggalkan room.');
      resetGame();
    });

    socket.on('leftRoom', () => {
      resetGame();
    });

    socket.on('gameState', (data) => {
        // Untuk penonton yang bergabung di tengah permainan
        setPlayers(data.players);
        setCurrentRound(data.currentRound);
        setTotalRounds(data.totalRounds);
        if(data.gameActive && data.roundActive) {
            setGameState('game');
        } else {
            setGameState('spectator');
        }
    });


    return () => {
      socket.off('roomCreated');
      socket.off('roomJoined');
      socket.off('playerJoined');
      socket.off('gameStart');
      socket.off('newRound');
      socket.off('roundResult');
      socket.off('gameOver');
      socket.off('roomError');
      socket.off('playerLeft');
      socket.off('leftRoom');
      socket.off('gameState');
    };
  }, [socket]);

  const resetGame = () => {
    setGameState('menu');
    setRoomCode('');
    setPlayers([]);
    setCurrentRound(1);
    setPlayerRole('');
    setRoundResult(null);
    setError('');
    setScores([]);
  };

  const handleCreateRoom = (name, rounds) => {
    setPlayerName(name);
    setTotalRounds(rounds);
    socket.emit('createRoom', { playerName: name, totalRounds: rounds });
  };

  const handleJoinRoom = (name, code, isSpectator) => {
    setPlayerName(name);
    socket.emit('joinRoom', { playerName: name, roomCode: code, isSpectator });
  };

  const handlePlayerChoice = (choice) => {
    socket.emit('playerChoice', { roomCode, choice });
  };

  const handleNextRound = () => {
    socket.emit('nextRound', { roomCode });
  };

  const handleStartFirstRound = () => {
    socket.emit('startFirstRound', { roomCode });
  };
  
  const handleLeaveRoom = () => {
    socket.emit('leaveRoom', { roomCode });
  }

  return (
    <div className="App">
      {gameState === 'welcome' && <WelcomePage setPlayerName={setPlayerName} setGameState={setGameState} />}
      {gameState === 'menu' && <MainMenuPage playerName={playerName} setGameState={setGameState} />}
      {gameState === 'createRoom' && <JoinRoomPage isCreate={true} playerName={playerName} onSubmit={handleCreateRoom} error={error} />}
      {gameState === 'joinRoom' && <JoinRoomPage isCreate={false} playerName={playerName} onSubmit={handleJoinRoom} error={error} />}
      {gameState === 'roomCreated' && <RoomCreatedPage roomCode={roomCode} playerName={playerName} players={players} onStartFirstRound={handleStartFirstRound} />}
      {gameState === 'waitingForPlayer' && <RoomCreatedPage roomCode={roomCode} playerName={playerName} players={players} onStartFirstRound={handleStartFirstRound} />}
      {gameState === 'game' && <GamePage playerName={playerName} players={players} currentRound={currentRound} totalRounds={totalRounds} onChoice={handlePlayerChoice} />}
      {gameState === 'roundResult' && <RoundResultPage roundResult={roundResult} scores={scores} currentRound={currentRound} totalRounds={totalRounds} onNextRound={handleNextRound} onLeaveRoom={handleLeaveRoom} />}
      {gameState === 'gameOver' && <RoundResultPage roundResult={null} scores={scores} currentRound={currentRound} totalRounds={totalRounds} onLeaveRoom={handleLeaveRoom} />}
      {gameState === 'spectator' && <SpectatorPage players={players} roomCode={roomCode} onLeaveRoom={handleLeaveRoom} />}
    </div>
  );
}

export default App;
