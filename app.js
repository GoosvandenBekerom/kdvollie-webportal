const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);
// On Connected
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors()); // To allow requests from other domains
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Log incomming requests
app.use(morgan('tiny'));

// routes
app.use('/users', users);

// Index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});