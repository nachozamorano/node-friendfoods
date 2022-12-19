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

    })
    .post('/insertar', async (req, res) => {
        const { id, num, total, rut, nombre, subtotal} = req.body;
        try {
            
            var boleta = await database.query(
                'INSERT INTO boleta (fecha,total) VALUES (NOW() - INTERVAL 3 HOUR, '+total+')'
            )

            var idMesa = await database.query(
                'SELECT IdMesa FROM mesa WHERE FK_IdRestaurante = '+ id + ' AND numero = '+ num
            )
            var data = await database.query(
                'INSERT INTO orden (FK_IdMesero, NombreCliente, fecha, FK_IdEstado, Subtotal, FK_IdBoleta, FK_IdMesa) VALUES ('+rut+', \''+nombre+'\', NOW() - INTERVAL 3 HOUR, 1, '+subtotal+', '+boleta.insertId+', '+idMesa[0].IdMesa+')'
            )
            
            res.contentType('json');
            res.status(200);
            res.json(data);
        } catch (e) {
            console.log(e);
            console.error('Error al insertar la orden');
            res.status(500);    
            res.end('Error al insertar la orden');
        }

    });

module.exports = router;