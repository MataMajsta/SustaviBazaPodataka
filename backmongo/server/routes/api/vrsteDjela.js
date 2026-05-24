const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Vrste Djela
router.get('/', async (req, res) => {
    const VrsteDjela = await loadVrsteDjelaCollection();
    res.send(await VrsteDjela.find({}).toArray());
})

// Post delete i update su tu cisto eto ako trebali, ne znam da ce se koristit

//Post Vrste Eventa
router.post('/', async (req, res) => {
    const VrsteDjela = await loadVrsteDjelaCollection();
    await VrsteDjela.insertOne({
        tip: req.body.tip,
        info: req.body.info
    });
    res.status(201).send();
})

//Delete Vrste Djela
router.delete('/:id', async (req, res) => {
    const VrsteDjela = await loadVrsteDjelaCollection();
    await VrsteDjela.deleteOne({_id: new mongodb.ObjectId(req.params.id)});

    res.status(200).send();
})

//Update Vrste Djela
router.patch('/:id', async (req, res) => {
    const VrsteDjela = await loadVrsteDjelaCollection();
    await VrsteDjela.updateOne({_id: new mongodb.ObjectId(req.params.id)}, { $set: {
        tip: req.body.tip,
        info: req.body.info
    }});

    res.status(200).send();
})

async function loadVrsteDjelaCollection () {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017');

    return client.db('local').collection('vrstaDjela');
}


module.exports = router;
