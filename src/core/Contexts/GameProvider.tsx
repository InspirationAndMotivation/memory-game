import { useEffect, useState } from 'react';
import GameContext from './GameContext';

const mods = {
  easy: {
    name: 'easy',
    columnsNum: 4,
    rowsNum: 3,
  },
  normal: {
    name: 'normal',
    columnsNum: 5,
    rowsNum: 4,
  },
  hard: {
    name: 'hard',
    columnsNum: 6,
    rowsNum: 5,
  },
  // extreme: {
  //   name: 'extrem',
  //   columnsNum: 8,
  //   rowsNum: 7,
  // },
};

const GameProvider = ({ children }: any) => {
  const [mode, setMode] = useState(mods.easy);
  const [isSounds, setIsSounds] = useState(true);
  const [isMusic, setIsMusic] = useState(true);

  const setEasyMode = () => setMode(mods.easy);

  const setNormalMode = () => setMode(mods.normal);

  const setHardMode = () => setMode(mods.hard);

  const toggleSounds = () => setIsSounds(!isSounds);

  const toggleMusic = () => setIsMusic(!isMusic);

  return (
    <GameContext.Provider
      value={{
        mods,
        mode,
        setEasyMode,
        setNormalMode,
        setHardMode,
        isSounds,
        isMusic,
        toggleSounds,
        toggleMusic,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
