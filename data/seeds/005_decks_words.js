
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('decks_words').del()
    .then(function () {
      // Inserts seed entries
      return knex('decks_words').insert([
        {deck_id: 1, word_id: 1},
        {deck_id: 1, word_id: 2},
        {deck_id: 1, word_id: 3},
        {deck_id: 1, word_id: 4},
        {deck_id: 1, word_id: 5},
        {deck_id: 1, word_id: 6},

        {deck_id: 2, word_id: 3},
        {deck_id: 2, word_id: 4},

        {deck_id: 3, word_id: 5},
        {deck_id: 3, word_id: 6},

      ]);
    });
};
