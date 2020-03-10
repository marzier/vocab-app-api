
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Einstein', password: "E1"},
        {username: 'Curie', password: "C1"},
        {username: 'Does not Study', password: "D1"}
      ]);
    });
};
