// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

var LocalStrategy = require("passport-local").Strategy;

// Routes
// =============================================================
module.exports = function(app, passport) {
    // Define our storage for user data in passport
    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });
    
    passport.deserializeUser(function(email, done) {
        db.User.findAll({ where: {email: email }})
        .then(function (user) {
            done(null, user);
        })
        .catch(error => {
            console.log(error);
            done(error, false);
        })
        ;
    });
    passport.use(new LocalStrategy(
        {usernameField:"email", passwordField:"password"},
        function(email, password, done) {
            db.User.findOne({ 
                where: {
                    email: email
                } 
            })
            .then( user => {
                // can't find email case
                if(user == null){
                    return done(null, false);
                }
                // password doesn't match
                else if(user.password !== password){
                    return done(null, false);
                }
                // finds the email and password matches
                else{
                    return done(null, user);
                }
            })
            .catch( err => {
                if (err) { return done(err); }
            });
        }
    ));

    // log in route
    app.post('/api/login', 
        passport.authenticate('local', { /* failureRedirect: '/login' */ }),
        function(req, res) {
            // ?? email
            console.log("test");
            console.log(req.user)
            console.log(req.isAuthenticated());
            if(req.isAuthenticated()){
                res.json({
                    email: req.user.email
                });
            }
            else{
                res.json({
                    error: "error at login"
                })
            }
        }
    );

    app.get("/api/email", (req, res) => {
        console.log(req.user);
        if(req.isAuthenticated()){
            res.json({
                email: req.user[0].dataValues.email
            });
        }
        else{
            res.json({
                error: "you are not logged in"
            }); 
        }
    });

    app.get('/api/users', (req, res) => {
    db.User.findAll({}).then((dbUsers) => {
      res.json(dbUsers);
    })
    .catch( err => {
        res.json({
            error: "Error getting users"
        })
        console.log(err)
    })
  });

    app.post("/api/user", (req, res) => {
        console.log(req.body);
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
        .then( results => {
            res.json(results);
        })
        .catch( error => {
            res.json({
                error: "wtf man you messed this example up... no donuts for you!"
            });
        });
        ;
        
    });
};