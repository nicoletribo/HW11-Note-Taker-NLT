// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const generateUniqueId = require('generate-unique-id');

let todoList = [];
const noteList = JSON.parse(fs.readFileSync('./db/db.json'))

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// HTML Routes
//return the index file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
//return the notes file
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

//API Routes
//read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => res.json(noteList));

//receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client
app.post('/api/notes', (req, res) => {
    const newNote = {
        text: req.body.text,
        id: generateUniqueId()
    };
    todoList = noteList;
    todoList.push(newNote);
    
    fs.writeFileSync('./db/db.json', JSON.stringify(todoList, null, 2));

    res.send(todoList);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
