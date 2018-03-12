"use strict"
const mongoose = require('mongoose');
const config = require('../config/database');

const pageSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  template: {
    type: String,
    default: 'default.html'
  }
});

const Page = module.exports = mongoose.model('Page', pageSchema);

module.exports.getById = id => {
  return Page.findById(id).exec();
};

module.exports.getByTitle = title => {
  return Page.findOne({title: title}).exec();
};

module.exports.addPage = newPage => {
  return newPage.save();
};
