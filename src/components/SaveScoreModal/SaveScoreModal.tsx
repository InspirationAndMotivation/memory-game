import { useState } from 'react';
import { addScore } from '../../core/Services/LeaderboardService/LeaderboardService';
import './SaveScoreModal.scss';

interface SaveScoreModalProps {
  turns: number;
  time: number;
  mode: string;
  difficulty: string;
  modsParameters: any;
  onClose: () => void;
  onSaved: () => void;
}

const SaveScoreModal = ({
  turns,
  time,
  mode,
  difficulty,
  modsParameters,
  onClose,
  onSaved,
}: SaveScoreModalProps) => {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const getMinutes = (t: number) => Math.floor((t % 360000) / 6000);
  const getSeconds = (t: number) => Math.floor((t % 6000) / 100);
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  const formatTime = (t: number) => `${pad(getMinutes(t))}:${pad(getSeconds(t))}`;

  const computeScore = () => {
    if (mode === 'casual') {
      // Fewer turns is better; base score subtracts turn penalty
      return Math.max(1000 - turns * 10, 100);
    }
    if (mode === 'tactic') {
      const initial = modsParameters['tactic'][difficulty];
      const used = initial - turns;
      return Math.max(1000 - used * 20, 100);
    }
    if (mode === 'race') {
      // More time remaining = better score
      return Math.max(time * 2, 100);
    }
    if (mode === 'apocalypse') {
      const turnsUsed = modsParameters['apocalypse'][difficulty]['turns'] - turns;
      return Math.max(time + (100 - turnsUsed * 5), 100);
    }
    return 0;
  };

  const getDisplayTurns = () => {
    if (mode === 'tactic' || mode === 'apocalypse') {
      const initial =
        mode === 'tactic'
          ? modsParameters['tactic'][difficulty]
          : modsParameters['apocalypse'][difficulty]['turns'];
      return initial - turns;
    }
    return turns;
  };

  const getDisplayTime = () => {
    if (mode === 'race' || mode === 'apocalypse') {
      const initial =
        mode === 'race'
          ? modsParameters['race'][difficulty]
          : modsParameters['apocalypse'][difficulty]['time'];
      return formatTime(initial - time);
    }
    return formatTime(time);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await addScore({
        name: name.trim(),
        score: computeScore(),
        turns: getDisplayTurns(),
        time: getDisplayTime(),
        mode,
        difficulty,
      });
      onSaved();
    } catch (e) {
      setError('Failed to save score. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="SaveScoreModal">
      <div className="Modal-Overlay">
        <div className="Modal-Container">
          <h2 className="Modal-Title">Save Your Score</h2>
          <div className="Stats-Summary">
            <div className="Stat">
              <span className="Stat-Label">Mode</span>
              <span className="Stat-Value">{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
            </div>
            <div className="Stat">
              <span className="Stat-Label">Difficulty</span>
              <span className="Stat-Value">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
            </div>
            <div className="Stat">
              <span className="Stat-Label">Turns</span>
              <span className="Stat-Value">{getDisplayTurns()}</span>
            </div>
            <div className="Stat">
              <span className="Stat-Label">Time</span>
              <span className="Stat-Value">{getDisplayTime()}</span>
            </div>
            <div className="Stat">
              <span className="Stat-Label">Score</span>
              <span className="Stat-Value Score">{computeScore()}</span>
            </div>
          </div>
          <div className="Name-Input-Group">
            <label htmlFor="playerName">Your name:</label>
            <input
              id="playerName"
              type="text"
              maxLength={30}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
            />
          </div>
          {error && <p className="Error-Message">{error}</p>}
          <div className="Modal-Buttons">
            <button className="Save-Button" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button className="Cancel-Button" onClick={onClose} disabled={saving}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveScoreModal;
