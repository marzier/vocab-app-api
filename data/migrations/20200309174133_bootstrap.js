
exports.up = function(knex) {
  return knex.schema
   .createTable('users', tbl=>{
     tbl.increments();
     tbl.string('username').notNullable().unique();
     tbl.string('password').notNullable();
  })
  .createTable('decks', tbl => {
     tbl.increments();
     tbl.string('deck_name').notNullable();
     tbl.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
  })
  .createTable('words', tbl => {
      tbl.increments();
      tbl.string('word').notNullable();
      tbl.text('definition').notNullable();
   })
   .createTable('decks_words', tbl => {
      tbl.increments();
      tbl.integer('deck_id')
         .unsigned()
         .references('id')
         .inTable('decks')
         .notNullable()
         // .onDelete('RESTRICT')
         // .onUpdate('CASCADE');
      tbl.integer('word_id')
         .unsigned()
         .references('id')
         .inTable('words')
         .notNullable()
         // .onDelete('RESTRICT')
         // .onUpdate('CASCADE');
   })
};

exports.down = function(knex) {
   return knex.schema
      .dropTableIfExists('decks_words')
      .dropTableIfExists('words')
      .dropTableIfExists('decks')
      .dropTableIfExists('users')
};
