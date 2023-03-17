const express = require('express');
const noteRoute = require('../routes/notes');


const app = express();

app.use('/notes', noteRoute);

module.exports = app