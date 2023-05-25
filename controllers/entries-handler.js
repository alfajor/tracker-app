const knex = require('../db-config');

// CRUD controllers
const allEntries = async (req, res) => {
    const query = await knex.select('*').from('entries');
    const data = await res.json(query);

    return data;
}

const postEntry = async (req, res) => {
    knex('entries').insert({
        'title': req.body.title,
        'company': req.body.company,
        'status': req.body.status
    }).then(() => {
        console.log(`Entry created ${req.body.title}`)
    })
}

const updateEntry = async (req, res) => {
    knex('entries').where('id', req.params.id).update({
        'status': req.body.status
    }).then(() => {
        console.log(`Entry was updated: ${req.params.id}`)
    });
}

const deleteEntry = async (req, res) => {    
    knex('entries').where('id', req.params.id).del().then(() => {
        console.log(`Entry was removed, ${req.params.id}`)
    })
}

module.exports = {allEntries, postEntry, updateEntry, deleteEntry}