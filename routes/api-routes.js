// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {


console.log("inapi------&&&&&&&&&&&&&&");

  // POST route for saving a new post
  app.post("/api/users", function(req, res) {
   

    db.User.create({  
      name: req.body.name,
      email: req.body.email,
      login_id: req.body.login_id,
      password: req.body.password
    
    })
    .then(newUser => {
      console.log(`New USER ${newUser.name} ${newUser.email}, with login ${newUser.login_id} has been created.`);
    });
  });

 
 
};
