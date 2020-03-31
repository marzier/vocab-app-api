const db = require('../data/dbConfig.js');

module.exports = {
   getWords,
   getWordByWord,
   insertWord,
   insertWordsToDeck,
   connectDecks_Words, 
   getAllDecks, // for testing
   remove,
   update,
   getDeckID,
   insertDecksWords,
}

function getWords() {
   return db('words');
}

function getWordByWord(word) {
   return db('words').where({ word }).first();
}

function insertWord({word, definition}) {
   return db('words').insert({word, definition}, 'id')
}

/////
function insertWordsToDeck(words) { // words is a list of wordObjs with word and def fields i  think
   // let generateEntries = words2List.map(word=>generateWordEntry(word));
   return db('words')
      .insert(words, 'id')
}


function getAllDecks() {
   return db('decks');
}

function connectDecks_Words(deck_name, wordIds) {
   return db('decks')
      .select('decks.id')
      .where({deck_name})
      .first()
         .then(({id}) => {
            let dcks_wrds_entries = wordIds.map(word_id=>{
               return {deck_id:id, word_id} 
            })

            return db('decks_words').insert(dcks_wrds_entries, 'id');
         });
}

function remove(username, deck_name, word) {
   return db('users')
            .select('id')
            .where({username})
            .first()
            .then(({ id }) => {
               return db('decks')
                  .select('id')
                  .where({user_id:id, deck_name})
                  .first()
            })
            .then(( { id } ) => {
               return db('decks_words')
                  .select('words.id')
                  .join('words', 'words.id', 'decks_words.word_id')
                  .where({deck_id:id})
                  .where({word})
                  .first()
            })
            .then(( { id } ) => {
               return db('words')
                  .where({id})
                  .del()
            })
            // for debug: details db erros in console
            // .then((t) => {
            //    console.log('t:', t)
            // })
            // .catch((c) => {
            //    console.log('c:', c)
            // });
      
}


function update(username, deck_name, word, wordObj) {
   return db('users')
            .select('id')
            .where({username})
            .first()
            .then(({ id }) => {
               return db('decks')
                  .select('id')
                  .where({user_id:id, deck_name})
                  .first()
            })
            .then(( { id } ) => {
               return db('decks_words')
                  .select('words.id')
                  .join('words', 'words.id', 'decks_words.word_id')
                  .where({deck_id:id})
                  .where({word})
                  .first()
            })
            .then(( { id } ) => {
               return db('words')
                  .where({id})
                  .update(wordObj)
            })
            // for debug: details db erros in console
            // .then((t) => {
            //    console.log('t:', t)
            // })
            // .catch((c) => {
            //    console.log('c:', c)
            // });
      
}


// helper functions
function findDeckByName(deck_name) {
   return db('decks').where({deck_name}).first();
}




// also want to be able to add words (without using WordNet to fill in the defintions)

function getDeckID(username, deck_name) {
   return db('users')
      .select('id')
      .where({username})
      .first()
      .then(({ id }) => {
         return db('decks')
            .select('id')
            .where({user_id:id, deck_name})
            .first()
      })
}

function insertDecksWords(deck_id, word_id) {
   return db('decks_words').insert({deck_id, word_id})
}

