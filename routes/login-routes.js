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
        done(null, user.username);
    });
    
    passport.deserializeUser(function(username, done) {
        db.User.findAll({ where: {username: username }})
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
        {usernameField:"username", passwordField:"password"},
        function(username, password, done) {
            db.User.findOne({ 
                where: {
                    username: username
                } 
            })
            .then( user => {
                // can't find username case
                if(user == null){
                    return done(null, false);
                }
                // password doesn't match
                else if(user.password !== password){
                    return done(null, false);
                }
                // finds the username and password matches
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
            console.log(req.user)
            console.log(req.isAuthenticated());
            if(req.isAuthenticated()){
                const u = req.user
                res.json({
                    firstName: u.first_name,
                    lastName: u.last_name,
                    email: u.email,
                    username: u.username,
                    password: u.password,
                    uuid: u.uuid
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
        const u = req.body;
        db.User.create({
            first_name: u.firstName,
            last_name: u.lastName,
            email: u.email,
            username: u.username,
            password: u.password,
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