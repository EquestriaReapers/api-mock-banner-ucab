const { Sequelize } = require('sequelize');
require('dotenv').config();
const conectionString = process.env.CONNECTION_STRING;

const sequelize = new Sequelize(conectionString)

module.exports = {
  sequelize
}