import React from 'react';
import { ICard } from '../../interfaces/ICard';
import { motion } from 'framer-motion';
import './Card.scss';

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
      <motion.div
        className={`${flipped ? 'Flipped' : ''}`}
        initial={{ scale: 0 }}
        animate={{ scale: 0.95, transition: { delay: 0.4, type: 'spring' } }}
      >
        {flipped && (
          <img className="Card-Front" src={card.image} alt="Card Front"></img>
        )}

        <img
          className="Card-Back"
          src={'/img/cover.jpg'}
          alt="Card Back"
          onClick={handleChoice}
        ></img>
      </motion.div>
    </div>
  );
};

export default Card;
