const express = require('express');
const noteRoute = require('./notes');


const app = express();

app.use('/notes', noteRoute);

module.exports = app;