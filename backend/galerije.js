const express = require('express');
const router = express.Router();
const client = require('./db');

// GET /galerije
router.get('/', (req, res) => {
    const query = 'SELECT * FROM galerija';
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching galleries');
        }
        res.status(200).json(result.rows);
    });
});

// POST /galerije
router.post('/', (req, res) => {       
    const { idgalerija, naziv, cijena_ulaza, info, lokacija_id } = req.body;       
    const query = 'INSERT INTO galerija (idgalerija, naziv, cijena_ulaza, info, lokacijaid) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    client.query(query, [idgalerija, naziv, cijena_ulaza, info, lokacija_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error inserting gallery');
        }
        res.status(201).json(result.rows[0]);
    });
});

// PATCH /galerije/:id
router.patch('/:id', (req, res) => {
    const id = req.params.id;       
    const { naziv, cijena_ulaza, info, lokacijaid } = req.body;
    const query = 'UPDATE galerija SET naziv = $1, cijena_ulaza = $2, info = $3, lokacijaid = $4 WHERE idgalerija = $5 RETURNING *';
    client.query(query, [naziv, cijena_ulaza, info, lokacijaid, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating gallery');
        }
        res.status(200).json(result.rows[0]);
    }); 
}); 

// DELETE /galerije/:id
router.delete('/:id', (req, res) => {
    const id = req.params.id;       
    const query = 'DELETE FROM galerija WHERE idgalerija = $1';
    client.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting gallery');
        }
        res.status(200).send('Gallery deleted successfully');
    });
});

module.exports = router;