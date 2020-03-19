const express = require('express');
const router = express.Router();
const words = require('./words-mdl.js/index.js');

// get decks
router.get('/decks', (req,res) => {
   words.getDecks()
      .then((decks) => {
         res.status(200).json(decks)
      })
      .catch((error) => {
         res.status(500).json({
            error: "cannot get decks"
         })
      });
});


module.exports = router;