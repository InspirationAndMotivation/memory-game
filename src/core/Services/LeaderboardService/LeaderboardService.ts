const API_URL = 'http://localhost:5000/scores';

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

export const addScore = async (name: string, score: number) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, score }),
  });
  return response.json();
};
