const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get AutorDjelo
router.get('/', async (req, res) => {
    const autorDjelo = await loadAutorDjeloCollection();
    res.send(await autorDjelo.find({}).toArray());
})

//Post AutorDjelo
router.post('/', async (req, res) => {
    const autorDjelo = await loadAutorDjeloCollection();
    await autorDjelo.insertOne({
        idDjela: new mongodb.ObjectId(req.body.idDjela),
        idAutora: new mongodb.ObjectId(req.body.idAutora)
    });
    res.status(201).send();
})

//Delete AutorDjelo
router.delete('/:id', async (req, res) => {
    const autorDjelo = await loadAutorDjeloCollection();
    await autorDjelo.deleteOne({_id: new mongodb.ObjectId(req.params.id)});

    res.status(200).send();
})

//Update Galerija
router.patch('/:id', async (req, res) => {
    const autorDjelo = await loadAutorDjeloCollection();
    await autorDjelo.updateOne({_id: new mongodb.ObjectId(req.params.id)}, { $set: {
        idAutora: new mongodb.ObjectId(req.body.idAutora),
        idDjela: new mongodb.ObjectId(req.body.idDjela)
    }});

    res.status(200).send();
})

async function loadAutorDjeloCollection () {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017');

    return client.db('local').collection('autorDjelo');
}


module.exports = router;
