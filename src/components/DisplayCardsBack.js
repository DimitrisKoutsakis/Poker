import React from 'react';

import { CardBack } from '.';

const DisplayCardsBack = ({cards}) => (
  <ul className="table">
    {cards.ordCards.map((card) => (
        <li><CardBack {...card} /></li>
      ))}
  </ul>
)

export default DisplayCardsBack;
