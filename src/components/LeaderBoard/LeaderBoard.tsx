import { useContext, useEffect, useState } from 'react';
import './LeaderBoard.scss';
import GameContext from '../../core/Contexts/GameContext';
import {
  // addScore,
  getScores,
} from '../../core/Services/LeaderboardService/LeaderboardService';

interface IRecordData {
  rank: number;
  name: string;
  score: number;
  turns: number;
  time: string;
  mode: string;
}

const LeaderBoard = (props: { difficulty: string }) => {
  // const { difficulty } = props;

  const [activeTab, setActiveTab] = useState('Easy'); // Easy difficulty tab by default

  const { toggleLeaderBoard } = useContext(GameContext);

  // Function for Tab changing
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const [scores, setScores] = useState<IRecordData[]>([]);
  // const [name, setName] = useState('');
  // const [score, setScore] = useState('');

  useEffect(() => {
    const fetchScores = async (difficulty: string) => {
      const data = await getScores(difficulty);
      setScores(data);
    };
    fetchScores(activeTab);
  }, [activeTab]);

  // Function for displaying data in a table depending on the active tab
  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Turns</th>
            <th>Time</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          {scores &&
            scores.map((score, index) => (
              <tr key={index}>
                <td>{score.rank}</td>
                <td>{score.name}</td>
                <td>{score.score}</td>
                <td>{score.turns}</td>
                <td>{score.time}</td>
                <td>{score.mode}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="LeaderBoard">
      <div className="Modal-Overlay">
        <div className="Modal-Container">
          <div className="Modal-Header">
            {/* Buttons for Tab picking */}
            <div className="Tab-Change-Menu">
              <button
                onClick={() => handleTabChange('Easy')}
                className={activeTab === 'Easy' ? 'Active' : ''}
              >
                Easy
              </button>
              <button
                onClick={() => handleTabChange('Normal')}
                className={activeTab === 'Normal' ? 'Active' : ''}
              >
                Normal
              </button>
              <button
                onClick={() => handleTabChange('Hard')}
                className={activeTab === 'Hard' ? 'Active' : ''}
              >
                Hard
              </button>
            </div>
            <div className="SearchFilterSorting">
              <p className="Note">
                Search, Filter and Sorting functionality (in progress)
              </p>
            </div>
            <div className="Buttons">
              <button
                className="Close-Button"
                data-close
                onClick={() => toggleLeaderBoard()}
              >
                <span aria-hidden="true">X</span>
              </button>
            </div>
          </div>

          {/* Table with results */}
          <div className="Data-Container">{renderTable()}</div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
