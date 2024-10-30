import { createContext } from 'react';

// Default properties
export default createContext({
  mods: {},
  mode: {
    name: 'casual',
  },
  setCasualMode: () => {},
  setTacticMode: () => {},
  setRaceMode: () => {},
  setApocalypseMode: () => {},
  difficulties: {},
  difficulty: {
    name: 'easy',
    columnsNum: 4,
    rowsNum: 3,
  },
  setEasyDifficulty: () => {},
  setNormalDifficulty: () => {},
  setHardDifficulty: () => {},
  isSounds: true,
  isMusic: true,
  toggleSounds: () => {},
  toggleMusic: () => {},
});
