// server/services/gameService.js
import { createDeck, shuffleDeck } from '../utils/cardUtils.js';
import { GameStateService } from './gameState.js';

class GameService {
  constructor() {
    // Maps each gameId to a GameStateService instance
    this.games = new Map();
    // Maps each playerId to the gameId they belong to
    this.playerGameMap = new Map();
  }

  createGame(gameId) {
    if (!this.games.has(gameId)) {
      const gameState = new GameStateService();
      this.games.set(gameId, gameState);
    }
    return this.games.get(gameId).getState();
  }

  addPlayer(gameId, player) {
    const gameStateService = this.games.get(gameId);
    if (!gameStateService) return null;

    gameStateService.addPlayer(player);
    this.playerGameMap.set(player.id, gameId);

    return gameStateService.getState();
  }

  joinTeam(gameId, playerId, team) {
    const gameStateService = this.games.get(gameId);
    if (!gameStateService) return false;

    return gameStateService.selectTeam(playerId, team);
  }

  dealCards(gameId) {
    const gameStateService = this.games.get(gameId);
    if (!gameStateService) return null;

    const state = gameStateService.getState();
    const players = state.players.map(p => p.id);
    if (players.length === 0) return null;

    const deck = createDeck();
    shuffleDeck(deck);

    const cardsPerPlayer = Math.floor(deck.length / players.length);
    players.forEach((playerId, index) => {
      const start = index * cardsPerPlayer;
      const end = start + cardsPerPlayer;
      const hand = deck.slice(start, end);
      gameStateService.setPlayerHand(playerId, hand);
    });

    return gameStateService.getState().currentPlayerHands;
  }

  getPlayerCards(gameId, playerId) {
    const gameStateService = this.games.get(gameId);
    if (!gameStateService) return [];
    const state = gameStateService.getState();
    return state.currentPlayerHands[playerId] || [];
  }

  removePlayer(playerId) {
    const gameId = this.playerGameMap.get(playerId);
    if (!gameId) return false;

    const gameStateService = this.games.get(gameId);
    if (!gameStateService) return false;

    const removed = gameStateService.removePlayer(playerId);
    if (removed) {
      this.playerGameMap.delete(playerId);
      return true;
    }
    return false;
  }

  startGame(gameId) {
    const gameStateService = this.games.get(gameId);
    if (!gameStateService) return false;
    return gameStateService.startGame();
  }

  findGameByPlayerId(playerId) {
    return this.playerGameMap.get(playerId) || null;
  }

  getGame(gameId) {
    const gameStateService = this.games.get(gameId);
    return gameStateService ? gameStateService.getState() : null;
  }
}

export const gameService = new GameService();
