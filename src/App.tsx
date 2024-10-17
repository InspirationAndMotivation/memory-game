import React, { useEffect, useState } from 'react';
import { ICard } from './interfaces/ICard';
import Card from './components/Card/Card';
import { AnimatePresence } from 'framer-motion';
import './App.scss';

const App = () => {
  // { id: 6, image: '/img/cards/sword-1.png', matched: false },

  const cardImages = [
    { id: 0, image: '/img/cards/chest-1.png', matched: false },
    { id: 1, image: '/img/cards/magic-artifact-1.png', matched: false },
    { id: 2, image: '/img/cards/magic-artifact-2.png', matched: false },
    { id: 3, image: '/img/cards/magnifying-glass-1.png', matched: false },
    { id: 4, image: '/img/cards/mana-bottle-1.png', matched: false },
    { id: 5, image: '/img/cards/relic-1.png', matched: false },
  ];

  const [cards, setCards] = useState<ICard[]>([]);
  const [firstChoice, setFirstChoice] = useState<ICard | null>(null);
  const [secondChoice, setSecondChoice] = useState<ICard | null>(null);
  const [turns, setTurns] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  // Start a game and shuffle cards
  const shuffleCards = () => {
    // Paste cards into array twice (because we need pairs of cards for game)
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.7)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle a card choice
  const handleChoice = (card: ICard) => {
    // Check if first choice has been already made (so it's set), if so, this choice will be second
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  // When turn is finished - we need to increase turn and reset choices
  const nextTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns((prevTurn) => prevTurn + 1);
    setIsDisabled(false);
  };

  const isFlipped = (card: ICard) => {
    return card === firstChoice || card === secondChoice || card.matched;
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    // Compare cards and if they matched - set matched property into true
    if (firstChoice && secondChoice) {
      setIsDisabled(true);
      if (firstChoice.image === secondChoice.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === firstChoice.image) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      }
      setTimeout(() => nextTurn(), 1000);
    }
  }, [firstChoice, secondChoice]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Magic Memory game</h1>
        <button className="Start-Button" onClick={shuffleCards}>
          Start
        </button>
        {turns > 0 ? (
          <p className="Turns-Count">Turn: {turns}</p>
        ) : (
          <p className="Tip">Pick your first pair of cards!</p>
        )}
      </header>
      <div className="Game-Canvas">
        <div className="Cards-Grid">
          <AnimatePresence>
            {cards &&
              cards.map((card: ICard) => {
                return (
                  <Card
                    key={card.id}
                    card={card}
                    handleClick={handleChoice}
                    flipped={isFlipped(card)}
                    disabled={isDisabled}
                  />
                );
              })}
          </AnimatePresence>
        </div>
      </div>
      <footer className="App-footer">
        <p>
          Made by{' '}
          <a href="https://inspirationandmotivation.github.io/">Anastasia</a> ©
          2024
        </p>
      </footer>
    </div>
  );
};

export default App;
