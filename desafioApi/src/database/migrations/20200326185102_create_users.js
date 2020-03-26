
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
      table.increments();
      table.string('nome').notNullable();
      table.string('dataNascimento').notNullable();
      table.string('cpf').notNullable();
      table.string('email').notNullable();
      table.string('senha').notNullable();
      table.string('image').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
