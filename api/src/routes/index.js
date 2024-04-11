// const { Router } = require('express');
const express = require('express');
const getDogs = require("../controllers/getDogs");
const getByName = require('../controllers/getByName');
const postDogs = require('../controllers/postDogs');
const getTemperaments = require('../controllers/getTemperaments');
const getById = require('../controllers/getById');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const myRouter = express.Router();

// const router = Router();

myRouter.get('/dogs',getDogs); 

myRouter.get('/dogs/:id',getById); 

myRouter.get('/name/',getByName); 

myRouter.post('/dogs',postDogs); 

myRouter.get('/temperaments',getTemperaments); 




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = myRouter;
