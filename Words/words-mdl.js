const db = require('../data/dbConfig.js');


// var fs = require('fs');  // req for natural and wordnet-db
// const natural = require('natural');
// const wordnet = new natural.WordNet();

// var WordNet = require('node-wordnet');
// var wordnet2 = new WordNet();

// const generateWordEntry = word => {
//    let wordObj = {};
//    wordObj.definition = "";

//    wordnet.lookup(word, function(entries) {
//       entries.forEach((entry)=>{
//          wordObj.word = word;
//          wordObj.definition += entry.gloss.replace(/"/g, "'"  ).trim() + '***' ; 
//       });
//   });

//   return wordObj;
// }

// const mockWordList = ["timid", "errant", "missive"];
// mockWordList.forEach((word)=>{
//    generateWordEntry(word);
// });


module.exports = {
   getWords,
   getWordByWord,
   insertWordsToDeck,
   changeWordDefinition,
   connectDecks_Words, 
   getAllDecks, // for testing
}

function getWords() {
   return db('words');
}

function getWordByWord(word) {
   return db('words').where({ word }).first();
}

/////
function insertWordsToDeck(words) {
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



function changeWordDefinition() {

}


// also want to be able to add words (without using WordNet to fill in the defintions)


// helper functions
function findDeckByName(deck_name) {
   return db('decks').where({deck_name}).first();
}





