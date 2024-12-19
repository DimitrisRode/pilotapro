// server/services/gameState.js

export class GameStateService {
  constructor() {
    this.state = {
      players: [], // each player: {id, name, team?}
      teams: {
        team1: [],
        team2: []
      },
      isGameStarted: false,
      currentPlayerHands: {} // { [playerId]: card[] }
    };
  }

  addPlayer(player) {
    // Ensure no duplicate player entries
    const existingIndex = this.state.players.findIndex(p => p.id === player.id);
    if (existingIndex !== -1) {
      // Update existing player info if needed
      this.state.players[existingIndex] = player;
    } else {
      this.state.players.push(player);
    }
    return player;
  }

  removePlayer(playerId) {
    const playerIndex = this.state.players.findIndex(p => p.id === playerId);
    if (playerIndex !== -1) {
      this.state.players.splice(playerIndex, 1);
      this.state.teams.team1 = this.state.teams.team1.filter(id => id !== playerId);
      this.state.teams.team2 = this.state.teams.team2.filter(id => id !== playerId);
      delete this.state.currentPlayerHands[playerId];
      return true;
    }
    return false;
  }

  selectTeam(playerId, team) {
    const player = this.state.players.find(p => p.id === playerId);
    if (player && (team === 'team1' || team === 'team2') && this.state.teams[team].length < 2) {
      // Remove the player from any previously assigned team
      this.state.teams.team1 = this.state.teams.team1.filter(id => id !== playerId);
      this.state.teams.team2 = this.state.teams.team2.filter(id => id !== playerId);

      // Assign the player to the chosen team
      this.state.teams[team].push(playerId);
      player.team = team;
      return true;
    }
    return false;
  }

  canStartGame() {
    return (
      this.state.teams.team1.length === 2 &&
      this.state.teams.team2.length === 2
    );
  }

  startGame() {
    if (this.canStartGame()) {
      this.state.isGameStarted = true;
      return true;
    }
    return false;
  }

  setPlayerHand(playerId, hand) {
    this.state.currentPlayerHands[playerId] = hand;
  }

  getState() {
    return this.state;
  }
}
