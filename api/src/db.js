require('dotenv').config();
const { Sequelize } = require('sequelize');
// const fs = require('fs');
// const path = require('path');
const DogModel = require("./models/Dog")
const TemperamentosModel = require("./models/temperaments")
const Dog_Temperaments_Model = require("./models/dogTemperaments")

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});



DogModel(sequelize);
TemperamentosModel(sequelize);
Dog_Temperaments_Model(sequelize);

const { dog, temperaments, dogTemperaments } = sequelize.models;

// const Dog_Temperaments = sequelize.define("Dog_Temperaments",{},{ timestamps: false })

dog.belongsToMany(temperaments, { through: 'dogTemperamento' });
temperaments.belongsToMany(dog, { through: 'dogTemperamento' });

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};