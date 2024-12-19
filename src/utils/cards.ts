const CARD_VALUES = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'] as const;
const CARD_SUITS = ['hearts', 'diamonds', 'clubs', 'spades'] as const;

export const createDeck = () => {
  const deck = [];
  for (const suit of CARD_SUITS) {
    for (const value of CARD_VALUES) {
      deck.push({
        suit,
        value,
        imageUrl: `https://deckofcardsapi.com/static/img/${value}${suit[0].toUpperCase()}.png`
      });
    }
  }
  return deck;
};

export const shuffleDeck = (deck: ReturnType<typeof createDeck>) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const dealCards = (deck: ReturnType<typeof createDeck>, numPlayers: number) => {
  const hands = Array.from({ length: numPlayers }, () => []);
  const cardsPerPlayer = Math.floor(deck.length / numPlayers);
  
  for (let i = 0; i < cardsPerPlayer * numPlayers; i++) {
    hands[i % numPlayers].push(deck[i]);
  }
  
  return hands;
};