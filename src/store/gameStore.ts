import { create } from 'zustand';
import { GameState, Player, Team, Card } from '../types/game';

interface GameStore extends GameState {
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  updatePlayerTeam: (playerId: string, team: Team) => void;
  toggleVideo: (playerId: string) => void;
  startGame: () => void;
  updateScore: (team: Team, points: number) => void;
  setCurrentPlayerHands: (playerId: string, cards: Card[]) => void;
  updateGameState: (gameState: Partial<GameState>) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  isGameStarted: false,
  isDealingCards: false,
  scores: {
    team1: 0,
    team2: 0,
  },
  players: [],
  currentPlayerHands: {},
  
  addPlayer: (player) =>
    set((state) => ({
      players: [...state.players.filter(p => p.id !== player.id), player],
    })),
    
  removePlayer: (playerId) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== playerId),
    })),
    
  updatePlayerTeam: (playerId, team) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, team } : p
      ),
    })),
    
  toggleVideo: (playerId) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, videoEnabled: !p.videoEnabled } : p
      ),
    })),
    
  startGame: () => set({ isGameStarted: true }),
  
  updateScore: (team, points) =>
    set((state) => ({
      scores: {
        ...state.scores,
        [team]: state.scores[team] + points,
      },
    })),

  setCurrentPlayerHands: (playerId, cards) =>
    set((state) => ({
      currentPlayerHands: {
        ...state.currentPlayerHands,
        [playerId]: cards,
      },
    })),

  updateGameState: (gameState) =>
    set((state) => ({
      ...state,
      ...gameState,
    })),
}));