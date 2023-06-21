const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');


const User = mongoose.model('users');

passport.serializeUser((user, done)=>{
    done(null,user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) =>{

        User.findOne({googleId:profile.id}).then(
            (existingUser)=>{
                if(existingUser){
                    console.log("Existing");
                    done(null, existingUser);
                }else{
                    new User({googleId:profile.id})
                    .save()
                    .then(newUser => done(null, newUser));
                }
            }
        );
        
        //console.log('TEST Access Token ####',accessToken);
        //console.log('TEST Refresh Token ####',refreshToken);
        //console.log('TEST Profile Token ####',profile);
    }
));