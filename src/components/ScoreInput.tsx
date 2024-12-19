import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import type { Team } from '../types/game';

export default function ScoreInput() {
  const [team1Points, setTeam1Points] = useState('');
  const [team2Points, useState2Points] = useState('');
  const updateScore = useGameStore(state => state.updateScore);

  const handleSubmitScore = () => {
    const t1Points = parseInt(team1Points);
    const t2Points = parseInt(team2Points);
    
    if (!isNaN(t1Points)) {
      updateScore('team1', t1Points);
    }
    if (!isNaN(t2Points)) {
      updateScore('team2', t2Points);
    }
    
    setTeam1Points('');
    useState2Points('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h3 className="text-xl font-bold mb-4">Update Round Score</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Team 1 Points</label>
          <input
            type="number"
            value={team1Points}
            onChange={(e) => setTeam1Points(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            min="0"
            max="162"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Team 2 Points</label>
          <input
            type="number"
            value={team2Points}
            onChange={(e) => useState2Points(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            min="0"
            max="162"
          />
        </div>
      </div>
      <button
        onClick={handleSubmitScore}
        className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Submit Round Score
      </button>
    </div>
  );
}