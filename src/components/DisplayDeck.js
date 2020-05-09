import React from 'react';
import { CardBack } from '.';
import { change } from '../models/poker';
import { connect } from 'react-redux';

const DisplayDeck = ({changeCards, selected, rounds}) => (
  <ul className="deck">
      <li><CardBack/></li>
      <li><CardBack/></li>
      <li><CardBack/></li>
      <li><CardBack/></li>
      <li><CardBack/></li>
      <li>
      {rounds === 1 ? <a className="card back" href='*' onClick={() => changeCards(selected)}>*</a>
                   : <CardBack/>}
      </li>
  </ul>
)

const mapStateToProps = ({ selected, rounds }) => ({
  selected,
  rounds,
})

const mapDispatchToProps = (dispatch) => ({
  changeCards: selected => {
      if(selected.filter(a=>a).length)
        dispatch(change(selected))

      //dispatch(nextRound())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayDeck);