import { createDeck, shuffleDeck } from '../utils/cardUtils.js';

class GameService {
  constructor() {
    this.games = new Map();
    this.playerGameMap = new Map();
  }

  createGame(gameId) {
    const game = {
      id: gameId,
      players: new Map(),
      teams: {
        team1: [],
        team2: []
      },
      status: 'waiting',
      currentRound: {
        cards: new Map(),
        playedCards: []
      }
    };
    this.games.set(gameId, game);
    return game;
  }

  addPlayer(gameId, player) {
    const game = this.games.get(gameId);
    if (!game) return null;

    game.players.set(player.id, player);
    this.playerGameMap.set(player.id, gameId);
    return game;
  }

  joinTeam(gameId, playerId, team) {
    const game = this.games.get(gameId);
    if (!game || !game.players.has(playerId)) return false;
    
    // Remove from other team if exists
    game.teams.team1 = game.teams.team1.filter(id => id !== playerId);
    game.teams.team2 = game.teams.team2.filter(id => id !== playerId);
    
    // Add to new team
    if (game.teams[team].length < 2) {
      game.teams[team].push(playerId);
      const player = game.players.get(playerId);
      player.team = team;
      return true;
    }
    return false;
  }

  dealCards(gameId) {
    const game = this.games.get(gameId);
    if (!game) return null;

    const deck = createDeck();
    shuffleDeck(deck);

    // Deal cards to players
    const hands = new Map();
    const players = Array.from(game.players.keys());
    const cardsPerPlayer = Math.floor(deck.length / players.length);

    players.forEach((playerId, index) => {
      const start = index * cardsPerPlayer;
      const end = start + cardsPerPlayer;
      hands.set(playerId, deck.slice(start, end));
    });

    game.currentRound.cards = hands;
    return hands;
  }

  getPlayerCards(gameId, playerId) {
    const game = this.games.get(gameId);
    if (!game) return [];
    return game.currentRound.cards.get(playerId) || [];
  }

  removePlayer(playerId) {
    const gameId = this.playerGameMap.get(playerId);
    if (!gameId) return false;

    const game = this.games.get(gameId);
    if (game) {
      game.players.delete(playerId);
      game.teams.team1 = game.teams.team1.filter(id => id !== playerId);
      game.teams.team2 = game.teams.team2.filter(id => id !== playerId);
      this.playerGameMap.delete(playerId);
      return true;
    }
    return false;
  }
}

export const gameService = new GameService();