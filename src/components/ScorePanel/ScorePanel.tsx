import './ScorePanel.scss';

const ScorePanel = (props: {
  mode: any;
  modsParameters: any;
  matchedPairs: number;
  cardsAmount: number;
  time: number;
  turns: number;
  currentDifficulty: string;
  lose: boolean;
  win: boolean;
  isGameStarted: boolean;
}) => {
  const {
    mode,
    modsParameters,
    matchedPairs,
    cardsAmount,
    time,
    turns,
    currentDifficulty,
    lose,
    win,
    isGameStarted,
  } = props;

  const getMinutes = (time: number) => Math.floor((time % 360000) / 6000);
  const getSeconds = (time: number) => Math.floor((time % 6000) / 100);
  const formatZeroTime = (time: number) => (time < 10 ? `0${time}` : time);

  return (
    <div className="Score-Panel">
      {!isGameStarted && lose && (
        <p className="Tip">Don't worry! Just try again.</p>
      )}
      {!isGameStarted && win && (
        <p className="Tip">
          Wow! You did great!
          <br /> It's time to start the game again with new difficulty or mode
          and set a new record!
        </p>
      )}
      {!isGameStarted && !win && !lose && (
        <p className="Tip">Pick your first pair of cards!</p>
      )}
      {isGameStarted && (
        <div className="Stats">
          {/* Tactic mode Score Panel Turns parameter */}
          {mode.name === 'tactic' && (
            <p className="Turns-Count">
              Turn: {turns} of {modsParameters['tactic'][currentDifficulty]}
            </p>
          )}
          {/* Apocalypse mode Score Panel Turns parameter */}
          {mode.name === 'apocalypse' && (
            <p className="Turns-Count">
              Turn: {turns} of{' '}
              {modsParameters['apocalypse'][currentDifficulty]['turns']}
            </p>
          )}
          {/* Other mods Score Panel Turns parameter */}
          {(mode.name === 'casual' || mode.name === 'race') && (
            <p className="Turns-Count">Turn: {turns}</p>
          )}
          {/*Score Panel Paired Cards parameter */}
          <p className="Paired-Cards-Count">
            Paired: {matchedPairs} of {cardsAmount}
          </p>
          {/* Race mode Score Panel Time parameter */}
          {mode.name === 'race' && (
            <p className="Time-Count">
              Time:{` `}
              {formatZeroTime(getMinutes(time))}:
              {formatZeroTime(getSeconds(time))} of{' '}
              {formatZeroTime(
                getMinutes(modsParameters['race'][currentDifficulty])
              )}
              :
              {formatZeroTime(
                getSeconds(modsParameters['race'][currentDifficulty])
              )}
            </p>
          )}
          {/* Apocalypse mode Score Panel Time parameter */}
          {mode.name === 'apocalypse' && (
            <p className="Time-Count">
              Time:{` `}
              {formatZeroTime(getMinutes(time))}:
              {formatZeroTime(getSeconds(time))} of{' '}
              {formatZeroTime(
                getMinutes(
                  modsParameters['apocalypse'][currentDifficulty]['time']
                )
              )}
              :
              {formatZeroTime(
                getSeconds(
                  modsParameters['apocalypse'][currentDifficulty]['time']
                )
              )}
            </p>
          )}
          {/* Other mods Score Panel Time parameter */}
          {(mode.name === 'casual' || mode.name === 'tactic') && (
            <p className="Time-Count">
              Time:{` `}
              {formatZeroTime(getMinutes(time))}:
              {formatZeroTime(getSeconds(time))}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ScorePanel;
