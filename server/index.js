const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//import express from 'express';

const app = express();


passport.use(new GoogleStrategy());

app.get('/', (req, res) => {
    res.send({bye:'buddy'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);