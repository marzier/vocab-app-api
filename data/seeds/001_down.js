exports.seed = function(knex, Promise) {
  return knex('decks_words').del()
    .then(() => knex('words').del())
    .then(() => knex('decks').del())
    .then(() => knex('users').del())
    // .then(()=> knex.raw('ALTER TABLE ' + 'decks_words' + ' AUTO_INCREMENT = 1'))
    // .then(()=> knex.raw('ALTER TABLE ' + 'words' + ' AUTO_INCREMENT = 1'))
    // .then(()=> knex.raw('ALTER TABLE ' + 'decks' + ' AUTO_INCREMENT = 1'))
    // .then(()=> knex.raw('ALTER TABLE ' + 'users' + ' AUTO_INCREMENT = 1'))

};