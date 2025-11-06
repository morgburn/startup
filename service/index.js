const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());

let users = [];
let songs = [];
let scores = [];

function setAuthCookie(res, token) {
  res.cookie(authCookieName, token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });
}

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth - register a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { userName, password } = req.body;
  if (await findUser('userName', userName)) {
    return res.status(409).send({ msg: 'Existing user' });
  }
  const user = await createUser(userName, password);
  setAuthCookie(res, user.token);
  res.send({ userName: user.userName });
});

// GetAuth - log in existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { userName, password } = req.body;
  const user = await findUser('userName', userName);
  if (user && (await bcrypt.compare(password, user.password))) {
    user.token = uuid.v4();
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
apiRouter.get('/scores', verifyAuth, (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', verifyAuth, (req, res) => {
  scores = updateScores(req.body);
  res.send(scores);
});

// Get all song suggestions
apiRouter.get('/songs', verifyAuth, (_req, res) => {
  res.send(songs);
});

// Submit a new song suggestion
apiRouter.post('/song', verifyAuth, (req, res) => {
  const newSong = {
    title: req.body.title,
    artist: req.body.artist,
    date: new Date().toLocaleDateString(),
  };

  songs.unshift(newSong);
  if (songs.length > 20) songs.length = 20;

  res.send(songs);
});

// updateScores, keep only the top 10
function updateScores(newScore) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}

async function createUser(userName, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = { userName, password: passwordHash, token: uuid.v4() };
  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

