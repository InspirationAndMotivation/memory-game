import React from 'react';
import './BurgerSettingsMenu.scss';

const BurgerSettingsMenu = (props: { open: boolean; setOpen: any }) => {
  const { open, setOpen } = props;

  const music = new Audio('./sounds/Night_of_Mystery.m4a');

  const play = () => {
    music.volume = 0.2;
    music.play();
  };

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
          <div className="Setting" onClick={play}>
            Play music
          </div>
          <div className="Setting">Setting 2 (Mods are planned)</div>
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
