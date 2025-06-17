const Express = require('express');
const mongoose = require('mongoose'); 



const app = Express();
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

app.get('/contacts', (req, res) => {
    res.send("All contacts!");
})

app.get('/contacts/new', (req, res) => {
    res.send("Create new contact form!");
})

app.post('/contacts', (req, res) => {
    res.send("Submity new contact form");
})

app.get('/contacts/:id/edit', (req, res) => {
    res.send("Contact edit form!");
})

app.put('/contacts/:id', (req, res) => {
    res.send("Submit edit form!");
})

app.get('/contacts/:id', (req, res) => {
    res.send("Contact Detail!");
})

app.delete('/contacts/:id', (req, res) => {
    res.send("Delete Contact!");
})

app.get('/groups', (req, res) => {
    res.send("Edit Group Form");
})

app.post('/groups', (req, res) => {
    res.send("Submit Group Form");
})

// Open server connection
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})