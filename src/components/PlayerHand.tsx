import React from 'react';
import Card from './Card';
import VideoPlayer from './VideoPlayer';
import PlayerControls from './PlayerControls';
import type { Card as CardType } from '../types/game';
import { useGameStore } from '../store/gameStore';

interface PlayerHandProps {
  playerId: string;
  cards: CardType[];
  position: 'north' | 'south' | 'east' | 'west';
  isCurrentPlayer: boolean;
}

export default function PlayerHand({ playerId, cards, position, isCurrentPlayer }: PlayerHandProps) {
  const player = useGameStore(state => state.players.find(p => p.id === playerId));

  const positionStyles = {
    north: 'top-4 left-1/2 -translate-x-1/2',
    south: 'bottom-4 left-1/2 -translate-x-1/2',
    east: 'right-4 top-1/2 -translate-y-1/2',
    west: 'left-4 top-1/2 -translate-y-1/2'
  };

  return (
    <div className={`absolute ${positionStyles[position]} flex flex-col items-center gap-4`}>
      <div className="relative">
        <VideoPlayer playerId={playerId} />
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <PlayerControls playerId={playerId} />
        </div>
      </div>
      <div className="bg-white/10 rounded-lg p-2">
        <p className="text-white font-medium">{player?.nickname}</p>
      </div>
      <div className="flex gap-2">
        {cards.map((card, index) => (
          <Card
            key={`${card.suit}-${card.value}`}
            card={card}
            isPlayable={isCurrentPlayer}
          />
        ))}
      </div>
    </div>
  );
}