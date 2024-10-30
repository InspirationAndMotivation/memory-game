import React, {
  useEffect,
  useState,
  useContext,
  RefObject,
  useRef,
} from 'react';
import GameContext from '../../core/Contexts/GameContext';
import './BurgerSettingsMenu.scss';

const BurgerSettingsMenu = (props: {
  open: boolean;
  setOpen: any;
  audioRef: RefObject<HTMLAudioElement>;
}) => {
  const { open, setOpen, audioRef } = props;
  const {
    mode,
    setCasualMode,
    setTacticMode,
    setRaceMode,
    setApocalypseMode,
    difficulty,
    setEasyDifficulty,
    setNormalDifficulty,
    setHardDifficulty,
    isSounds,
    isMusic,
    toggleMusic,
    toggleSounds,
  } = useContext(GameContext);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  // Default volume 10%
  const [volume, setVolume] = useState<number>(0.1);

  const handleMusic = () => {
    toggleMusic();
  };

  const handleSounds = () => {
    toggleSounds();
  };

  useEffect(() => {
    console.log(open);
  }, [open]);

  const handleClick = (event: any) => {
    if (
      burgerMenuRef.current &&
      !burgerMenuRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      // console.log('Player volume changed to:' + audioRef.current.volume);
    }
  }, [volume, audioRef]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Burger-Settings-Menu" ref={burgerMenuRef}>
      <img
        className="Settings-Button"
        id="settingsButton"
        src={'/img/settings.png'}
        alt="Settings Button"
        onClick={() => setOpen(!open)}
      ></img>
      <div className={`Settings ${open ? 'Active' : ''}`}>
        <div className="Setting">
          <p className="Settings-Title">Sounds settings</p>
          <img
            className="Sounds-Button"
            src={isSounds ? '/img/sound.png' : '/img/mute_sound.png'}
            alt="Sounds Button"
            onClick={handleSounds}
          ></img>
          <img
            className="Music-Button"
            src={isMusic ? '/img/music.png' : '/img/mute_music.png'}
            alt="Music Button"
            onClick={handleMusic}
          ></img>
          <input
            type="range"
            className="Volume-Slider"
            id="slider"
            min={0}
            max={1}
            step={0.05}
            value={!isMusic ? 0 : volume}
            onChange={(e: any) => setVolume(e.target.value)}
          />
        </div>
        <div className="Setting">
          <fieldset className="Game-Mode-Setting">
            <p className="Settings-Title">Select a difficulty:</p>
            <div className="Radio-Group">
              <label htmlFor="easy" className="Radio-Element">
                <input
                  type="radio"
                  id="easy"
                  name="difficulty"
                  value="easy"
                  checked={difficulty.name === 'easy'}
                  onChange={() => setEasyDifficulty()}
                />{' '}
                Easy
              </label>

              <label htmlFor="normal" className="Radio-Element">
                <input
                  type="radio"
                  id="normal"
                  name="difficulty"
                  value="normal"
                  checked={difficulty.name === 'normal'}
                  onChange={() => setNormalDifficulty()}
                />{' '}
                Normal
              </label>

              <label htmlFor="hard" className="Radio-Element">
                <input
                  type="radio"
                  id="hard"
                  name="difficulty"
                  value="hard"
                  checked={difficulty.name === 'hard'}
                  onChange={() => setHardDifficulty()}
                />{' '}
                Hard
              </label>
            </div>
          </fieldset>
        </div>
        <div className="Setting">
          <fieldset className="Game-Parameters-Setting">
            <p className="Settings-Title">Select a game mode:</p>
            <div className="Radio-Group">
              <label htmlFor="casual" className="Radio-Element Tooltip">
                <input
                  type="radio"
                  id="casual"
                  name="mode"
                  value="casual"
                  checked={mode.name === 'casual'}
                  onChange={() => setCasualMode()}
                />{' '}
                Casual
                <span className="Tooltip-Text">
                  Dive into <b>Casual</b>, the ultimate no-pressure mode!
                  <br />
                  Enjoy pairing cards at your own pace without any complications
                  or limitations. Relax, explore the board, and have fun as you
                  find matches in this laid-back environment.
                  <br />
                  Perfect for casual play!
                </span>
              </label>

              <label htmlFor="tactic" className="Radio-Element Tooltip">
                <input
                  type="radio"
                  id="tactic"
                  name="mode"
                  value="tactic"
                  checked={mode.name === 'tactic'}
                  onChange={() => setTacticMode()}
                />{' '}
                Tactic
                <span className="Tooltip-Text">
                  Welcome to <b>Tactic</b>, where every move counts!
                  <br />
                  Your goal is to pair the cards in the fewest turns possible.
                  Plan your moves carefully, remember card placements, and
                  showcase your tactical skills as you aim for the lowest score.
                  <br />
                  How efficiently can you match them all?
                </span>
              </label>

              <label htmlFor="race" className="Radio-Element Tooltip">
                <input
                  type="radio"
                  id="race"
                  name="mode"
                  value="race"
                  checked={mode.name === 'race'}
                  onChange={() => setRaceMode()}
                />{' '}
                Race
                <span className="Tooltip-Text">
                  In <b>Race</b>, the clock is ticking!
                  <br />
                  Pair the cards as quickly as possible before time runs out.
                  Challenge yourself to make the fastest matches and see how
                  many pairs you can find under pressure.
                  <br />
                  Will you rise to the challenge?
                </span>
              </label>

              <label htmlFor="apocalypse" className="Radio-Element Tooltip">
                <input
                  type="radio"
                  id="apocalypse"
                  name="mode"
                  value="apocalypse"
                  checked={mode.name === 'apocalypse'}
                  onChange={() => setApocalypseMode()}
                />{' '}
                Apocalypse
                <span className="Tooltip-Text">
                  Enter <b>Apocalypse</b>, mode for experienced players, where
                  speed meets skill!
                  <br />
                  In this mode, you must pair the cards as quickly as possible
                  while also minimizing your turns. Balance the thrill of racing
                  against the clock with the need for careful planning.
                  <br />
                  Can you make swift decisions and outsmart the timer to achieve
                  the best score? Test your memory and strategy in this
                  fast-paced challenge!
                </span>
              </label>
            </div>
          </fieldset>
        </div>
        <div className="Setting">
          <p className="Settings-Title">
            Settting 4 (Here will be placed Top Scores Table)
          </p>
        </div>
      </div>
    </div>
  );
};

export default BurgerSettingsMenu;
