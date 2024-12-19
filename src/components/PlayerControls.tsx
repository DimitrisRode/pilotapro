import React from 'react';
import { Video, VideoOff } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useVideoCall } from '../hooks/useVideoCall';

interface PlayerControlsProps {
  playerId: string;
}

export default function PlayerControls({ playerId }: PlayerControlsProps) {
  const player = useGameStore(state => state.players.find(p => p.id === playerId));
  const { handleToggleVideo } = useVideoCall(playerId);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToggleVideo}
        className={`p-2 rounded-full transition-colors ${
          player?.videoEnabled
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-gray-300 hover:bg-gray-400'
        }`}
      >
        {player?.videoEnabled ? (
          <Video size={20} className="text-white" />
        ) : (
          <VideoOff size={20} className="text-gray-600" />
        )}
      </button>
    </div>
  );
}