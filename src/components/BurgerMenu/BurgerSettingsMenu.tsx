import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useContext,
  RefObject,
} from 'react';
import './BurgerSettingsMenu.scss';
import GameContext from '../../core/Contexts/GameContext';

const BurgerSettingsMenu = (props: {
  open: boolean;
  setOpen: any;
  audioRef: RefObject<HTMLAudioElement>;
}) => {
  const { open, setOpen, audioRef } = props;
  const {
    mode,
    setEasyMode,
    setNormalMode,
    setHardMode,
    isSounds,
    isMusic,
    toggleMusic,
    toggleSounds,
  } = useContext(GameContext);

  // Default volume 10%
  const [volume, setVolume] = useState<number>(0.1);

  const handleMusic = () => {
    toggleMusic();
  };

  const handleSounds = () => {
    toggleSounds();
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      // console.log('Player volume changed to:' + audioRef.current.volume);
    }
  }, [volume, audioRef]);

  useEffect(() => {
    // console.log(mode);
  }, [mode]);

  return (
    <div className="Burger-Settings-Menu">
      <img
        className="Settings-Button"
        src={'/img/settings.png'}
        alt="Settings Button"
        onClick={() => setOpen(!open)}
      ></img>
      {open && (
        <div className={`Settings ${open ? 'Active' : ''}`}>
          <div className="Setting">
            <div> Play music</div>
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
              <legend>Select a game mode:</legend>
              <div className="Radio-Group">
                <label htmlFor="easy" className="Radio-Element">
                  <input
                    type="radio"
                    id="easy"
                    name="mode"
                    value="easy"
                    checked={mode.name === 'easy'}
                    onChange={() => setEasyMode()}
                  />{' '}
                  Easy
                </label>

                <label htmlFor="normal" className="Radio-Element">
                  <input
                    type="radio"
                    id="normal"
                    name="mode"
                    value="normal"
                    checked={mode.name === 'normal'}
                    onChange={() => setNormalMode()}
                  />{' '}
                  Normal
                </label>

                <label htmlFor="hard" className="Radio-Element">
                  <input
                    type="radio"
                    id="hard"
                    name="mode"
                    value="hard"
                    checked={mode.name === 'hard'}
                    onChange={() => setHardMode()}
                  />{' '}
                  Hard
                </label>
              </div>
            </fieldset>
          </div>
          <div className="Setting">
            Setting 3 (Additional parameters of game)
          </div>
          <div className="Setting">
            Settting 4 (Here will be placed Top Scores Table)
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerSettingsMenu;
