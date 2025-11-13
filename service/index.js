const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require('./database.js');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth - register a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;
  if (await findUser('userName', email)) {
    return res.status(409).send({ msg: 'Existing user' });
  }
  const user = await createUser(email, password);
  setAuthCookie(res, user.token);
  res.send({ userName: user.userName });
});

// GetAuth - log in existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser('userName', email);
  if (user && (await bcrypt.compare(password, user.password))) {
    user.token = uuid.v4();
    await DB.updateUser(user);
    setAuthCookie(res, user.token);
    return res.send({ userName: user.userName });
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth - log out user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    await DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify authentication
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// GetScores
apiRouter.get('/scores', verifyAuth, async (req, res) => {
  const scores = await DB.getHighScores();
  const normalized = scores.map((s) => ({
    trackName: s.trackName,
    artist: s.artist || '',
    votes: s.score,
  }))
  res.send(normalized);
});

// SubmitScore
apiRouter.post('/score', verifyAuth, async (req, res) => {
  const {trackName, artist, score } = req.body;
  await DB.addScore({
    trackName,
    artist: artist || '',
    score,
  });
  const updatedScores = await DB.getHighScores();
  const normalized = updatedScores.map((s) => ({
    trackName: s.trackName,
    artist: s.artist || '',
    votes: s.score,
  }));
  res.send(normalized);
});

// Get all song suggestions
apiRouter.get('/songs', async (_req, res) => {
  const songs = await DB.getSongs();
  res.send(songs);
});

// Submit a new song suggestion
apiRouter.post('/song', verifyAuth, async (req, res) => {
  const newSong = {
    trackName: req.body.trackName,
    artist: req.body.artist,
    albumCover: req.body.albumCover,
    date: new Date().toLocaleDateString(),
  };

  await DB.addSong(newSong);
  const songs = await DB.getSongs();
  if (songs.length > 20) songs.length = 20;

  res.send(songs);
});

async function createUser(userName, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = { userName, password: passwordHash, token: uuid.v4() };
  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

