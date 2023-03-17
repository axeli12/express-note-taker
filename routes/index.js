const express = require('express');
const noteRoute = require('./notes.js');


const app = express();

app.use('/notes', noteRoute);

module.exports = app