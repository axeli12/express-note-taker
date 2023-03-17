const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { text } = require('express');
const { json } = require =('express');
const uniqid = require('uniqid');
const { response } = require('.');



notes.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    (err) ? err : res.json(JSON.parse(data));
  }) ;
});

notes.post('/', (req, res) => {
    const { text, title } = req.body;
    if (text && title) {
        const newNote = { text, title, id: uniqid() };
        fs.readFile('./db/db.json', (err, data) => {
            (err) ? err : res.json(JSON.parse(data));

            const newData = JSON.parse(data);

            newData.push(newNote);
            fs.writeFileSync('./db/db.json', JSON.stringify(newData, null, 4), (err) =>{
                const respon = {
                    status : 'succses',
                    body: newNote,
                };
                res.json(respon)
                if (err) throw err;
            })
        })
    }
})

module.exports = notes;