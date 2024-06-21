const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de Sequelize con SSL habilitado
const sequelize = new Sequelize('bdmantenimientoauto', 'bdmantenimientoauto_user', 'L7CMRkl8HXe8I8ISbrVEdIg7AtbFmW5J', {
  host: 'dpg-cpqdch4s1f4s73cj168g-a.oregon-postgres.render.com',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Requerir SSL
      rejectUnauthorized: false // Deshabilitar la verificación de certificados (puede ser necesario en algunos entornos)
    }
  }
});

module.exports = sequelize;