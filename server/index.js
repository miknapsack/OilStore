const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
//import express from 'express';

const app = express();


passport.use(new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, 
        (accessToken, refreshToken, profile, done) =>{
            console.log('TEST Access Token ####',accessToken);
            console.log('TEST Refresh Token ####',refreshToken);
            console.log('TEST Profile Token ####',profile);
        }
    )
);


app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile','email']
    })
);


app.get(
    '/auth/google/callback', passport.authenticate('google')
);
/* app.get('/', (req, res) => {
    res.send({bye:'buddy'});
}); */

const PORT = process.env.PORT || 5000;
app.listen(PORT);