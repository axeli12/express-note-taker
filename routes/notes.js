const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');


notes.get('/', (req, res) => {
    fs.readFile(path.resolve(__dirname, '../db/db.json' ,'utf8'),  (err, data) => {
        if (err) console.log(err);
        return res.json(JSON.parse(data));
    });
});

notes.post('/', (req, res) => {
    if (req.body) {
        const { title,text } = req.body;
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        fs.readFile(path.resolve(__dirname, './db/db.json' ,'utf8'), (err, data) => {
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

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.lod(err)
        }

        const json = JSON.parse(data);
        const result = json.filter((note) => note.id !== noteId);
        
            fs.writeFileSync('/db/db.json', JSON.stringify(result, null, 4))
            res.json(`Note ${noteId} has been deleted`)
            //  catch (err) {
            //     console.log(err)
            // };
    });
});

module.exports = notes;