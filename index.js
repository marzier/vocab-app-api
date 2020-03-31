const express = require('express');
const cors = require('cors');
//const db = require('./data/db.js');
const server = express();

var corsOptions = {
   origin: 'http://zen-vocab.herokuapp.com',
 }
server.use(cors(corsOptions));

server.use(express.json());

const authRouter = require('./auth/auth-router.js');
server.use('/auth', authRouter);

const decksRouter = require('./Decks/decks-rtr.js');
server.use('/decks', decksRouter);

const wordsRouter = require('./Words/words-rtr.js');
server.use('/words', wordsRouter);

const port = process.env.PORT || 6001;
server.listen(port, () => console.log(`Server on ${port}`));