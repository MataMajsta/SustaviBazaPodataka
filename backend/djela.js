const express = require('express');
const router = express.Router();
const client = require('./db');

// GET /djela
router.get('/', (req, res) => {
    const query = 'SELECT * FROM djela'; 
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching works');
        }
        res.status(200).json(result.rows);
    });
});
// POST /djela
router.post('/', (req, res) => {
    const { naziv, info, galerija,vrsta } = req.body;    
    const query = 'INSERT INTO djela (naziv, info, galerija, vrsta) VALUES ($1, $2, $3, $4) RETURNING *';
    client.query(query, [naziv, info,  galerija, vrsta], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating work');
        }
        res.status(201).json(result.rows[0]);
    });
});

//DELETE /djela/:id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM djela WHERE iddjela = $1';
    client.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting work');
        }
        res.status(200).send('Work deleted successfully');
    });
});
// PATCH /djela/:id
router.patch('/:id', (req, res) => {
    const id = req.params.id;   
    const { naziv, info, galerija, vrsta } = req.body;

    const query = 'UPDATE djela SET naziv = $1, info = $2, galerija = $3, vrsta = $4 WHERE iddjela = $5 RETURNING *';
    client.query(query, [naziv, info, galerija, vrsta, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating work');
        }
        res.status(200).json(result.rows[0]);
    });
});

module.exports = router;