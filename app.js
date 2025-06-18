const express = require('express');
const mongoose = require('mongoose'); 
const ejsMate = require('ejs-mate');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

//Database Connection
main()
    .then(() => {
        console.log("Connection Open on port 27017");
    }).catch(err => {
        console.log("Mongo connection error:");
        console.log(err);
    })

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactsJS');  
}

app.engine('ejs', ejsMate);
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/contacts', (req, res) => {
    res.render('index')
})

app.get('/contacts/new', (req, res) => {
    res.render('contacts/new')
})

app.post('/contacts', (req, res) => {
    res.send("Submity new contact form");
})

app.get('/contacts/:id/edit', (req, res) => {
    res.render('contacts/edit')
})

app.put('/contacts/:id', (req, res) => {
    res.send("Submit edit form!");
})

app.get('/contacts/:id', (req, res) => {
    res.render('contacts/show');
})

app.delete('/contacts/:id', (req, res) => {
    res.send("Delete Contact!");
})

app.get('/groups', (req, res) => {
    res.render('groups/index')
})

app.post('/groups', (req, res) => {
    res.send("Submit Group Form");
})

// Open server connection
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})