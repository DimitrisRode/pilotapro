import { gameService } from '../services/gameService.js';

export function handleJoinGame(io, socket, { nickname }) {
  const playerId = socket.handshake.auth.playerId;
  
  // Find available game or create new one
  let gameId = findAvailableGame();
  
  if (!gameId) {
    gameId = createNewGame();
  }
  
  const player = { id: playerId, nickname, team: null, videoEnabled: false };
  const game = gameService.addPlayer(gameId, player);
  
  if (game) {
    socket.join(gameId);
    notifyGameUpdate(io, gameId);
  }
}

export function handleSelectTeam(io, socket, { team }) {
  const playerId = socket.handshake.auth.playerId;
  const gameId = findPlayerGame(playerId);
  
  if (!gameId) return;
  
  if (gameService.joinTeam(gameId, playerId, team)) {
    notifyGameUpdate(io, gameId);
  }
}

export function handleStartGame(io, socket) {
  const playerId = socket.handshake.auth.playerId;
  const gameId = findPlayerGame(playerId);
  
  if (!gameId) return;
  
  const game = gameService.games.get(gameId);
  if (!game) return;
  
  if (canStartGame(game)) {
    const hands = gameService.dealCards(gameId);
    distributeCards(io, hands);
    updateGameStatus(io, gameId, 'playing');
  }
}

function findAvailableGame() {
  return Array.from(gameService.games.entries())
    .find(([_, game]) => game.players.size < 4)?.[0];
}

function createNewGame() {
  const gameId = `game_${Date.now()}`;
  gameService.createGame(gameId);
  return gameId;
}

function findPlayerGame(playerId) {
  return Array.from(gameService.games.entries())
    .find(([_, game]) => game.players.has(playerId))?.[0];
}

function notifyGameUpdate(io, gameId) {
  const game = gameService.games.get(gameId);
  if (!game) return;
  
  io.to(gameId).emit('game:updated', {
    players: Array.from(game.players.values()),
    teams: game.teams,
    status: game.status
  });
}

function canStartGame(game) {
  return game.teams.team1.length === 2 && 
         game.teams.team2.length === 2;
}

function distributeCards(io, hands) {
  hands.forEach((cards, playerId) => {
    io.to(playerId).emit('game:cards-dealt', cards);
  });
}

function updateGameStatus(io, gameId, status) {
  const game = gameService.games.get(gameId);
  if (!game) return;
  
  game.status = status;
  io.to(gameId).emit('game:status-updated', { status });
}