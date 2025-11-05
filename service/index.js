const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const path = require('path');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => console.log(`Listening on port ${port}`));

let users = [];
let suggestions = [];
const authCookieName = 'authToken';

app.post('/api/auth/create', async (req, res) => {
  if (users.find(u => u.email === req.body.email)) return res.status(409).send({ msg: 'Existing user' });

  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const user = { email: req.body.email, password: passwordHash, token: uuid.v4() };
  users.push(user);

  res.cookie(authCookieName, user.token, { httpOnly: true, sameSite: 'strict', secure: true });
  res.send({ email: user.email });
});

