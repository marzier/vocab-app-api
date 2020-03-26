const express = require('express');
const db = require('../data/dbConfig.js');


module.exports = {
   get,
   getDeckNames,
   insert, 
   countDecks, 
   getAllDecks
}

function getAllDecks() {
   return db('decks')
}

function get(username) {
   return db('users')
      .select('deck_name', 'word', 'definition AS gloss')
      .leftJoin('decks', 'users.id', 'decks.user_id')
      .leftJoin('decks_words', 'decks_words.deck_id', 'decks.id')
      .leftJoin('words', 'words.id', 'decks_words.word_id')
      .where({ username });
}

function getDeckNames(username) {
   return db('users')
      .select('deck_name')
      .leftJoin('decks', 'users.id', 'decks.user_id')
      .where({ username });
}

// [{"deck_name":"U1 SAT"} , {"deck_name":"U1 Barrons"}]

function insert(deck) {
   return db('decks').insert(deck);
}
function countDecks(username) {
   return db('users')
      .count('deck_name')
      .join('decks', 'users.id', 'decks.user_id')
      .where({ username });
}