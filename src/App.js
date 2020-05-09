import React, { Component } from 'react';

import './styles/cards.css';
import './app.css';

import { DisplayCardsBack, DisplayDeck, PlayerIsWinner, NewGame, RevealCards } from './components';

class App extends Component {
  Cards = NewGame();

  resetGame = ()=> {
    const newCards = NewGame(this.Cards);
    this.setState({
      newCards
    });
  }

  showCards = ()=> {
    this.Cards.showOpponent = true;
    const opponentCards = this.Cards.showOpponent;
    this.setState({
      opponentCards
    });
  }

  render() {
    return (
      <div className="App">
        <div className="header">Poker</div>
        <div className="playingCards">
          <div className="players">
            <div className="sides">
              <div className="money">25.000 $</div>
              <div className="betOpponent">500 $</div>
            </div>
            <div className="cards">{ this.Cards.showOpponent ? RevealCards(this.Cards.opponent) : DisplayCardsBack(this.Cards.opponent)}</div>       
          </div>

          <div className="middle">
            <button className="deck" onClick={ this.resetGame }> { DisplayDeck() } </button>
            <div>
              <button className="showCards" onClick={ this.showCards }> Show Cards </button>
            </div>
            <div className="winner">
              Winner: { PlayerIsWinner(this.Cards) ? 'Player' : 'Opponent' }
            </div>
          </div>

          <div className="players">
            <div className="sides">
              <div className="money">25.000 $</div>
              <input type="text" className="actions" placeholder="Bet"/>
            </div>
            <div className="cards">{ RevealCards(this.Cards.player) }</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;