const express = require('express');
const router = express.Router();
const restrict = require('../auth/restrict.js');
const Decks = require('./decks-mdl.js');






// needs to send an object that looks like ->
/*
[deck1, deckN...]
let deck1 = [ [{obj}, {obj}], [{obj}], [{obj}, {obj}]]
let deckN = ...
*/

router.get('/', restrict, (req,res) => {
   // console.log(req); restrict makes req -> req.user -> req.user.username
   const username = req.user.username;

   Promise.all([Decks.getDeckNames(username), Decks.get(username)])
      .then(([deckNames,decks]) => {
         let listDecks=[];
         deckNames.forEach((dN) => {
            let fDeck = decks.filter(d=>d.deck_name==dN.deck_name);
            fDeck = fDeck.map((wordOb) => {
               return [wordOb]
            })
            listDecks.push(fDeck)
         });

         let debuggrey = () => {
            console.log("num decks:", listDecks.length);
            console.log("returned decks: ", decks);
            console.log("deckNames:", deckNames);
         }
         res.status(200).json(listDecks);
      })
      .catch((err) => {
         res.status(500).json({message: "server error getting decks"})
      })


   // Decks.getDeckNames(req.user.username)
   //    .then((decks) => {
   //       res.status(200).json(decks);
   //    })
   //    .catch((err) => {
   //       res.status(500).json({message: "server error getting decks"})
   //    })
});

router.post('/', restrict, (req,res) => {
   console.log(req.user);

   const { id:user_id } = req.user;
   const { deck_name } = req.body;
   
   Decks.insert({ deck_name, user_id })  
      .then(stuff => {
         res.status(200).json(stuff); 
      })
      .catch(err => {
         console.log(err);
         res.status(500).json({message: "error inserting deck"})
      }) 
})

router.get('/all', (req,res) => {
   Decks.getAllDecks()  
      .then(stuff => {
         res.status(200).json(stuff); 
      })
      .catch(err => {
         console.log(err);
         res.status(500).json({message: "error getting all decks"})
      }) 
})

module.exports = router;
