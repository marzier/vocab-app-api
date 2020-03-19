const express = require('express');
const db = require('../data/dbConfig.js');

module.exports = {
   getUsers,
   addUser,
   findUserById,
   findUserByUsername,
}

function getUsers() {
   return db('users');
}

function addUser(user) {
   return db('users').insert(user, 'id') // need 'id' for postgres to return the id
      .then(([ id ]) => {
         return findUserById(id)
      })
}

function findUserById(id) {
   return db('users').where({ id }).first();
}

function findUserByUsername(username) {
   return db('users').where({ username }).first();
}