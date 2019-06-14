'use strict'

// Asigna el puerto a la variable de entorno. Si no existe coge el 8080
const port = process.env.PORT || 3000;

const express = require('express');
const logger = require('morgan');

const app = express();

// Middlewares
app.use(logger('dev')); // Prueba tambien tiny, short, common, combined (Opcional, busca 'morgan' en Internet)
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Routes
app.get('/api/product', (req, res) => {
    res.status(200).send({products:{}});
});

app.get('/api/product/:productID', (req, res) => {
    res.status(200).send({product:`${req.params.productID}`});
});

app.post('/api/product', (req, res) => {
    console.log(req.body);
    res.status(200).send({product:`El producto se ha recibido y creado`});
});

app.put('/api/product/:productID', (req, res) => {
    res.status(200).send({product:`${req.params.productID}`});
});

app.delete('/api/product/:productID', (req, res) => {
    res.status(200).send({product:`${req.params.productID}`});
});

// Lanzamos nuestro servicio
app.listen(port, ()=>{
    console.log(`API REST ejecutándose en http://localhost:${port}/api/product`);
});