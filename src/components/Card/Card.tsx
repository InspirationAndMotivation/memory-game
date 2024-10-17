import React from 'react';
import './Card.scss';
import { ICard } from '../../interfaces/ICard';

const Card = (props: {
  card: ICard;
  handleClick: any;
  flipped: boolean;
  disabled: boolean;
}) => {
  const { card, handleClick, flipped, disabled } = props;

  const handleChoice = () => {
    if (!disabled) handleClick(card);
  };

  return (
    <div className="Card">
      <div className={`${flipped ? 'Flipped' : ''}`}>
        {flipped && (
          <img className="Card-Front" src={card.image} alt="Card Front"></img>
        )}

        <img
          className="Card-Back"
          src={'/img/cover.jpg'}
          alt="Card Back"
          onClick={handleChoice}
        ></img>
      </div>
    </div>
  );
};

export default Card;
