"use strict"
const express = require('express');
const passport = require('passport');
const sanitizeHtml = require('sanitize-html');
const sanitizeOpts = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1','h2','img'])
}

const router = express.Router();

const config = require('../config/database');
const Page = require('../models/page');

// Register
router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {
  let cleanTitle = sanitizeHtml(req.body.title, {allowedTags: []});
  let cleanContent = sanitizeHtml(req.body.content, sanitizeOpts);

  let newPage = new Page({
    title: cleanTitle,
    content: cleanContent,
    template: req.body.template || 'default.html'
  });

  Page.addPage(newPage)
    .then(() => res.json({success: true, msg: 'Pagina succesvol aangemaakt!'}))
    .catch(err => res.json({success: false, msg:'Excuses, er is iets fout gegaan tijdens het aanmaken van de pagina.', error: err.message}))
});

// Page by id
router.get('/id/:id', async (req, res, next) => {
  Page.getById(req.params.id)
    .then(page => page ? res.json({page: page}) : next())
    .catch(err => next())
});

// Page by title
router.get('/title/:title', async (req, res, next) => {
  Page.getByTitle(req.params.title)
    .then(page => page ? res.json({page: page}) : next())
    .catch(err => next(err))
});

module.exports = router;
