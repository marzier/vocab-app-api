const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'username1', password: bcrypt.hashSync("password1", 8)},
        {username: 'username2', password: bcrypt.hashSync("password2", 8)},
        {username: 'username3', password: bcrypt.hashSync("password2", 8)}
      ]);
    });
};
