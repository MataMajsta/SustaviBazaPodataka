const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Lokacije
router.get('/', async (req, res) => {
    const lokacije = await loadLokacijeCollection();
    res.send(await lokacije.find({}).toArray());
})

//Post Lokacije
router.post('/', async (req, res) => {
    const lokacije = await loadLokacijeCollection();
    const result = await lokacije.insertOne({
        mjesto: req.body.mjesto,
        drzava: req.body.drzava,
        adresa: req.body.adresa
    });
    res.status(201).json({id: result.insertedId});
})

//Delete Lokacije
router.delete('/:id', async (req, res) => {
    const lokacije = await loadLokacijeCollection();
    await lokacije.deleteOne({_id: new mongodb.ObjectId(req.params.id)});

    res.status(200).send();
})

//Update Lokacije
router.patch('/:id', async (req, res) => {
    const lokacije = await loadLokacijeCollection();
    await lokacije.updateOne({_id: new mongodb.ObjectId(req.params.id)}, { $set: {
        mjesto: req.body.mjesto,
        drzava: req.body.drzava,
        adresa: req.body.adresa
    }});

    res.status(200).send();
})

async function loadLokacijeCollection () {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017');

    return client.db('local').collection('lokacijka');
}


module.exports = router;
