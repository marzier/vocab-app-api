const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const restrict = require('./restrict.js');
const Users = require('./users-model');

const router = express.Router();

function generateToken(user) {
   const options = {
      expiresIn: '1d',
   }
   const payload = {
      username: user.username,
      id: user.id
   }

   return jwt.sign(payload, process.env.JWT_SCRET, options)
}

// get all users
router.get('/users', restrict, (req, res) => {
   
   Users.getUsers()
      .then((users) => {
         res.status(200).json(users)
      })
      .catch((error) => {
         console.log(error);
         res.status(500).json({message: "server error getting users"})
      });
});

// get by id
router.get('/users/:id', (req, res) => {
   const { id } = req.params;

   Users.findUserById(id)
      .then((user) => {
         user? res.status(200).json(user) : res.status(200).json({error: "user not found"})
      })
      .catch((error) => {
         console.log(error);
         res.status(500).json({error: "server error getting that user"})
      });
});

router.post('/register', (req,res) => {
   const { username, password } = req.body;

   Users.addUser({ username, password: bcryptjs.hashSync(password, 8) })
      .then((addedUser) => {
         res.status(201).json(addedUser);
      })
      .catch((error) => {
         console.log(error);
         res.status(500).json({
            error,
            message: "Ugh! Sorry, someone already took that username!"
         })``
      });
});

router.post('/login', (req,res) => {
   const { username, password } = req.body;

   Users
      .findUserByUsername(username) 
      .then(user => {
         if (user && bcryptjs.compareSync(password, user.password)) {
            res.status(200).json({
               message: "Yay! You logged in!!!!!!!",
               token: generateToken(user)
            })
         } else {
            res.status(401).json({ 
               //error,   // this caused problems; wrong password led to the 500 error below
               message: "Ugh! Sorry! Your username or password is wrong!" 
            });
         }
      })
      .catch((error) => {
         res.status(500).json({ 
            error,
            message: "Ugh! Sorry! We experienced a server error!" 
         });
      });
});


module.exports = router;