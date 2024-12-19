export type Team = 'team1' | 'team2';

export type Player = {
  id: string;
  nickname: string;
  team?: Team;
  videoEnabled: boolean;
  isReady: boolean;
};

export type Card = {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
  imageUrl: string;
};

export type GameState = {
  isGameStarted: boolean;
  isDealingCards: boolean;
  scores: {
    team1: number;
    team2: number;
  };
  players: Player[];
  currentPlayerHands: Record<string, Card[]>;
};