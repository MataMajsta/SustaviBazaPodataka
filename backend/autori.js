const express = require('express');
const router = express.Router();
const client = require('./db');


// GET /autori
router.get('/', (req, res) => {
    const query = 'SELECT * FROM autori';
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching authors');
        }
        res.status(200).json(result.rows);
    });
});

// POST /autori
router.post('/', (req, res) => {
    const { naziv, info } = req.body;          
    const query = 'INSERT INTO autori (naziv, info) VALUES ($1, $2) RETURNING *';  
    client.query(query, [naziv, info], (err, result) => {
        if (err) {  
            console.error(err);
            return res.status(500).send('Error creating author');
        }
        res.status(201).json(result.rows[0]);
    });
});




module.exports = router;