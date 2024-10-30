import { useState } from 'react';
import GameContext from './GameContext';

const difficulties = {
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

const mods = {
  casual: {
    name: 'casual',
  },
  tactic: {
    name: 'tactic',
  },
  race: {
    name: 'race',
  },
  apocalypse: {
    name: 'apocalypse',
  },
};

const GameProvider = ({ children }: any) => {
  const [mode, setMode] = useState(mods.casual);
  const [difficulty, setDifficulty] = useState(difficulties.easy);
  const [isSounds, setIsSounds] = useState(true);
  const [isMusic, setIsMusic] = useState(true);

  const setCasualMode = () => setMode(mods.casual);

  const setTacticMode = () => setMode(mods.tactic);

  const setRaceMode = () => setMode(mods.race);

  const setApocalypseMode = () => setMode(mods.apocalypse);

  const setEasyDifficulty = () => setDifficulty(difficulties.easy);

  const setNormalDifficulty = () => setDifficulty(difficulties.normal);

  const setHardDifficulty = () => setDifficulty(difficulties.hard);

  const toggleSounds = () => setIsSounds(!isSounds);

  const toggleMusic = () => setIsMusic(!isMusic);

  return (
    <GameContext.Provider
      value={{
        mods,
        mode,
        setCasualMode,
        setTacticMode,
        setRaceMode,
        setApocalypseMode,
        difficulties,
        difficulty,
        setEasyDifficulty,
        setNormalDifficulty,
        setHardDifficulty,
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
