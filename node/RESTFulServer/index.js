'use strict'

// Asigna el puerto a la variable de entorno. Si no existe coge el 3000
const port = process.env.PORT || 3000;

const express = require('express');
const logger = require('morgan');
const mongojs = require('mongojs');
const cors = require('cors');

const app = express();

var db = mongojs("SD");
var id = mongojs.ObjectID;

var allowCrossTokenHeaders = (req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    return next();
};

var allowCrossTokenOrigin = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    return next();
};

// Middlewares
app.use(logger('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors());
app.use(allowCrossTokenHeaders);
app.use(allowCrossTokenOrigin);

// Anyadimos un trigger para cambiar de coleccion dinamicamente
app.param("coleccion", (req, res, next, coleccion) => {
    req.collection = db.collection(coleccion);
    return next();
});

// Routes
app.get('/api', (req, res, next) => {
    db.getCollectionNames((err, colecciones) => {
        if(err) return next(err);
        res.json(colecciones);
    });
});

app.get('/api/tasks/:user', (req, res, next) => {
    req.collection = db.collection("tasks");

    req.collection.find({user: req.params.user}).toArray((err, coleccion) => {
        if(err) return next(err);
        res.json(coleccion);
    });
});

app.get('/api/:coleccion', (req, res, next) => {
    req.collection.find((err, coleccion) => {
        if(err) return next(err);
        res.json(coleccion);
    });
});

app.get('/api/:coleccion/:id', (req, res, next) => {
    req.collection.findOne({_id: id(req.params.id)}, (err, elemento) => {
        if(err) return next(err);
        res.json(elemento);
    });
});

app.post('/api/sessions', (req, res, next) => {
    const userData = req.body;
    console.log(userData);

    req.collection = db.collection("users");
    req.collection.findOne({username: userData.username, password: userData.password}, (err, elemento) => {
        if(err) return next(err);
        res.json(elemento);
    });
});

app.post('/api/:coleccion', (req, res, next) => {
    const elemento = req.body;

    // Save es capaz de crear o actualizar una entrada. Es como si
    // automaticamente hiciese insert o update en funcion de lo que necesite
    req.collection.save(elemento, (err, elementoGuardado) => {
        if(err) return next(err);
        res.json(elementoGuardado);
    });
});

app.put('/api/:coleccion/:id', (req, res, next) => {
    const elemento = req.body;
    console.log(elemento);

    // update nos pide una query json para actualizar la entrada especificada
    // En nuestro caso esta query sera la id que nos digan en los parametros
    // Tambien pasamos los nuevos datos
    req.collection.update({_id: id(req.params.id)}, elemento, (err, resultado) => {
        if(err) return next(err);
        res.json(resultado);
    });
});

app.delete('/api/:coleccion/:id', (req, res, next) => {
    // remove nos pide una query json para borrar la entrada especificada
    // En nuestro caso esta query sera la id que nos digan en los parametros
    req.collection.remove({_id: id(req.params.id)}, (err, resultado) => {
        if(err) return next(err);
        res.json(resultado);
    });
});

// Lanzamos nuestro servicio
app.listen(port, ()=>{
    console.log(`API REST ejecutándose en http://localhost:${port}/api`);
});
