// const { Router } = require('express');
const express = require('express');
const getDogs = require("../getDogs");
const getRaza = require('../getRaza');
const getByName = require('../getByName');
const postDogs = require('../postDogs');
const getTemperaments = require('../getTemperaments');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const myRouter = express.Router();

// const router = Router();

myRouter.get('/dogs',getDogs); 

myRouter.get('/raza/:razaMandada',getRaza); 

myRouter.get('/name/',getByName); 

myRouter.post('/dogs',postDogs); 

myRouter.get('/temperaments',getTemperaments); 




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = myRouter;
