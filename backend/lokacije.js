const express = require('express');
const router = express.Router();
const client = require('./db');

// GET /lokacije
router.get('/', (req, res) => {
    const query = 'SELECT * FROM lokacija';
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching locations');
        }
        res.status(200).json(result.rows);
    });
});

module.exports = router;