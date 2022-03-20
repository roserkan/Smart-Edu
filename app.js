const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const app = express();
const config = require('./config');
const loaders = require('./loaders');
const routes = require('./routes');
global.basePath = __dirname;
global.userIN = null;

config();
loaders();

//Template Engine
app.set('view engine', 'ejs');

//Middlewares

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'my_keyboard_cat',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smart-edu' }),
    })
);
app.use(flash());
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

app.listen(3000, () => {
    routes(app);
    console.log('App started on port' + 3000);
});
