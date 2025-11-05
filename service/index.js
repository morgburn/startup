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
