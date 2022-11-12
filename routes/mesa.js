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
                    'SELECT me.IdMesa, me.cantPersona, me.numero, det.nombreEstado FROM mesa me INNER JOIN estado_mesa det ON me.FK_IdEstadoMesa = det.IdEstadoMesa WHERE me.FK_IDRestaurante ='+id
                )
            }else if(code == "free"){
                data = await database.query(
                    'SELECT me.IdMesa, me.cantPersona, me.numero, det.nombreEstado FROM mesa me INNER JOIN estado_mesa det ON me.FK_IdEstadoMesa = det.IdEstadoMesa WHERE FK_IDRestaurante ='+id+' AND FK_IdEstadoMesa=1'
                )
            }else if(code == "pend"){
                data = await database.query(
                    'SELECT me.IdMesa, me.cantPersona, me.numero, det.nombreEstado FROM mesa me INNER JOIN estado_mesa det ON me.FK_IdEstadoMesa = det.IdEstadoMesa WHERE FK_IDRestaurante ='+id+' AND FK_IdEstadoMesa=2'
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

    })
    .post('/actualizarEstado', async (req, res) => {
        const { id, num, status } = req.body;
        try {
            var data = await database.query(
                'UPDATE mesa SET FK_IdEstadoMesa = '+status+' WHERE FK_IDRestaurante ='+id+' AND numero ='+num
            )
            res.contentType('json');
            res.status(200);
            res.json(data);
        } catch (e) {
            console.log(e);
            console.error('Error actualizando mesa');
            res.status(500);    
            res.end('Error actualizando la mesa, Estas seguro que existe?');
        }

    })
    .post('/estado', async (req, res) => {
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