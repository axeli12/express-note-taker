const notes = require('express').Router();
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { json } = require =('express');
const fs = require('fs');


notes.get('/notes', (req, res) => {
    fs.readFile(path.resolve(__dirname, '..', 'db/db.json'), 'utf8', (err, data) => {
        if (err) console.log(err);
        return res.json(JSON.parse(data));
    });
});

notes.post('/notes', (req, res) => {
    if (req.body) {
        const { title,text } = req.body;
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        fs.readFile(path.resolve(__dirname, '..', 'db/db.json'), 'utf8', (err, data) => {
            if (err) console.log(err);
            console.log(data);
            let newData = JSON.parse(data)
            console.log('New Data', newData)

            newData.push(newNote)

            let diffData = JSON.stringify(newData)

            fs.writeFile(path.resolve(__dirname, '..', 'db/db.json'), diffData, (err) => {
                return res.json();
            })
        })
    }
})

module.exports = notes;