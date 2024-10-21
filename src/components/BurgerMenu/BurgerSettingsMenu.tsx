import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import './BurgerSettingsMenu.scss';
import ModeContext from '../../core/Contexts/ModeContext';

const BurgerSettingsMenu = (props: { open: boolean; setOpen: any }) => {
  const music = new Audio('./sounds/Night_of_Mystery.m4a');
  const { open, setOpen } = props;
  const { mode, setEasyMode, setNormalMode, setHardMode } =
    useContext(ModeContext);

  const [volume, setVolume] = useState<number>(20);

  // const volumeRef = useRef(null);

  const play = () => {
    music.volume = volume / 100;
    music.play();
  };

  const handleVolumeChange = (event: any) => {
    setVolume(event.target.value);
  };

  useEffect(() => {
    music.volume = volume / 100;
    // music.play();
  }, [volume]);

  useEffect(() => {
    console.log(mode);
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
            <div onClick={play}> Play music</div>
            <input
              type="range"
              className="Volume-Slider"
              min={0}
              max={100}
              step={1}
              value={volume}
              onChange={handleVolumeChange}
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
