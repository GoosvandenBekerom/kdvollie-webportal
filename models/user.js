"use strict"
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const config = require('../config/database');
const Promise = require('bluebird');

const bcrypt = Promise.promisifyAll(bcryptjs);

const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getById = id => {
  return User.findById(id).exec();
};

module.exports.getByEmail = email => {
  const query = {email: email};
  return User.findOne(query).exec();
};

module.exports.addUser = async newUser => {
  try {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    return newUser.save();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};
