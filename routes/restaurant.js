const { json } = require('body-parser');
const express = require ('express')
const database = require ('../database');
const router = express.Router();

router
    //Consultando restaurant platos con su tipo
    .post('/', async (req, res) => {
        const { id } = req.body;
        try {
            const data = await database.query(
                'SELECT pl.IdPlato, pl.NombrePlato, pl.Precio, pl.detalle, pl.URLImagen, tp.IdTipoPlato, tp.NombreTipo, res.FK_idStatus FROM restaurante res INNER JOIN plato pl ON pl.FK_IdRestaurante = res.IdRestaurante INNER JOIN tipo_de_plato tp ON tp.IdTipoPlato = pl.FK_IdTipoPlato WHERE res.IdRestaurante = ' + id
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