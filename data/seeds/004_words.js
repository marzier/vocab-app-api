
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('words').del()
    .then(function () {
      // Inserts seed entries
      return knex('words').insert([
        { word: 'expiate', definition: "make amends"},
        { word: 'peruse', definition: "browse" },
        { word: 'uxorious', definition: "love excessively"},
        { word: 'pliant', definition: "flexible, easily influenced"},
        { word: 'versimilitude', definition: "the appearance of truth"},
        { word: 'low', definition: "moo!"}
      ]);
    });
};
