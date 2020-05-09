import React from 'react';
import { DisplayCardsActive, DisplayCardsBack, DisplayCardsDefault, DisplayDeck, Status } from './components/';
import { newGame, nextRound, bet } from './models/poker';
import { connect } from 'react-redux';
import './styles/cards.css';
import './app-redux.css';

const App = ({player, opponent, rounds, newGame, tokkens, bet}) => (
    <div className='App'>
        <div className="playingCards">
            <div className="opponent">
                {rounds === 2 ? <DisplayCardsDefault cards={opponent} /> : <DisplayCardsBack cards={opponent} />}         
            </div>
            <div className="player">
                {rounds === 1 ? <DisplayCardsActive cards={player} /> : <DisplayCardsDefault cards={player} />}
            </div>
            <div className="deck">
                <DisplayDeck />
            </div>
        </div>
        <button className='newGame' onClick={() => newGame()}>
            New Game
        </button>
        <div>
            <form onSubmit={value => {
                bet(value)
                value.preventDefault()
            }}>
                <input type="text" placeholder="Bet" />
            </form>
        </div>
        <div>{tokkens}</div>
        <Status />
    </div>
)

const mapStateToProps = ({ handsAndDeck, rounds, tokkens }) => ({
    ...handsAndDeck,
    rounds,
    tokkens,
})

const mapDispatchToProps = (dispatch) => ({
    newGame: () => {
        dispatch(newGame());
    },
    bet: value => {
            dispatch(nextRound());
            dispatch(bet(Number(value.target.querySelector('input').value)));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(App);