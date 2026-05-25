const express = require('express');
const router = express.Router();
const client = require('./db');

// GET /eventi
router.get('/', (req, res) => {
    const query = 'SELECT * FROM eventovi'; 
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
    const { idevent, naziv, info, cijena, lokacijaid, vrstaid } = req.body;
    const query = 'INSERT INTO eventovi (idevent, naziv, info, cijena, lokacijaid, vrstaid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    client.query(query, [idevent, naziv, info, cijena, lokacijaid, vrstaid], (err, result) => {
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
    const { naziv, info, cijena, lokacijaid, vrstaid } = req.body;
    const query = 'UPDATE eventovi SET naziv = $1, info = $2, cijena = $3, lokacijaid = $4, vrstaid = $5 WHERE idevent = $6 RETURNING *';   
    client.query(query, [naziv, info, cijena, lokacijaid, vrstaid, id], (err, result) => {
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
    const query = 'DELETE FROM eventovi WHERE idevent = $1';
    client.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting event');
        }
        res.status(200).send('Event deleted successfully');
    });
});

module.exports = router;