// src/types/game.ts
export type PlayerID = string;
export type TeamID = 'team1' | 'team2';

export interface Player {
  id: PlayerID;
  name: string;
  avatarUrl?: string; 
  // Add any player-specific fields
}

export interface Team {
  id: TeamID;
  players: PlayerID[]; 
}

export interface GameState {
  status: 'waiting' | 'in-progress' | 'finished';
  players: Player[];
  teams: Record<TeamID, Team>;
  // Add other game-related fields, like score, trump suit, etc.
}

// Event Payloads
export interface JoinGamePayload {
  playerId: PlayerID;
  playerName: string;
}

export interface SelectTeamPayload {
  playerId: PlayerID;
  teamId: TeamID;
}

export interface StartGamePayload {
  gameId: string;
  // Additional info if needed
}
