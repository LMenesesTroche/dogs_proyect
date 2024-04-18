const { DataTypes } = require('sequelize');
const { toDefaultValue } = require('sequelize/lib/utils');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dogs', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    img:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    years:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    breed_group:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    temperament:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{timestamps: false});
};