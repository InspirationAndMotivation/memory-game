import React, {
  RefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { play } from './core/Services/SoundsService/SoundsService';
import { ICard } from './interfaces/ICard';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import GameContext from './core/Contexts/GameContext';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import ScorePanel from './components/ScorePanel/ScorePanel';
// import AlertPopup from './components/AlertPopup/AlertPopup';
import BurgerSettingsMenu from './components/BurgerMenu/BurgerSettingsMenu';
import Card from './components/Card/Card';
import './App.scss';

const App = () => {
  const { mode, difficulty, isSounds } = useContext(GameContext);
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

  const modsParameters = {
    casual: { turns: 0, time: 0 },
    tactic: { easy: 8, normal: 20, hard: 35 },
    race: { easy: 2000, normal: 4500, hard: 6500 }, // 00:20, 00:45, 1:05
    apocalypse: {
      easy: { turns: 13, time: 2500 }, // 00:25
      normal: { turns: 25, time: 5500 }, // 00:55
      hard: { turns: 40, time: 8000 }, // 1:20
    },
  };
  const [open, setOpen] = useState(false);
  const [win, setWin] = useState<boolean>(false);
  const [lose, setLose] = useState<boolean>(false);
  const [cards, setCards] = useState<ICard[]>([]);
  const [cardsAmount, setCardsAmount] = useState<number>(
    getCardsAmount(difficulty.columnsNum, difficulty.rowsNum)
  );
  const [firstChoice, setFirstChoice] = useState<ICard | null>(null);
  const [secondChoice, setSecondChoice] = useState<ICard | null>(null);
  const [turns, setTurns] = useState<number>(0);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isStopwatchStarted, setIsStopwatchStarted] = useState(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [showMobileWarning, setShowMobileWarning] = useState(false);

  // Reference for audio component
  const audioPlayer = useRef<HTMLAudioElement>(null);

  const isFlipped = (card: ICard) => {
    return card === firstChoice || card === secondChoice || card.matched;
  };

  const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

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

  const getCurrentDifficulty = () => {
    const currentDifficulty =
      difficulty.name === 'easy'
        ? 'easy'
        : difficulty.name === 'normal'
        ? 'normal'
        : 'hard';
    return currentDifficulty;
  };

  const handleTimeResetting = () => {
    const currentDifficulty = getCurrentDifficulty();

    if (mode.name === 'race') {
      setTime(modsParameters['race'][currentDifficulty]);
    } else if (mode.name === 'apocalypse') {
      setTime(modsParameters['apocalypse'][currentDifficulty]['time']);
    } else setTime(0);
  };

  const handleTurnsResetting = () => {
    const currentDifficulty = getCurrentDifficulty();

    if (mode.name === 'tactic') {
      setTurns(modsParameters['tactic'][currentDifficulty]);
    } else if (mode.name === 'apocalypse') {
      setTurns(modsParameters['apocalypse'][currentDifficulty]['turns']);
    } else setTurns(0);
  };

  const resetGame = () => {
    setWin(false);
    setLose(false);
    setFirstChoice(null);
    setSecondChoice(null);
    handleTimeResetting();
    handleTurnsResetting();
    setIsStopwatchStarted(false);
    setMatchedPairs(0);
    setIsDisabled(false);
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

  // Handle if card is choosen already
  const handleFlippedAlready = () => {
    if (isSounds) play('wrongchoice');
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
    if (mode.name === 'tactic' || mode.name === 'apocalypse')
      setTurns((prevTurn) => prevTurn - 1);
    else setTurns((prevTurn) => prevTurn + 1);
    setIsDisabled(false);
  };

  useEffect(() => {
    shuffleCards(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    shuffleCards(); // eslint-disable-next-line
  }, [cardsAmount, mode]);

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
    // eslint-disable-next-line
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    let interval: number | NodeJS.Timeout | undefined;
    if (isStopwatchStarted) {
      if (mode.name === 'race' || mode.name === 'apocalypse') {
        // Setting time from 1 to 0 every 10 milisecond using setInterval method
        interval = setInterval(() => setTime(time - 1), 10);
      } else {
        // Setting time from 0 to 1 every 10 milisecond using setInterval method
        interval = setInterval(() => setTime(time + 1), 10);
      }
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [isStopwatchStarted, time]);

  // Win conditions
  useEffect(() => {
    if (matchedPairs === cardsAmount && !lose) {
      setWin(true);
    }
    // eslint-disable-next-line
  }, [matchedPairs]);

  // Lose conditions by time
  useEffect(() => {
    if (
      (mode.name === 'race' || mode.name === 'apocalypse') &&
      time === 0 &&
      !win
    ) {
      setLose(true);
    }
    // eslint-disable-next-line
  }, [time]);

  // Lose conditions by turns
  useEffect(() => {
    if (
      (mode.name === 'tactic' || mode.name === 'apocalypse') &&
      turns === 0 &&
      !win
    ) {
      setLose(true);
    }
    // eslint-disable-next-line
  }, [turns]);

  useEffect(() => {
    if (win) {
      setIsStopwatchStarted(false);
      setIsDisabled(true);

      if (isSounds) play('win');
      setTimeout(
        () =>
          confetti({
            particleCount: 120,
            spread: width / 10, // Spread 160 is perfect, but as for me - too big angle for mobile view
          }),
        400
      );
    } else console.log('New game started!');
    // eslint-disable-next-line
  }, [win]);

  useEffect(() => {
    if (lose) {
      setIsStopwatchStarted(false);
      setIsDisabled(true);

      if (isSounds) play('lose');
      const scalar = 2;
      const emoji = confetti.shapeFromText({ text: '😭', scalar });

      setTimeout(
        () =>
          confetti({
            shapes: [emoji],
            scalar: scalar,
            particleCount: 120,
            spread: width / 10, // Spread 160 is perfect, but as for me - too big angle for mobile view
          }),
        400
      );
    } else console.log('New game started!');
    // eslint-disable-next-line
  }, [lose]);

  useEffect(() => {
    if ((mode.name === 'race' || mode.name === 'apocalypse') && time === 500)
      play('timer');
  }, [time, mode]);

  useEffect(() => {
    setCardsAmount(getCardsAmount(difficulty.columnsNum, difficulty.rowsNum));
  }, [difficulty]);

  useEffect(() => {
    if (width <= 360 || height <= 670) setShowMobileWarning(true);
    else setShowMobileWarning(false);
  }, [width, height]);

  return (
    <div className="App">
      <AudioPlayer
        audioRef={audioPlayer as RefObject<HTMLAudioElement>}
      ></AudioPlayer>
      {showMobileWarning ? (
        <>
          <h1>Sorry!</h1>
          <p>
            This application isn't adapted for so small mobile view yet. <br />{' '}
            Keep abreast and it could change soon!
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
            <ScorePanel
              mode={mode}
              modsParameters={modsParameters}
              matchedPairs={matchedPairs}
              cardsAmount={cardsAmount}
              time={time}
              turns={turns}
              currentDifficulty={getCurrentDifficulty()}
              lose={lose}
              win={win}
              isGameStarted={isStopwatchStarted}
            ></ScorePanel>
          </div>
          <div className="Game-Canvas">
            <div
              className={`Cards-Grid ${
                difficulty.name === 'hard'
                  ? 'Hard'
                  : difficulty.name === 'normal'
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
                      handleClick={
                        isFlipped(card) ? handleFlippedAlready : handleChoice
                      }
                      flipped={isFlipped(card)}
                      disabled={isDisabled}
                    />
                  );
                })}
            </div>
          </div>
          <BurgerSettingsMenu
            open={open}
            setOpen={setOpen}
            audioRef={audioPlayer as RefObject<HTMLAudioElement>}
          />
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
