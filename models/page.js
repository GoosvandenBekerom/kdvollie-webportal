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

module.exports.getById = async id => {
  return await Page.findById(id).exec()
};

module.exports.getByTitle = async title => {
  return await Page.findOne({title: title}).exec()
};

module.exports.addPage = async newPage => {
  return await newPage.save()
};
