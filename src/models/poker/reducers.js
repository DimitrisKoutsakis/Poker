import { combineReducers } from 'redux';
import { PlayingCards, dealCards } from '../../lib/poker';
import { newGame, change, select, nextRound, bet } from '.';

const handsAndDeck = (state = dealCards(new PlayingCards()), action) => {
    switch (action.type) {
        case newGame.type: return dealCards(new PlayingCards());
        case change.type : 
            const changedCards = state.deck.getNCardsAndRest(action.payload.filter(selected => selected).length);
        
            return {...state,
                player: new PlayingCards([...state.player.ordCards.filter((card, index) => !action.payload[index]),
                                            ...changedCards.cards.ordCards]),
                deck: changedCards.restCards,
            };

        default: return state;
    }
}

const selected = (state = Array(5).fill(false), action) => {
    switch (action.type) {
        case select.type: return [...state.slice(0, action.payload.id),
                                action.payload.selected,
                               ...state.slice(action.payload.id + 1, state.length)];
        case newGame.type: return Array(5).fill(false);
        case change.type : return Array(5).fill(false);
        
        default: return state;
    }
}

const rounds = (state = 0, action) => {
    switch (action.type) {
        case newGame.type: return 0;
        case change.type: return state + 0.5;
        case nextRound.type: return state === 2 ? state : Math.floor(state) + 1;
        
        default: return state;
    }
}

const tokkens = (state = 20000, action) => {
    switch (action.type) {
        case bet.type: return state - action.payload;

        default: return state;
    }
}

const allReducers = combineReducers({ handsAndDeck, selected, rounds, tokkens });

export default allReducers;