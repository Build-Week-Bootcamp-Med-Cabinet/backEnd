exports.up = function(knex) {
	return (
		knex.schema
			.createTable('users', (table) => {
				table.increments();
				table.string('firstname').notNullable();
				table.string('lastName').notNullable();
				table.string('email').notNullable().unique();
				table.string('username').notNullable().unique();
				table.string('password').notNullable();
			})
			//Strain Table
			.createTable('strains', (table) => {
				table.increments();
				table.string('name').notNullable();
			})
			//Join table
			.createTable('user-strains', (table) => {
				table
					.integer('user_id')
					.notNullable()
					.references('id')
					.inTable('users')
					.onDelete('CASCADE')
					.onUpdate('CASCADE');

				table
					.integer('strain_id')
					.notNullable()
					.references('id')
					.inTable('strains')
					.onDelete('CASCADE')
					.onUpdate('CASCADE');

				table.primary([ 'user_id', 'strain_id' ]);
			})
	);
};

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists('user-strains');

	await knex.schema.dropTableIfExists('strains');
	await knex.schema.dropTableIfExists('users');
};
