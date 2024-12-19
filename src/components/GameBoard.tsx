import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import PlayerHand from './PlayerHand';
import ScoreInput from './ScoreInput';
import { Card } from '../types/game';

export default function GameBoard() {
  const { scores, players, currentPlayerHands } = useGameStore();
  const [currentPlayerId] = useState(() => {
    // Get the current player's ID from the URL or local storage
    return localStorage.getItem('currentPlayerId') || '';
  });

  const positions = ['north', 'east', 'south', 'west'] as const;

  // Only show cards for the current player
  const playerCards = currentPlayerHands[currentPlayerId] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-emerald-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Score Board */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Score Board</h2>
          </div>
          <div className="grid grid-cols-2 gap-8 text-center mt-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Team 1</h3>
              <p className="text-3xl font-bold text-blue-600">{scores.team1}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Team 2</h3>
              <p className="text-3xl font-bold text-red-600">{scores.team2}</p>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-green-800 rounded-xl shadow-lg p-8 aspect-video relative">
          {players.map((player, index) => (
            <PlayerHand
              key={player.id}
              playerId={player.id}
              cards={player.id === currentPlayerId ? playerCards : []}
              position={positions[index]}
              isCurrentPlayer={player.id === currentPlayerId}
            />
          ))}

          {/* Center playing area */}
          <div className="absolute inset-0 m-auto w-64 h-64 bg-green-700/50 rounded-full">
            {/* Played cards will appear here */}
          </div>
        </div>

        {/* Score Input */}
        <ScoreInput />
      </div>
    </div>
  );
}