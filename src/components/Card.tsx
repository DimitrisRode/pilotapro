import React from 'react';
import type { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  isPlayable?: boolean;
}

export default function Card({ card, onClick, isPlayable = false }: CardProps) {
  return (
    <div
      onClick={isPlayable ? onClick : undefined}
      className={`relative w-24 h-36 rounded-lg shadow-lg transform transition-transform duration-200 
        ${isPlayable ? 'hover:-translate-y-4 cursor-pointer' : ''}`}
    >
      <img
        src={card.imageUrl}
        alt={`${card.value} of ${card.suit}`}
        className="w-full h-full rounded-lg"
      />
    </div>
  );
}