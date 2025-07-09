const express = require('express');
const mongoose = require('mongoose'); 
const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session')

// mongoose models for DB
const Contact = require('./models/contacts');
const Group = require('./models/groups');


//import routes
const contactRoutes = require('./routes/contacts');
const groupRoutes = require('./routes/groups');

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
app.use(methodOverride('_method')); //allows methods other than GET and POST for html form submission


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

// flash messages
app.use(flash());

// error messages
app.use((req, res, next) => {
  const [error] = req.flash('error');
  const [success] = req.flash('success');

  if (error) {
    res.locals.flashClass = 'error';
    res.locals.flashMsg = error;
  } else if (success) {
    res.locals.flashClass = 'success';
    res.locals.flashMsg = success;
  } else {
    res.locals.flashClass = '';
    res.locals.flashMsg = '';
  }

  next();
});


app.use('/contacts', contactRoutes);
app.use('/groups', groupRoutes);

// set error messages


// Open server connection
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})