const mongoose = require('mongoose');
const logger = require('./logger');
require('dotenv').config();

const dbUrl = process.env.DB_URL;

module.exports = function () {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
    .then(() => logger.info(`Connected to ${dbUrl}`))
    .catch((error) => {
      logger.error('could not connected to', error);
      throw error
    })
}