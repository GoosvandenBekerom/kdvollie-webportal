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
        username: req.body.username,
        password: req.body.password
    });

    try {
        const user = await User.addUser(newUser);
        res.json({success: true, msg: 'User registered!'});
    } catch (err) {
        res.json({success: false, msg:'Failed to register user'});
    }
});

// Authenticate
router.post('/authenticate', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.getUserByUsername(username);

    if (!user) {
        return res.json({success: false, msg: 'User not found'});
    }

    const isMatch = await User.comparePassword(password, user.password);

    if (!isMatch) {
        return res.json({success: false, msg: 'Incorrect Password'});
    }

    const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 604800 });

    res.json({
        success: true,
        token: 'JWT ' + token,
        user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        }
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({user: req.user});
});

module.exports = router;
