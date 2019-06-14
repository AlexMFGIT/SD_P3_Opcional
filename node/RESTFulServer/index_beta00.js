'use strict'

const express = require('express');
const app = express();

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
app.listen(3000, ()=>{
    console.log(`API REST ejecutándose en http://localhost:3000/api/product`);
});