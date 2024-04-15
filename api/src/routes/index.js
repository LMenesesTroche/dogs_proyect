// const { Router } = require('express');
const express = require('express');
const getDogs = require("../controllers/getDogs");
const getByName = require('../controllers/getByName');
const postDogs = require('../controllers/postDogs');
const getTemperaments = require('../controllers/getTemperaments');
const getById = require('../controllers/getById');
const getByRaza = require('../controllers/getByRaza');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const myRouter = express.Router();

// const router = Router();

myRouter.get('/dogs',getDogs); 

myRouter.get('/dogs/:id',getById); 

myRouter.get('/dogs/name/:name',getByName); 

myRouter.post('/dogs',postDogs); 

myRouter.get('/dogs/temperaments',getTemperaments); 

myRouter.get('/dogs/raza/:raza',getByRaza); 





// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = myRouter;
