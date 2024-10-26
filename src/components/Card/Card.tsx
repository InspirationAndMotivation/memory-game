import React, { useContext, useState } from 'react';
import { ICard } from '../../interfaces/ICard';
import { play } from '../../core/Services/SoundsService/SoundsService';
import './Card.scss';
import GameContext from '../../core/Contexts/GameContext';

const Card = (props: {
  card: ICard;
  handleClick: any;
  flipped: boolean;
  disabled: boolean;
}) => {
  const { card, handleClick, flipped, disabled } = props;
  const { isSounds } = useContext(GameContext);
  const [wrongchoice, setWrongChoice] = useState<number>(0);

  const handleChoice = () => {
    if (!disabled) handleClick(card);
    else handlePickedAlready();
  };

  const handlePickedAlready = () => {
    setWrongChoice(1);
    if (isSounds) play('wrongchoice');
  };

  return (
    <div className="Card">
      <div className={`${flipped ? 'Flipped' : ''}`}>
        <img
          className="Card-Front"
          src={card.image}
          alt={card.name}
          onClick={handlePickedAlready}
          onAnimationEnd={() => setWrongChoice(0)}
          wobble={wrongchoice}
        />

        <img
          className="Card-Back"
          src={'/img/cover.jpg'}
          alt="Card Back"
          onClick={handleChoice}
        />
      </div>
    </div>
  );
};

export default Card;
