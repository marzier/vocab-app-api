const db = require('../data/dbConfig.js');

module.exports = {
   getDecks,
}

function getDecks() {
   return db('decks');
}
