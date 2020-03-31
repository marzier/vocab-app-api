const express = require('express');
const cors = require('cors');
//const db = require('./data/db.js');
const server = express();

var whitelist = ['http://zen-vocab.herokuapp.com', 'https://zen-vocab.herokuapp.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
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