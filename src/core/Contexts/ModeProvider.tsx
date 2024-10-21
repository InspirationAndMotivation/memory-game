import { useState } from 'react';
import ModeContext from './ModeContext';

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

const ModeProvider = ({ children }: any) => {
  const [mode, setMode] = useState(mods.easy);

  const setEasyMode = () => setMode(mods.easy);

  const setNormalMode = () => setMode(mods.normal);

  const setHardMode = () => setMode(mods.hard);

  return (
    <ModeContext.Provider
      value={{ mods, mode, setEasyMode, setNormalMode, setHardMode }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export default ModeProvider;
