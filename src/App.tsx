import React, { useEffect, useState } from 'react';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import { ICard } from './interfaces/ICard';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import AlertPopup from './components/AlertPopup/AlertPopup';
import BurgerMenu from './components/BurgerMenu/BurgerMenu';
import Card from './components/Card/Card';
import './App.scss';

const App = () => {
  const cardImages = [
    { id: 0, image: '/img/cards/chest-1.png', name: 'Chest', matched: false },
    {
      id: 1,
      image: '/img/cards/magic-artifact-1.png',
      name: 'Artifact Feather',
      matched: false,
    },
    {
      id: 2,
      image: '/img/cards/magic-artifact-2.png',
      name: 'Artifact Tear',
      matched: false,
    },
    {
      id: 3,
      image: '/img/cards/magnifying-glass-1.png',
      name: 'Magnifying Glass',
      matched: false,
    },
    {
      id: 4,
      image: '/img/cards/mana-bottle-1.png',
      name: 'Mana Potion',
      matched: false,
    },
    { id: 5, image: '/img/cards/relic-1.png', name: 'Relic', matched: false },
    {
      id: 6,
      image: '/img/cards/cauldron-1.png',
      name: 'Cauldron',
      matched: false,
    },
    {
      id: 7,
      image: '/img/cards/dragon-head-1.png',
      name: 'Dragon Head',
      matched: false,
    },
    {
      id: 8,
      image: '/img/cards/magic-book-1.png',
      name: 'Magic Book',
      matched: false,
    },
    {
      id: 9,
      image: '/img/cards/magic-gem-1.png',
      name: 'Magic Gem',
      matched: false,
    },
    {
      id: 10,
      image: '/img/cards/magic-hat-1.png',
      name: 'Magic Hat',
      matched: false,
    },
    {
      id: 11,
      image: '/img/cards/magic-lamp-1.png',
      name: 'Magic Lamp',
      matched: false,
    },
    {
      id: 12,
      image: '/img/cards/triangle-cube-1.png',
      name: 'Triangle Dice',
      matched: false,
    },
    {
      id: 13,
      image: '/img/cards/witch-cat-1.png',
      name: 'Witch`s Cat',
      matched: false,
    },
    {
      id: 14,
      image: '/img/cards/sword-1.png',
      name: 'Short Sword',
      matched: false,
    },
  ];

  const [win, setWin] = useState<boolean>(false);
  const [cards, setCards] = useState<ICard[]>([]);
  const [cardsAmount, setCardsAmount] = useState<number>(6);
  const [firstChoice, setFirstChoice] = useState<ICard | null>(null);
  const [secondChoice, setSecondChoice] = useState<ICard | null>(null);
  const [turns, setTurns] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  // Start a game and shuffle cards
  const shuffleCards = () => {
    // Pick only needed amount of cards
    const unshuffledCards = cardImages
      .sort(() => Math.random() - 0.81)
      .slice(0, cardsAmount);
    // Paste cards into array twice (because we need pairs of cards for game)
    const shuffledCards = [...unshuffledCards, ...unshuffledCards]
      .sort(() => Math.random() - 0.7)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setWin(false);
    setFirstChoice(null);
    setSecondChoice(null);
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
    shuffleCards(); // eslint-disable-next-line
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

  useEffect(() => {
    // Check if all cards in array are matched, if so - game is over, so we're setting a win
    const isAllCardsMatched = cards.find((card) => !card.matched);
    if (!isAllCardsMatched) setWin(true);
  }, [cards]);

  useEffect(() => {
    if (win) {
      console.log('HURRA! YOU WON THE GAME!');
      confetti();
    } else console.log('New game started!');
  }, [win]);

  return (
    <div className="App">
      <header className="App-Header">
        <BurgerMenu />
        <AudioPlayer />
      </header>
      <div className="Game-Panel">
        <h1>Magic Memory game</h1>
        <button className="Start-Button" onClick={shuffleCards}>
          Start
        </button>
        <div className="Score-Panel">
          {turns > 0 ? (
            <p className="Turns-Count">Turn: {turns}</p>
          ) : (
            <p className="Tip">Pick your first pair of cards!</p>
          )}
        </div>
      </div>
      <div className="Game-Canvas">
        <div className="Cards-Grid">
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
        </div>
      </div>
      <AlertPopup
        title={'Hurra! You won!'}
        text={'Now you can enter your name to '}
      />
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
