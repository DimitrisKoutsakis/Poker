import React from 'react';
import { connect } from 'react-redux';
import { PlayerIsWinner } from '.';

const Status = ({handsAndDeck, rounds}) => {
    switch(rounds) {
        case 1 : return <div>Change Cards</div>
        case 2 : return <div>Winner: {PlayerIsWinner(handsAndDeck)? 'Player' : 'Opponent'}</div>
        default: return <div>Place your bet</div>
    }
}

const mapStateToProps = ({handsAndDeck, rounds}) => ({
    handsAndDeck,
    rounds
})

export default connect(mapStateToProps)(Status);