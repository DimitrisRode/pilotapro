import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Video, UserPlus, Users } from 'lucide-react';
import { useGameConnection } from '../hooks/useGameConnection';
import type { Team } from '../types/game';

export default function Lobby() {
  const [nickname, setNickname] = useState('');
  const [currentPlayerId] = useState(() => {
    const storedId = localStorage.getItem('currentPlayerId');
    if (storedId) return storedId;
    
    const newId = crypto.randomUUID();
    localStorage.setItem('currentPlayerId', newId);
    return newId;
  });
  
  const { players } = useGameStore();
  const { emitJoinGame, emitSelectTeam, emitStartGame } = useGameConnection(currentPlayerId);

  const handleJoinGame = () => {
    if (nickname.trim()) {
      emitJoinGame(nickname.trim());
      setNickname('');
    }
  };

  const handleTeamSelect = (team: Team) => {
    emitSelectTeam(team);
  };

  const canStartGame = players.length === 4 && 
    players.filter(p => p.team === 'team1').length === 2 &&
    players.filter(p => p.team === 'team2').length === 2;

  // Store current player ID in localStorage
  useEffect(() => {
    localStorage.setItem('currentPlayerId', currentPlayerId);
  }, [currentPlayerId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Belote Online Lobby</h1>
          
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your nickname"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleJoinGame}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <UserPlus size={20} />
              Join Game
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Team 1 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
                <Users size={24} />
                Team 1
              </h2>
              <div className="space-y-3">
                {players
                  .filter((p) => p.team === 'team1')
                  .map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between bg-white p-3 rounded-lg shadow"
                    >
                      <span>{player.nickname}</span>
                      <Video
                        size={20}
                        className={player.videoEnabled ? 'text-green-500' : 'text-gray-400'}
                      />
                    </div>
                  ))}
                {players.filter(p => p.team === 'team1').length < 2 && (
                  <button
                    onClick={() => handleTeamSelect('team1')}
                    className="w-full py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    Join Team 1
                  </button>
                )}
              </div>
            </div>

            {/* Team 2 */}
            <div className="bg-red-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-800">
                <Users size={24} />
                Team 2
              </h2>
              <div className="space-y-3">
                {players
                  .filter((p) => p.team === 'team2')
                  .map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between bg-white p-3 rounded-lg shadow"
                    >
                      <span>{player.nickname}</span>
                      <Video
                        size={20}
                        className={player.videoEnabled ? 'text-green-500' : 'text-gray-400'}
                      />
                    </div>
                  ))}
                {players.filter(p => p.team === 'team2').length < 2 && (
                  <button
                    onClick={() => handleTeamSelect('team2')}
                    className="w-full py-2 border-2 border-dashed border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                  >
                    Join Team 2
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={emitStartGame}
              className={`px-8 py-3 rounded-lg transition-colors text-lg font-semibold ${
                canStartGame
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!canStartGame}
            >
              Start Game
            </button>
            {!canStartGame && (
              <p className="text-sm text-gray-500 mt-2">
                Need 2 players in each team to start the game
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}