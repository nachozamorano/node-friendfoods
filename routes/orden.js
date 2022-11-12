const { json } = require('body-parser');
const express = require ('express')
const database = require ('../database');
const router = express.Router();

router
    //Consultando estado orden
    .post('/estado', async (req, res) => {
        const { id, num } = req.body;
        try {
            var data = await database.query(
                'SELECT ord.FK_IdEstado FROM orden ord INNER JOIN mesa me ON ord.FK_IdMesa = me.IdMesa WHERE me.FK_IDRestaurante ='+id+' AND me.numero ='+num+' ORDER BY IdOrden DESC LIMIT 1'
            )
            res.contentType('json');
            res.status(200);
            res.json(data);
        } catch (e) {
            console.log(e);
            console.error('Error consultando estado de la orden');
            res.status(500);    
            res.end('Error consultando estado de la orden, Estas seguro que existe?');
        }

    });
module.exports = router;