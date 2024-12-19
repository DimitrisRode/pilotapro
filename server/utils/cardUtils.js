const CARD_SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const CARD_VALUES = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export function createDeck() {
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
}

export function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function calculateHandValue(cards) {
  // Implement card value calculation logic here
  return cards.reduce((total, card) => {
    const baseValue = getCardValue(card);
    return total + baseValue;
  }, 0);
}

function getCardValue(card) {
  const valueMap = {
    'J': 2,
    '9': 0,
    'A': 11,
    '10': 10,
    'K': 4,
    'Q': 3,
    '8': 0,
    '7': 0
  };
  return valueMap[card.value] || 0;
}