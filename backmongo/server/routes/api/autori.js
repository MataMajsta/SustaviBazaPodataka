const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Autori
router.get('/', async (req, res) => {
    const autori = await loadAutoriCollection();
    res.send(await autori.find({}).toArray());
})

//Post Autori
router.post('/', async (req, res) => {
    const autori = await loadAutoriCollection();
    await autori.insertOne({
        naziv: req.body.naziv,
        info: req.body.info
    });
    res.status(201).send();
})

//Delete Autori
router.delete('/:id', async (req, res) => {
    const autori = await loadAutoriCollection();
    await autori.deleteOne({_id: new mongodb.ObjectId(req.params.id)});

    res.status(200).send();
})

//Update Galerija
router.patch('/:id', async (req, res) => {
    const autori = await loadAutoriCollection();
    await autori.updateOne({_id: new mongodb.ObjectId(req.params.id)}, { $set: {
        naziv: req.body.naziv,
        info: req.body.info
    }});

    res.status(200).send();
})

async function loadAutoriCollection () {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017');

    return client.db('local').collection('autori');
}


module.exports = router;
