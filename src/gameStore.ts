// src/store/gameStore.ts
import create from 'zustand';
import { GameState, Player, Team } from '../types/game';

interface GameStore {
  players: Player[];
  teams: Record<string, Team>; // Could be { team1: Player[], team2: Player[] }
  status: GameState['status'];
  setPlayers: (players: Player[]) => void;
  setTeams: (teams: Record<string, Team>) => void;
  setStatus: (status: GameState['status']) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  players: [],
  teams: {},
  status: 'waiting', // or 'in-progress', 'finished'
  setPlayers: (players) => set({ players }),
  setTeams: (teams) => set({ teams }),
  setStatus: (status) => set({ status }),
}));
