const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.REACT_APP_PORT || 5000; // Port for backend

// Middleware for work with JSON
app.use(express.json());
app.use(cors());

// Mocked data
let scores = {
  easy: [
    {
      rank: 1,
      name: 'Player1',
      score: 150,
      turns: 5,
      time: '00:14',
      mode: 'Apocalypse',
    },
    {
      rank: 2,
      name: 'Player2',
      score: 120,
      turns: 9,
      time: '00:19',
      mode: 'Casual',
    },
    {
      rank: 3,
      name: 'Player3',
      score: 100,
      turns: 12,
      time: '00:21',
      mode: 'Race',
    },
  ],
  normal: [
    {
      rank: 1,
      name: 'Player4',
      score: 300,
      turns: 18,
      time: '01:14',
      mode: 'Race',
    },
    {
      rank: 2,
      name: 'Player5',
      score: 280,
      turns: 22,
      time: '01:34',
      mode: 'Race',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
    {
      rank: 3,
      name: 'Player6',
      score: 250,
      turns: 23,
      time: '01:54',
      mode: 'Tactic',
    },
  ],
  hard: [],
  //   hard: [
  //     {
  //       rank: 1,
  //       name: 'Player7',
  //       score: 450,
  //       turns: 41,
  //       time: '01:59',
  //       mode: 'Tactic',
  //     },
  //     {
  //       rank: 2,
  //       name: 'Player8',
  //       score: 400,
  //       turns: 47,
  //       time: '02:14',
  //       mode: 'Race',
  //     },
  //     {
  //       rank: 3,
  //       name: 'Player9',
  //       score: 380,
  //       turns: 52,
  //       time: '02:31',
  //       mode: 'Casual',
  //     },
  //   ],
};

const login = process.env.REACT_APP_DB_LOGIN;
const pass = process.env.REACT_APP_DB_PASSWORD;

// Scheme for LeaderBoard
const scoreSchema = new mongoose.Schema({
  rank: Number,
  name: String,
  score: Number,
  turns: Number,
  time: String,
  mode: String,
  difficulty: String, // "easy", "normal", "hard"
});

// Model for working with collection
const ScoreCollection = mongoose.model('Score', scoreSchema);

// Adding mocked data to DB
async function addDataToMongodb() {
  await ScoreCollection.deleteMany();
  // Transform data to array
  const data = Object.entries(scores).flatMap(([difficulty, entries]) =>
    entries.map((entry) => ({ ...entry, difficulty }))
  );
  await ScoreCollection.insertMany(data);
  console.log('Data added to MongoDB');
}

// Connecting to Database MongoDB
mongoose
  .connect(
    `mongodb+srv://${login}:${pass}@leaderboard-memory-game.li44u.mongodb.net/?retryWrites=true&w=majority&appName=Leaderboard-Memory-Game`
  )
  .then(() => {
    console.log('Connected to MongoDB');
    addDataToMongodb();
  })
  .catch((err) => console.log('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Server is working!');
});

// API for getting data by difficulty
app.get('/scores', async (req, res) => {
  const difficulty = req.query.difficulty; // "easy", "normal", "hard"

  if (!difficulty) {
    return res.status(400).json({ error: 'Difficulty is required' });
  }

  try {
    const scores = await ScoreCollection.find({ difficulty }).sort({ rank: 1 }); // Сортировка по рангу
    res.json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Success! Server is running on http://localhost:${port}.`);
});
