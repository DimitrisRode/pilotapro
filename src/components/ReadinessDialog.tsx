import React from 'react';
import { useGameStore } from '../store/gameStore';

interface ReadinessDialogProps {
  playerId: string;
}

export default function ReadinessDialog({ playerId }: ReadinessDialogProps) {
  const setPlayerReady = useGameStore((state) => state.setPlayerReady);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 className="text-xl font-bold mb-4">Είσαι έτοιμος?</h3>
        <div className="flex gap-4">
          <button
            onClick={() => setPlayerReady(playerId, true)}
            className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Yes
          </button>
          <button
            onClick={() => setPlayerReady(playerId, false)}
            className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Μισό να στρίψω
          </button>
        </div>
      </div>
    </div>
  );
}