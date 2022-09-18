const { json } = require('body-parser');
const express = require ('express')
const database = require ('../database');
const router = express.Router();

router
    //Consultando restaurant platos con su tipo
    .post('/', async (req, res) => {
        const { id, code } = req.body;
        try {
            var data = [];
            if(code == "all"){
                data = await database.query(
                    'SELECT * FROM mesa WHERE FK_IDRestaurante ='+id
                )
            }else if(code == "free"){
                data = await database.query(
                    'SELECT * FROM mesa WHERE FK_IDRestaurante ='+id+' AND FK_IdEstadoMesa=1'
                )
            }else if(code == "pend"){
                data = await database.query(
                    'SELECT * FROM mesa WHERE FK_IDRestaurante ='+id+' AND FK_IdEstadoMesa=2'
                )
            }
            res.contentType('json');
            res.status(200);
            res.json(data);
        } catch (e) {
            console.log(e);
            console.error('Error consultando mesas');
            res.status(500);    
            res.end('Error consultando mesas, Estas seguro que existe?');
        }

    });
module.exports = router;