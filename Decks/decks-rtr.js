const express = require('express');
const router = express.Router();
const restrict = require('../auth/restrict.js');
const Decks = require('./decks-mdl.js');

router.get('/', restrict, (req,res) => {
   // console.log(req); restrict makes req -> req.user -> req.user.username
   
   Decks.get(req.user.username)
      .then((decks) => {
         res.status(200).json(decks);
      })
      .catch((err) => {
         res.status(500).json({message: "server error getting decks"})
      })
});


module.exports = router;
