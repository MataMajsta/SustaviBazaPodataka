const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Events
router.get('/', async (req, res) => {
    const events = await loadEventsCollection();
    res.send(await events.find({}).toArray());
})

//Post Events
router.post('/', async (req, res) => {
    const events = await loadEventsCollection();
        await events.insertOne({
            naziv: req.body.naziv,
            cijenaUlaza: req.body.cijenaUlaza,
            info: req.body.info,
        idNoveLokacije: new mongodb.ObjectId(req.body.idNoveLokacije),
        idGalerije: new mongodb.ObjectId(req.body.idGalerije),
        idVrsteEventa: new mongodb.ObjectId(req.body.idVrsteEventa)
    });
    res.status(201).send();
})

//Delete Events
router.delete('/:id', async (req, res) => {
    const events = await loadEventsCollection();
    await events.deleteOne({_id: new mongodb.ObjectId(req.params.id)});

    res.status(200).send();
})

//Update Galerija
router.patch('/:id', async (req, res) => {
    const events = await loadEventsCollection();
    await events.updateOne({_id: new mongodb.ObjectId(req.params.id)}, { $set: {
        naziv: req.body.naziv,
        cijenaUlaza: Number(req.body.cijenaUlaza),
        info: req.body.info,
        idNoveLokacije: new mongodb.ObjectId(req.body.idNoveLokacije),
        idGalerije: new mongodb.ObjectId(req.body.idGalerije),
        idVrsteEventa: new mongodb.ObjectId(req.body.idVrsteEventa)
    }});

    res.status(200).send();
})

async function loadEventsCollection () {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017');

    return client.db('local').collection('event');
}


module.exports = router;