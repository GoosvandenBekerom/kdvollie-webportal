"use strict"
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config/database');

// Connect to Database and setup connection and error events
mongoose.connect(config.database, { promiseLibrary: require('bluebird') });
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors()); // Allow requests from other domains
app.use(express.static(path.join(__dirname, 'public'))); // Set static file location
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Log incomming requests
app.use(morgan('tiny'));

// routes
app.use('/user', users);

// Index route
app.get('/', (req, res) => {
    res.send('Index page');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        title: 'Error',
        message: err.message,
        error: err
    });
    /* Change to this in production
    res.status(err.status || 500);
    if (err.status === 404) {
        res.render('error', {
            title: 'Pagina niet gevonden',
            message: err.message,
            error: {}
        });
    }
    else {
        res.render('error', {
            title: 'Er is iets fout gegaan',
            message: err.message,
            error: {}
        });
    }*/
});

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});

module.exports = app;
