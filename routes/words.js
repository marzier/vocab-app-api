const express = require('express');
const router = express.Router();
const words = require('../models/words.js');

// get decks
router.get('/', (req,res) => {
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