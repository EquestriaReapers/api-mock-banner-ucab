const express = require('express');
const router = require('./src/routes/api');
const morgan = require('morgan');
const app = express();
const { sequelize } = require('./src/config/connection');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Hola UCABISTA!');
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection success');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Sync models');
    app.listen(port, () => {
      console.log(`Server listen on ${process.env.HOST}:${port}`);
    });
  })
  .catch((error) => {
    console.error('Connection fail', error);
  });