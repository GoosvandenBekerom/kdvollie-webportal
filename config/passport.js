"use strict"
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.getById(jwt_payload._id);
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    }));
}
