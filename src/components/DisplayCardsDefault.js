import React from 'react';
import {PokerHandRate} from '.'
import { CardDefault } from '.';

const DisplayCardsDefault = ({cards}) => (
  <div>
     <ul className="table">
      {cards.ordCards.map((card) => (
        <li><CardDefault {...card} /></li>
      ))}
     </ul>
    
    <div className="handRate">{PokerHandRate(cards)}</div>
  </div>
)

export default DisplayCardsDefault;