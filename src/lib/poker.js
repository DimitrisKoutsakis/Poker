import _ from 'lodash';

const Ranks = Object.freeze([ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ]);
const Suits = Object.freeze([ 'hearts', 'diams', 'clubs', 'spades' ]);

const Cards = Object.freeze(Object.entries(Ranks).reduce(
  (cards, [ weight, rank ]) => cards.concat(Suits.map(suit => ({ rank, suit, weight }))),
  []
));

class PlayingCards {

  constructor(cards = null, from = 0, to = 0) {
    const cardsSource = cards instanceof Array ? cards : Cards;
    const cardsRange = cardsSource.slice(from, to || cardsSource.length);

    this.cards = Object.freeze(cardsRange.sort(() => Math.random() - 0.5));

    this.genStats();

    Object.freeze(this);
  }

  getNCardsAndRest(n) {
    return {
      cards: new PlayingCards(this.cards, 0, n),
      restCards: new PlayingCards(this.cards, n, this.cards.length),
    };
  }

  genStats() {
    this.ordCards = [...this.cards].sort((a, b) => a.weight - b.weight);
    this.ranks = _.groupBy(this.ordCards, 'rank');
    this.suits = _.groupBy(this.ordCards, 'suit');
    this.rankTimes = _.groupBy(this.ranks, 'length');
    this.suitTimes = _.groupBy(this.suits, 'length');
    this.maxInARow = maxInARow(this.ordCards.map(({ weight }) => weight));
  }
  getOfSameRank(n) { return this.rankTimes[n] || []; }

  getOfSameSuit(n) { return this.suitTimes[n] || []; }

  hasAce() { return !!this.ranks['A']; }

  hasOfSameRank(n) { return this.getOfSameRank(n).length; }

  hasOfSameSuit(n) { return this.getOfSameSuit(n).length; }

  hasInARow(n) { return this.maxInARow >= n; }

  getWorstSingles() { return _.sortBy(_.flatten(this.getOfSameRank(1)), 'weight'); }
}

//
// Poker Ratings
//
const PokerRating = {
  RoyalFlush: {
    is: (hand) => hand.hasInARow(5) && hand.hasOfSameSuit(5) && hand.hasAce(),
    weight: 'J'
  },
  StraightFlush: {
    is: (hand) => hand.hasInARow(5) && hand.hasOfSameSuit(5),
    weight: 'I'
  },
  FourOfAKind: {
    is: (hand) => hand.hasOfSameRank(4),
    weight: 'H'
  },
  FullHouse: {
    is: (hand) => hand.hasOfSameRank(3) && hand.hasOfSameRank(2),
    weight: 'G'
  },
  Flush: {
    is: (hand) => hand.hasOfSameSuit(5),
    weight: 'F'
  },
  Straight: {
    is: (hand) => hand.hasInARow(5),
    weight: 'E'
  },
  ThreeOfAKind: {
    is: (hand) => hand.hasOfSameRank(3),
    weight: 'D'
    },
  TwoPair: {
    is: (hand) => hand.hasOfSameRank(2) >= 2,
    weight: 'C'
  },
  OnePair: {
    is: (hand) => hand.hasOfSameRank(2),
    weight: 'B'
  },
  HighCard: {
    is: (hand) => hand.hasOfSameRank(1) >= 5,
    weight: 'A'
  },
};

const dealCards = (deck) => {
  let temp = deck.getNCardsAndRest(5);
  const player = temp.cards;
  temp = temp.restCards.getNCardsAndRest(5);

  return {
    player,
    opponent: temp.cards,
    deck: temp.restCards
  }
}
const PokerHandRate = cards => Object.entries(PokerRating).find(([rate, { is }]) => is(cards))[0];

const PokerHandWeight = cards => {
  const cardsWeight = _.map(cards.rankTimes, card => String.fromCharCode(65 + Number(card[0][0].weight)));

  return PokerRating[PokerHandRate(cards)].weight +
         _.reduceRight(cardsWeight, (card, acc)=> card + acc, '');
}

const PlayerIsWinner = (players) => {
  let isWinner = PokerHandWeight(players.opponent) < PokerHandWeight(players.player);
  return isWinner;
}

function maxInARow(nums) {
  return _.chain(nums)
    .sortBy()
    .uniq()
    .map((num, i) => (num - i))
    .groupBy()
    .orderBy('length')
    .last()
    .value()
    .length;
}

export {
  PlayingCards,
  dealCards,
  PokerHandRate,
  PlayerIsWinner,
};