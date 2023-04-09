const notes = require('express').Router();
const fs = require('fs');
const uniqid = require('uniqid')


notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        (err) ? err : res.json(JSON.parse(data))
    })
    
})
notes.post('/', (req, res) => {

    const { text, title } = req.body;

    if (text && title) {

        const newNote = { text, title, id: uniqid() };

        fs.readFile('./db/db.json', (err, data) => {

            (err) ? err : res.json(JSON.parse(data));

            const pNote = JSON.parse(data);

            pNote.push(newNote);

            fs.writeFileSync('./db/db.json', JSON.stringify(pNote, null, 4), (err) => {
                const response = {
                    status: 'success',
                    body: newNote,
                };
                res.json(response);
                console.log(response);
                if (err) throw err;
            })
        })
    }
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.log(err)
        }

        const json = JSON.parse(data);
        const result = json.filter((note) => note.id !== noteId);
        
            fs.writeFileSync('./db/db.json', JSON.stringify(result, null, 4))
            res.json(`Note ${noteId} has been deleted`)
           
    });
});

module.exports = notes;