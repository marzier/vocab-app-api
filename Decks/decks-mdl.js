const express = require('express');
const db = require('../data/dbConfig.js');


module.exports = {
   get,

}

function get(username) {
   return db('users')
      .select('deck_name', 'word')
      .join('decks', 'users.id', 'decks.user_id')
      .join('decks_words', 'decks_words.deck_id', 'decks.id')
      .join('words', 'words.id', 'decks_words.word_id')
      .where({ username });
}


