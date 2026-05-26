const express = require('express');
const router = express.Router();
const client = require('./db');

// GET /eventi
router.get('/', (req, res) => {
    const query = 'SELECT * FROM event'; 
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching events');
        }
        res.status(200).json(result.rows);
    });
});

// POST /eventi
router.post('/', (req, res) => {
    const { naziv, nova_lokacija, cijena_ulaza, info, galerija, vrsta } = req.body;
    const query = 'INSERT INTO event (naziv, nova_lokacija, cijena_ulaza, info, galerija, vrsta) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    client.query(query, [naziv, nova_lokacija, cijena_ulaza, info, galerija, vrsta], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating event');
        }
        res.status(201).json(result.rows[0]);
    });
}); 

// PATCH /eventi/:id
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const { naziv, nova_lokacija, cijena_ulaza, info, galerija, vrsta } = req.body;
    const query = 'UPDATE event SET naziv = $1, nova_lokacija = $2, cijena_ulaza = $3, info = $4, galerija = $5, vrsta = $6 WHERE idevent = $7 RETURNING *';   
    client.query(query, [naziv, nova_lokacija, cijena_ulaza, info, galerija, vrsta, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating event');
        }
        res.status(200).json(result.rows[0]);
    });
});

// DELETE /eventi/:id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM event WHERE idevent = $1';
    client.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting event');
        }
        res.status(200).send('Event deleted successfully');
    });
});

module.exports = router;