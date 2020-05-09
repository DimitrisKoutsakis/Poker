import { PlayingCards } from '.';

const NewGame = (Cards = {})=> {
    Cards.deck = new PlayingCards();
    let temp = Cards.deck.getNCardsAndRest(5);
    Cards.opponent = temp.cards;
    Cards.player = temp.restCards.getNCardsAndRest(5).cards;
    Cards.showOpponent = false;
 
    return Cards;
}

export default NewGame;