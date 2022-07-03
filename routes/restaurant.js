const { json } = require('body-parser');
const express = require ('express')
const database = require ('../database');
const router = express.Router();

router
    //Consultando restaurant
    .post('/', async (req, res) => {
        const { id } = req.body;
        try {
            const data = await database.query(
                'SELECT * FROM restaurante WHERE IdRestaurante = ' + id
            )
            res.contentType('json');
            res.status(200);
            res.json(data);
        } catch (e) {
            console.log(e);
            console.error('Error consultando restaurant');
            res.status(500);
            res.end('Error consultando restaurant, Estas seguro que existe?');
        }

    });
module.exports = router;