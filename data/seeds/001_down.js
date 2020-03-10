exports.seed = function(knex, Promise) {
  return knex('words').del()
    .then(() => knex('decks').del())
    .then(() => knex('users').del());
};