class GameStateService {
  constructor() {
    this.state = {
      players: [],
      teams: {
        team1: [],
        team2: []
      },
      isGameStarted: false,
      currentPlayerHands: {}
    };
  }

  addPlayer(player) {
    this.state.players = this.state.players.filter(p => p.id !== player.id);
    this.state.players.push(player);
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
    if (player && this.state.teams[team].length < 2) {
      // Remove from previous team if any
      this.state.teams.team1 = this.state.teams.team1.filter(id => id !== playerId);
      this.state.teams.team2 = this.state.teams.team2.filter(id => id !== playerId);
      
      // Add to new team
      this.state.teams[team].push(playerId);
      player.team = team;
      return true;
    }
    return false;
  }

  canStartGame() {
    return this.state.teams.team1.length === 2 && this.state.teams.team2.length === 2;
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

export const gameState = new GameStateService();