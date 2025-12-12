import React, { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';

const SpectatorPage = ({ players, roomCode, onLeaveRoom }) => {
    const [count, setCount] = useState(0);
    const [roundInfo, setRoundInfo] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [finalScores, setFinalScores] = useState([]);
    const socket = useSocket(import.meta.env.VITE_BACKEND_URL);

    useEffect(() => {
        if (!socket) return;

        socket.on('newRound', (data) => {
            setRoundInfo(data);
            setGameOver(false);
            setCount(0); // Reset count
        });

        socket.on('roundResult', (data) => {
            setRoundInfo(data);
        });

        socket.on('gameOver', (data) => {
            setGameOver(true);
            setFinalScores(data.scores);
        });

        return () => {
            socket.off('newRound');
            socket.off('roundResult');
            socket.off('gameOver');
        }
    }, [socket]);

    useEffect(() => {
        if (roundInfo && !gameOver) {
            const interval = setInterval(() => {
                setCount(prevCount => prevCount + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [roundInfo, gameOver]);

    const getChoiceEmoji = (choice) => {
        switch (choice) {
            case 'rock': return '✊';
            case 'paper': return '✋';
            case 'scissors': return '✌️';
            default: return '❓';
        }
    };

    if (gameOver) {
        return (
            <div className="game-container">
                <h1>Permainan Selesai!</h1>
                <div className="scores">
                    {finalScores.map((score) => (
                        <div key={score.name} className="score-card">
                            <h3>{score.name}</h3>
                            <p>Skor Akhir: {score.score}</p>
                        </div>
                    ))}
                </div>
                <button onClick={onLeaveRoom}>Keluar</button>
            </div>
        );
    }

    if (!roundInfo) {
        return (
            <div className="game-container">
                <h1>Menonton Room: {roomCode}</h1>
                <p>Menunggu permainan dimulai...</p>
                <div className="spectator-count">{count}</div>
                <button onClick={onLeaveRoom}>Keluar</button>
            </div>
        );
    }

    return (
        <div className="game-container">
            <h1>Menonton Room: {roomCode}</h1>
            {players[0] && <div className="player-info">{players[0].name}</div>}
            <div className="game-area">
                <div className="round-info">Ronde {roundInfo.currentRound} dari {roundInfo.totalRounds}</div>
                {roundInfo.player1 && roundInfo.player2 ? (
                    <div className="result-display">
                        <span>{getChoiceEmoji(roundInfo.player1.choice)}</span>
                        <span className="vs">VS</span>
                        <span>{getChoiceEmoji(roundInfo.player2.choice)}</span>
                    </div>
                ) : (
                    <div className="spectator-count">{count}</div>
                )}
            </div>
            {players[1] && <div className="player-info">{players[1].name}</div>}
            <button onClick={onLeaveRoom}>Keluar</button>
        </div>
    );
};

export default SpectatorPage;
