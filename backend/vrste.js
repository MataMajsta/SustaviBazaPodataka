const express = require('express');
const router = express.Router();
const client = require('./db');

// GET /vrste/djela
router.get('/djela', (req, res) => {
    const query = 'SELECT * FROM vrsta_djela';
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching types of artwork');
        }
        res.status(200).json(result.rows);
    });
});

// GET /vrste/eventi
router.get('/eventi', (req, res) => {
    const query = 'SELECT * FROM vrsta_eventa'; 
    client.query(query, (err, result) => {
        if (err) {  
            console.error(err);           
            return res.status(500).send('Error fetching event types');
        }
        res.status(200).json(result.rows);
    });
});

module.exports = router;