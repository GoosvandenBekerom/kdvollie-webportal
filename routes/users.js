"use strict"
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', async (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const user = await User.addUser(newUser);
        res.json({success: true, msg: 'U bent succesvol geregistreerd!'});
    } catch (err) {
        res.json({success: false, msg:'Excuses, er is iets fout gegaan tijdens het registreren.'});
    }
});

// Authenticate
router.post('/authenticate', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.getUserByEmail(email);

    if (!user) {
        return res.json({success: false, msg: 'Gebruiker niet gevonden.'});
    }

    const isMatch = await User.comparePassword(password, user.password);

    if (!isMatch) {
        return res.json({success: false, msg: 'Incorrect wachtwoord.'});
    }

    const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 604800 });

    res.json({
        success: true,
        token: 'JWT ' + token,
        user: {id: user._id, name: user.name, email: user.email}
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({user: req.user});
});

module.exports = router;
