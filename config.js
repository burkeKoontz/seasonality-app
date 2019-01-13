'use strict';

require('dotenv').config();

module.exports = {
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://admin:plantsAREveryCOOL333@ds155577.mlab.com:55577/seasonality-plants-app',
};
