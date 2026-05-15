const API_URL = '/api/scores';

export const getScores = async (difficulty: string) => {
  try {
    const response = await fetch(
      API_URL + `?difficulty=${difficulty.toLowerCase()}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching scores:', error);
  }
};

export const addScore = async (payload: {
  name: string;
  score: number;
  turns: number;
  time: string;
  mode: string;
  difficulty: string;
}) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.json();
};
