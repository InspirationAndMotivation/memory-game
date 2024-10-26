import { createContext } from 'react';

// Default properties
export default createContext({
  mods: {},
  mode: {
    name: 'easy',
    columnsNum: 4,
    rowsNum: 3,
  },
  setEasyMode: () => {},
  setNormalMode: () => {},
  setHardMode: () => {},
  isSounds: true,
  isMusic: true,
  toggleSounds: () => {},
  toggleMusic: () => {},
});
