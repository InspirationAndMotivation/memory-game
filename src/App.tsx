import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import { ICard } from './interfaces/ICard';
import GameContext from './core/Contexts/GameContext';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import AlertPopup from './components/AlertPopup/AlertPopup';
import BurgerMenu from './components/BurgerMenu/BurgerSettingsMenu';
import BurgerSettingsMenu from './components/BurgerMenu/BurgerSettingsMenu';
import Card from './components/Card/Card';
import './App.scss';
import { play } from './core/Services/SoundsService/SoundsService';

const App = () => {
  const { mode } = useContext(GameContext);
  const { isSounds, isMusic } = useContext(GameContext);
  const getCardsAmount = (columns: number, rows: number) =>
    (columns * rows) / 2;

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
  const [open, setOpen] = useState(false);
  const [win, setWin] = useState<boolean>(false);
  const [cards, setCards] = useState<ICard[]>([]);
  const [cardsAmount, setCardsAmount] = useState<number>(
    getCardsAmount(mode.columnsNum, mode.rowsNum)
  );
  const [firstChoice, setFirstChoice] = useState<ICard | null>(null);
  const [secondChoice, setSecondChoice] = useState<ICard | null>(null);
  const [turns, setTurns] = useState<number>(0);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isStopwatchStarted, setIsStopwatchStarted] = useState(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [showMobileWarning, setShowMobileWarning] = useState(false);

  const getMinutes = (time: number) => Math.floor((time % 360000) / 6000);
  const getSeconds = (time: number) => Math.floor((time % 6000) / 100);
  const formatZeroTime = (time: number) => (time < 10 ? `0${time}` : time);

  const isFlipped = (card: ICard) => {
    return card === firstChoice || card === secondChoice || card.matched;
  };

  const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  };

  const [width, height] = useWindowSize();

  const resetGame = () => {
    setWin(false);
    setFirstChoice(null);
    setSecondChoice(null);
    setTime(0);
    setTurns(0);
    setMatchedPairs(0);
  };

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

    resetGame();
    setCards(shuffledCards);
  };

  // Handle a card choice
  const handleChoice = (card: ICard) => {
    if (firstChoice && !isStopwatchStarted) setIsStopwatchStarted(true);
    if (firstChoice && isSounds) play('flip1');
    else if (isSounds) play('flip2');

    // Check if first choice has been already made (so it's set), if so, this choice will be second
    return firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  // When turn is finished - we need to increase turn and reset choices
  const nextTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns((prevTurn) => prevTurn + 1);
    setIsDisabled(false);
  };

  useEffect(() => {
    shuffleCards(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    shuffleCards(); // eslint-disable-next-line
  }, [cardsAmount]);

  useEffect(() => {
    // Compare cards and if they matched - set matched property into true
    if (firstChoice && secondChoice) {
      setIsDisabled(true);
      if (firstChoice.image === secondChoice.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === firstChoice.image) {
              if (isSounds) play('matched');
              setMatchedPairs(matchedPairs + 1);
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      }
      setTimeout(() => nextTurn(), 1100);
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    let interval: number | NodeJS.Timeout | undefined;
    if (isStopwatchStarted) {
      // Setting time from 0 to 1 every 10 milisecond using setInterval method
      interval = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(interval);
  }, [isStopwatchStarted, time]);

  useEffect(() => {
    if (matchedPairs === cardsAmount) {
      setWin(true);
    }
  }, [matchedPairs]);

  useEffect(() => {
    if (win) {
      setIsStopwatchStarted(false);
      console.log('HURRA! YOU WON THE GAME!');
      if (isSounds) play('win');
      setTimeout(() => confetti(), 400);
    } else console.log('New game started!');
  }, [win]);

  useEffect(() => {
    setCardsAmount(getCardsAmount(mode.columnsNum, mode.rowsNum));
  }, [mode]);

  useEffect(() => {
    console.log(window.innerWidth);
    if (width <= 800 || height <= 1000) setShowMobileWarning(true);
    else setShowMobileWarning(false);
  }, [width, height]);

  return (
    <div className="App">
      {/* <iframe
        src="sounds/silence.mp3"
        allow="autoplay"
        id="audio"
        style={{ display: 'none' }}
      ></iframe>
      <audio id="player" autoPlay loop muted={!isMusic}>
        <source src="sounds/Night_of_Mystery.m4a" type="audio/mp3" />
      </audio> */}
      {showMobileWarning ? (
        <>
          <h1>Sorry!</h1>
          <p>
            This application isn't adapted for mobile view yet. <br /> Keep
            abreast and it could change soon!
          </p>
        </>
      ) : (
        <>
          <header className="App-Header">
            <h1>Magic Memory game</h1>
            <button className="Start-Button" onClick={shuffleCards}>
              Start
            </button>
          </header>
          <div className="Game-Info-Panel">
            <div className="Score-Panel">
              {turns > 0 ? (
                <div className="Stats">
                  <p className="Turns-Count">Turn: {turns}</p>
                  <p className="Paired-Cards-Count">
                    Paired: {matchedPairs} of {cardsAmount}
                  </p>
                  <p className="Time-Count">
                    Time:{` `}
                    {formatZeroTime(getMinutes(time))}:
                    {formatZeroTime(getSeconds(time))}
                  </p>
                </div>
              ) : (
                <p className="Tip">Pick your first pair of cards!</p>
              )}
            </div>
          </div>
          <div className="Game-Canvas">
            <div
              className={`Cards-Grid ${
                mode.name === 'hard'
                  ? 'Hard'
                  : mode.name === 'normal'
                  ? 'Normal'
                  : 'Easy'
              }`}
            >
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
          <BurgerSettingsMenu open={open} setOpen={setOpen} />
        </>
      )}
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
