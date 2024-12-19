import React from 'react';
import { useGameStore } from './store/gameStore';
import Lobby from './components/Lobby';
import GameBoard from './components/GameBoard';

function App() {
  const isGameStarted = useGameStore((state) => state.isGameStarted);

  return (
    <div className="min-h-screen">
      {isGameStarted ? <GameBoard /> : <Lobby />}
    </div>
  );
}

export default App;