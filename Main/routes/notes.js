const notes = require('express').Router();
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { json } = require=('express');
const fs = require('fs');


notes.get('/notes', (req, res) => {
    fs.readFile(path.resolve(__dirname, '..', 'db/db.json'), 'utf8', (err, data) => {
        if (err) console.log(err);
        return res.json(JSON.parse(data));
    });
});

module.exports = notes;