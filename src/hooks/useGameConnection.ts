import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { socket, connectSocket } from '../services/socket';

export function useGameConnection(playerId: string) {
  const {
    setPlayers,
    setTeams,
    setGameStatus,
    setPlayerCards,
  } = useGameStore();

  useEffect(() => {
    connectSocket(playerId);

    socket.on('game:player-joined', ({ players, teams }) => {
      setPlayers(players);
      setTeams(teams);
    });

    socket.on('game:teams-updated', (teams) => {
      setTeams(teams);
    });

    socket.on('game:started', ({ status }) => {
      setGameStatus(status);
    });

    socket.on('game:cards-dealt', (cards) => {
      setPlayerCards(cards);
    });

    socket.on('game:player-left', ({ players, teams }) => {
      setPlayers(players);
      setTeams(teams);
    });

    return () => {
      socket.off('game:player-joined');
      socket.off('game:teams-updated');
      socket.off('game:started');
      socket.off('game:cards-dealt');
      socket.off('game:player-left');
    };
  }, [playerId]);

  return {
    emitJoinGame: (nickname: string) => {
      socket.emit('game:join', { nickname });
    },
    emitSelectTeam: (team: string) => {
      socket.emit('game:select-team', { team });
    },
    emitStartGame: () => {
      socket.emit('game:start');
    }
  };
}