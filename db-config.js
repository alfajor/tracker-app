const path = require('path');
const dbPath = path.resolve(__dirname, 'db/tracking.sqlite');

// create db connection
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true
});

// create table
try {
    knex.schema.hasTable('entries').then((table) => {
        if(!table) {
            return knex.schema.createTable('entries', (table) => {
                table.increments('id').primary();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.string('title');
                table.string('company');
                table.string('status');
            }).then(() => {
                console.log('Success! Table created')
            }).catch((err) => {
                console.log('Problem creating table', err)
            })
        }
    });

} catch(err) {
    console.log(`There was an problem setting up the database: ${err}`)
}

module.exports = knex;