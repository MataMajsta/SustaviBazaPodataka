const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Galerije
router.get('/', async (req, res) => {
    const galerije = await loadGalerijeCollection();
    res.send(await galerije.find({}).toArray());
})

//Post Galerije
router.post('/', async (req, res) => {
    const galerije = await loadGalerijeCollection();
    await galerije.insertOne({
        naziv: req.body.naziv,
        cijenaUlaza: req.body.cijenaUlaza,
        info: req.body.info,
        idLokacije: new mongodb.ObjectId(req.body.idLokacije)
    });
    res.status(201).send();
})

//Delete Galerije
router.delete('/:id', async (req, res) => {
    const galerije = await loadGalerijeCollection();
    await galerije.deleteOne({_id: new mongodb.ObjectId(req.params.id)});

    res.status(200).send();
})

//Update Galerija
router.patch('/:id', async (req, res) => {
    const galerije = await loadGalerijeCollection();
    await galerije.updateOne({_id: new mongodb.ObjectId(req.params.id)}, { $set: {
        naziv: req.body.naziv,
        cijenaUlaza: Number(req.body.cijenaUlaza),
        info: req.body.info,
        idLokacije: new mongodb.ObjectId(req.body.idLokacije)
    }});

    res.status(200).send();
})

async function loadGalerijeCollection () {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017');

    return client.db('local').collection('galerija');
}


module.exports = router;
