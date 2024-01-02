const { Sequelize } = require('sequelize');

const database = process.env.DB_NAME || "postgres";
const username = process.env.USERNAME || "postgres";
const password = process.env.PASSWORD || "";
const host = process.env.HOST || "localhost";

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
});

module.exports = {
  sequelize
}