const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Djela
router.get('/', async (req, res) => {
    const djela = await loadDjelaCollection();
    res.send(await djela.find({}).toArray());
})

//Post Djela
router.post('/', async (req, res) => {
    const djela = await loadDjelaCollection();
    const result = await djela.insertOne({
        naziv: req.body.naziv,
        idGalerije: new mongodb.ObjectId(req.body.idGalerije),
        idVrstaDjela: new mongodb.ObjectId(req.body.idVrstaDjela),
        status: req.body.status
    });
    res.status(201).json({id: result.insertedId});
})

//Delete Djela
router.delete('/:id', async (req, res) => {
    const djela = await loadDjelaCollection();
    await djela.deleteOne({_id: new mongodb.ObjectId(req.params.id)});

    res.status(200).send();
})

//Update Galerija
router.patch('/:id', async (req, res) => {
    const djela = await loadDjelaCollection();
    await djela.updateOne({_id: new mongodb.ObjectId(req.params.id)}, { $set: {
        naziv: req.body.naziv,
        idGalerije: new mongodb.ObjectId(req.body.idGalerije),
        idVrstaDjela: new mongodb.ObjectId(req.body.idVrstaDjela),
        status: req.body.status
    }});

    res.status(200).send();
})

async function loadDjelaCollection () {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017');

    return client.db('local').collection('djela');
}


module.exports = router;
