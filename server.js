const express = require('express');
const path = require('path')
const api = require('./routes/index.js')

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;



// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);

// Start the server on the port


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
