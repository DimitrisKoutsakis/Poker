import React from 'react';
import toNumber from 'lodash';

const Card = (rank, suit) => (
  <div> 
    <span className={'rank'}>{rank}</span>
    <span className={'suit'}
      dangerouslySetInnerHTML={{__html: `&${suit};`}} />
  </div>
);

const CardDefault = ({ rank, suit }) => (
  <div className={`card rank-${toNumber(rank)<=10 ? "a" : rank.toLowerCase()} ${suit}`}>
      {Card(rank, suit)}
    </div>
)

const CardStrong = (card) => (
  <strong>
      {CardDefault(card)}
  </strong>
)

export { CardDefault, CardStrong };