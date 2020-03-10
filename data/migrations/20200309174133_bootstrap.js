
exports.up = function(knex) {
  return knex.schema
   .createTable('users', tbl=>{
     tbl.increments();
     tbl.string('username').notNullable();
     tbl.string('password').notNullable().unique();
  })
  .createTable('decks', tbl => {
     tbl.increments();
     tbl.string('deck_name');
     tbl.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
  })
  .createTable('words', tbl => {
      tbl.increments();
      tbl.string('word').notNullable();
      tbl.string('definition').notNullable();
   })
};

exports.down = function(knex) {
   return knex.schema
      .dropTableIfExists('words')
      .dropTableIfExists('decks')
      .dropTableIfExists('users')
};
