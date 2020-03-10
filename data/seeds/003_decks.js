exports.seed = function(knex, Promise) {
  return knex('decks').del()
    .then(() => knex('decks').insert([
      { 
        user_id: 1,
        deck_name: 'SAT'
      },
      { 
        user_id: 2,
        deck_name: 'GRE Barrons'
      },
      { 
        user_id: 2,
        deck_name: 'GRE Kaplan'
      },

    ]));
};
