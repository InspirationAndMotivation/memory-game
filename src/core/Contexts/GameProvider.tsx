import { useState } from 'react';
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
  // extrem: {
  //   name: 'extrem',
  //   columnsNum: 8,
  //   rowsNum: 7,
  // },
};

const GameProvider = ({ children }: any) => {
  const [mode, setMode] = useState(mods.easy);
  const [isSounds, setIsSounds] = useState(true);
  const [isMusic, setIsMusic] = useState(false);
  const [volume, setVolume] = useState(0.2);

  const setEasyMode = () => setMode(mods.easy);

  const setNormalMode = () => setMode(mods.normal);

  const setHardMode = () => setMode(mods.hard);

  const toggleSounds = () => setIsSounds(!isSounds);

  const toggleMusic = () => setIsMusic(!isMusic);

  const handleVolume = (vol: number) => setVolume(vol / 100);

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
        volume,
        handleVolume,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
