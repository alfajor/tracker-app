const express = require('express');
const router = express.Router();

const entriesHandler = require('../controllers/entries-handler');

// CRUD route handling
router.get('/all', entriesHandler.allEntries);

router.post('/create', entriesHandler.postEntry);

router.put('/update/:id', entriesHandler.updateEntry);

router.delete('/delete/:id', entriesHandler.deleteEntry);

module.exports = router;