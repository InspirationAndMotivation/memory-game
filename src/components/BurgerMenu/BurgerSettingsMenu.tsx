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
        <div className="Settings">
          <div className="Setting">Set 1</div>
          <div className="Setting">Set 2</div>
          <div className="Setting">Set 3</div>
          <div className="Setting" onClick={play}>
            Play
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerSettingsMenu;
