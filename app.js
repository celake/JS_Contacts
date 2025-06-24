const express = require('express');
const mongoose = require('mongoose'); 
const ejsMate = require('ejs-mate');
const path = require('path');
const Contact = require('./models/contacts');
const Group = require('./models/groups')
const session = require('express-session')
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

// Set up templating
app.engine('ejs', ejsMate);
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'))); //set path to static files
app.use(express.urlencoded({extended: true})); //parse req.body 

// Session cookies
const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        HttpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));

app.use((req, res, next) => {
    if (req.originalUrl) {
        req.session.returnTo = res.originalUrl;
    }
    // console.log(session.returnTo)
    next();
})

app.get('/contacts', async (req, res, next) => {
    const contacts =  await Contact.find({});
    const groups =  await Group.find({});
    res.render('index', { contacts, groups });
})

app.get('/contacts/new', async(req, res, ) => {
    const currentUrl = req.url;
    const returnTo = `contacts/new`
    const groups =  await Group.find({});
    res.render('contacts/new', { groups, currentUrl, returnTo});
})

app.post('/contacts', (req, res) => {
    res.send("Submity new contact form");
})

app.get('/contacts/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    const returnTo = `contacts/${id}/edit`
    const groups =  await Group.find({});
    const contact = await Contact.findById(id).populate('groups');
    res.render('contacts/edit', { contact, groups, returnTo });
})

app.put('/contacts/:id', (req, res) => {
    res.send("Submit edit form!");
})

app.get('/contacts/:id',async(req, res, next) => {
    const { id } = req.params;
    const contact = await Contact.findById(id).populate('groups');
    res.render('contacts/show', {contact});
})

app.delete('/contacts/:id', (req, res) => {
    res.send("Delete Contact!");
})

app.get('/groups', async (req, res, next) => {
    const returnTo = req.query.returnTo;
    const groups =  await Group.find({});
    res.render('groups/index', {groups, returnTo});
})

app.post('/groups', (req, res) => {
    const { returnTo } = req.body;
    res.redirect(returnTo)
})

// Open server connection
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})