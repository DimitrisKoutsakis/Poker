import React from 'react';
import { connect } from 'react-redux';
import { select } from '../models/poker'
import { CardStrong, CardDefault, PokerHandRate } from '.';

const DisplayCardsActive = ({ cards, selected, clickCard }) => (
  <div>
    <ul className="table">
      {cards.ordCards.map((card, index) => (
        <li onClick={() => clickCard(index, selected)}> {selected[index] ? CardStrong(card) : CardDefault(card)}</li>
      ))}
    </ul>
    <div className="handRate">{PokerHandRate(cards)}</div>
  </div>
)

const mapStateToProps = ({ selected }) => ({
  selected,
})

const mapDispatchToProps = (dispatch, {cards}) => ({
  clickCard: (id, selected) => {
    const maxSelected = cards.hasAce() ? 4 : 3;

    if(selected[id] || selected.filter(card => card).length < maxSelected)
      dispatch(select({id, selected: !selected[id]}))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCardsActive);
