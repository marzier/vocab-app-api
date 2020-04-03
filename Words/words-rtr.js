const express = require('express');
const router = express.Router();
const Words = require('./words-mdl.js');
const restrict = require('../auth/restrict.js');

var WordNet = require('node-wordnet');
var wordnet2 = new WordNet();



// get words
router.get('/', (req,res) => {
   Words.getWords()
      .then((words) => {
         res.status(200).json(words)
      })
      .catch((error) => {
         res.status(500).json({
            error: "cannot get words"
         })
      });
});

// insert words to deck
router.post('/', restrict, (req,res) => {
   let { words, deck_name } = req.body;

   // 1. add words (shape: "ban \n can \n bad"), get all ids
   // 2. add to decks_words

   let words2List = words.trim().split('\n').map(word=>word.trim());
   //console.log(words2List);

   let entriesList = [];
   let notFound = [];

   let promises = words2List.map(word => {
      return wordnet2.lookupAsync(word)
         .then((entries) => {
            if (!word) {return} // filters '' from wrods
            if (!entries.length) {notFound.push(word); return;}

            let wordObj = {};
            wordObj.definition = "";
            entries.forEach((entry)=>{
               wordObj.word = word;
               wordObj.definition += entry.gloss.replace(/"/g, "'"  ).trim() + '\n\n' ; 
            });
            entriesList.push(wordObj)
         })
   });

   Promise.all(promises)
      .then(() => {
         //console.log(entriesList);
         //console.log(notFound);
         Words
            .insertWordsToDeck(entriesList)
               // .then((ids) => {
               //    res.status(200).json({ids, notFound})  // returns list of words not found and sends to client
               // })
               // .catch((error) => {
               //    res.status(500).json({
               //       error: "cannot insert words",
               //       message: error
               //    })
               // });
               .then((ids) => {
                  Words.connectDecks_Words(deck_name, ids)
                     .then((decks_words_ids_created) => {
                        res.status(200).json({decks_words_ids_created, notFound})  // returns list of words not found and sends to client
                     })
                     .catch((error) => {
                        res.status(500).json({
                           message: "cannot insert words",
                           error,
                           ids
                        })
                     });
               })
      })
      .catch((error) => {
         res.status(500).json({
            message: "cannot insert words - last",
            error
         })
      })
   ////// for a single word
   // let testWord = 'dad';

   // let wordObj = {};
   // wordObj.definition = "";

   // wordnet2.lookupAsync(testWord)
   //    .then((entries) => {
   //       entries.forEach((entry)=>{
   //          wordObj.word = testWord;
   //          wordObj.definition = entry.gloss.replace(/"/g, "'"  ).trim() + '***' ; 
   //       });
   //    }).then(() => {
   //          Words.insertWordsToDeck(wordObj)
   //             .then((ids) => {
   //                res.status(200).json(ids)
   //             })
   //             .catch((error) => {
   //                res.status(500).json({
   //                   error: "cannot insert words",
   //                   message: error
   //                })
   //             });
   //    })
   
});

// delete
router.delete('/', restrict, (req,res) => {
   const { deck_name, word } = req.body;
   const username = req.user.username;

   //console.log("in router.del - deck_name,word,username: ", deck_name,word,username)

   Words.remove(username, deck_name, word)
      .then(() => {
         res.status(200).json({message: `deleted - ${word}`})
      })
      .catch((error) => {
         res.status(500).json({
            error
         })
      });
});

// edit word
router.put('/', restrict, (req,res) => {
   const { originalWord, word, definition, deck_name } = req.body;
   const username = req.user.username;

   Words.update(username, deck_name, originalWord, {word,definition})
      .then(() => {
         res.status(200).json({message: `updated - ${word}`})
      })
      .catch((error) => {
         res.status(500).json({
            error
         })
      });
});


// add word from one deck to another 
router.post('/copy', restrict, (req,res) => {
   const {word, definition, deck_name } = req.body;
   const username = req.user.username;

   console.log("in /copy post, word,definition,deck_name:", word, definition, deck_name);
   
   Promise.all([Words.getDeckID(username, deck_name), Words.insertWord({word,definition})])
      .then(([deckID, wordID])=>{
         console.log("deckID, wordID:", deckID, wordID);
         Words.insertDecksWords(deckID.id, wordID[0])
            .then((stuff) => {
               res.status(200).json({message: "successfully copied word to new deck"})
            })
         
      })
      .catch((error) => {
         console.log("cannot add to that deck", error)
         res.status(200).json({message: "error adding to that other deck"})
      })

});





module.exports = router;