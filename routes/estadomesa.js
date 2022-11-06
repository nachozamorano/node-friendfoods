const { json } = require('body-parser');
const express = require ('express')
const database = require ('../database');
const router = express.Router();

router
    //Consultando restaurant platos con su tipo
    .post('/', async (req, res) => {
        const { id, num } = req.body;
        try {
            var data = await database.query(
                'SELECT me.FK_IdEstadoMesa FROM mesa me WHERE me.FK_IDRestaurante ='+id+' AND me.numero ='+num
            )
            res.contentType('json');
            res.status(200);
            res.json(data);
        } catch (e) {
            console.log(e);
            console.error('Error consultando estado_mesa');
            res.status(500);    
            res.end('Error consultando estado de la mesa, Estas seguro que existe?');
        }

    });
module.exports = router;