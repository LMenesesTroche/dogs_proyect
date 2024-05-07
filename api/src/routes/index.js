// const { Router } = require('express');
const express = require('express');
const getDogs = require("../controllers/getDogs");
const getByName = require('../controllers/getByName');
const postDogs = require('../controllers/postDogs');
const getTemperaments = require('../controllers/getTemperaments');
const getById = require('../controllers/getById');
const getByRaza = require('../controllers/getByRaza');
const deleteDog = require('../controllers/deleteDog');

const myRouter = express.Router();

myRouter.get('/dogs',getDogs); 

myRouter.get('/dogs/id/:id',getById); 

myRouter.get('/dogs/name/',getByName); 

myRouter.post('/dogs',postDogs); 

myRouter.get('/dogs/temperaments',getTemperaments); 

myRouter.get('/dogs/raza/:raza',getByRaza); 

myRouter.delete('/dogs/delete/:Id',deleteDog); 

module.exports = myRouter;
