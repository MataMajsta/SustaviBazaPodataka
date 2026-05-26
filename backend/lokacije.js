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
// POST /lokacije
router.post('/', (req, res) => {
    const { mjesto,drzava, adresa } = req.body;
    const query = 'INSERT INTO lokacija (mjesto,drzava, adresa) VALUES ($1, $2,$3) RETURNING *';
    client.query(query, [mjesto, drzava, adresa], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating location');
        }
        res.status(201).json(result.rows[0]);
    });
});
module.exports = router;