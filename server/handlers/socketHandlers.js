import { handleJoinGame, handleSelectTeam, handleStartGame } from './gameHandlers.js';
import { gameService } from '../services/gameService.js';

export function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('Player connected:', socket.handshake.auth.playerId);

    socket.on('game:join', (data) => handleJoinGame(io, socket, data));
    socket.on('game:select-team', (data) => handleSelectTeam(io, socket, data));
    socket.on('game:start', () => handleStartGame(io, socket));

    socket.on('disconnect', () => {
      const playerId = socket.handshake.auth.playerId;
      if (gameService.removePlayer(playerId)) {
        // Notify other players about the disconnection
        const gameId = Array.from(gameService.games.keys())[0]; // Temporary solution
        if (gameId) {
          const game = gameService.games.get(gameId);
          io.to(gameId).emit('game:player-left', {
            playerId,
            players: Array.from(game.players.values()),
            teams: game.teams
          });
        }
      }
    });
  });
}