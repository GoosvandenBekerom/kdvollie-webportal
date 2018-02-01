"use strict"
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const config = require('../config/database');
const Promise = require('bluebird');

const bcrypt = Promise.promisifyAll(bcryptjs);

// User Schema
const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = (id) => {
    return User.findById(id).exec();
};

module.exports.getUserByUsername = (username) => {
    const query = {username: username};
    return User.findOne(query).exec();
};

module.exports.addUser = async newUser => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        return newUser.save();
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports.comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
};
