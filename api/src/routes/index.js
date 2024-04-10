// const { Router } = require('express');
const express = require('express');
const getDogs = require("../getDogs");
const getRaza = require('../getRaza');
const getByName = require('../getByName');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const myRouter = express.Router();

// const router = Router();

myRouter.get('/dogs',getDogs); 

myRouter.get('/raza/:id',getRaza); 

myRouter.get('/name/',getByName); 



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = myRouter;
