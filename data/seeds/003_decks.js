exports.seed = function(knex, Promise) {
  return knex('decks').del()
    .then(() => knex('decks').insert([
      { 
        //1 
        user_id: 1,
        deck_name: 'U1 SAT'
      },
      { 
        //2 
        user_id: 1,
        deck_name: 'U1 Barrons'
      },
      { 
        //3 
        user_id: 2,
        deck_name: 'U2 GRE Kaplan'
      },

    ]));
};
