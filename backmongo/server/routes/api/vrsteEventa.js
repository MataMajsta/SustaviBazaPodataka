const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Vrste Eventa
router.get('/', async (req, res) => {
    const VrsteEventa = await loadVrsteEventaCollection();
    res.send(await VrsteEventa.find({}).toArray());
})

// Post delete i update su tu cisto eto ako trebali, ne znam da ce se koristit

//Post Vrste Eventa
router.post('/', async (req, res) => {
    const VrsteEventa = await loadVrsteEventaCollection();
    await VrsteEventa.insertOne({
        tip: req.body.tip
    });
    res.status(201).send();
})

//Delete Vrste Eventa
router.delete('/:id', async (req, res) => {
    const VrsteEventa = await loadVrsteEventaCollection();
    await VrsteEventa.deleteOne({_id: new mongodb.ObjectId(req.params.id)});

    res.status(200).send();
})

//Update Vrste Eventa
router.patch('/:id', async (req, res) => {
    const VrsteEventa = await loadVrsteEventaCollection();
    await VrsteEventa.updateOne({_id: new mongodb.ObjectId(req.params.id)}, { $set: {
        tip: req.body.tip
    }});

    res.status(200).send();
})

async function loadVrsteEventaCollection () {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017');

    return client.db('local').collection('vrstaEventa');
}


module.exports = router;
