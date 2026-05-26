const express = require('express');
const router = express.Router();
const client = require('./db');


// GET /autor_djela
router.get('/', (req, res) => {
    const query = 'SELECT * FROM autor_djela';
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching author-works');
        }
        res.status(200).json(result.rows);
    });
});

// POST /autor_djela
router.post('/', (req, res) => {
    const { djelo, autor } = req.body;          
    const query = 'INSERT INTO autor_djela (djelo, autor) VALUES ($1, $2) RETURNING *';
    client.query(query, [djelo, autor], (err, result) => {
        if (err) {  
            console.error(err);
            return res.status(500).send('Error creating author-work');
        }
        res.status(201).json(result.rows[0]);
    });
});
// DELETE /autor_djela/:id kada šalješ po djelu
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM autor_djela WHERE djelo = $1';
    client.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting author-work');
        }
        res.status(200).send('Author-work deleted successfully');
    });
});
// DELETE /autor_djela/:id kada šalješ po autoru
router.delete('/autor/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM autor_djela WHERE autor = $1';
    client.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting author-work');
        }
        res.status(200).send('Author-work deleted successfully');
    });
});
// PATCH /autor_djela/:id
router.patch('/:id', (req, res) => {
    const id = req.params.id;   
    const { djelo, autor } = req.body;     
    const query = 'UPDATE autor_djela SET djelo = $1, autor = $2 WHERE idautor_djela = $3 RETURNING *';
    client.query(query, [djelo, autor, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating author-work');
        }   
        res.status(200).json(result.rows[0]);
    });
});

module.exports = router;