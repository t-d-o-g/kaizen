// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the tickets
  app.get("/api/tickets", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Tickets.findAll({
      where: query
    }).then(function(dbTickets) {
      console.log(dbTickets);
      console.log(dbTickets[0].location);
      res.json(dbTickets);
    });
  });

  // Get route for retrieving a single ticket
  app.get("/api/tickets/:id", function(req, res) {
    db.Tickets.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbTickets) {
      console.log(dbTickets);
      res.json(dbTickets);
    });
  });

  // POST route for saving a new ticket
  app.post("/api/tickets", function(req, res) {
    console.log(req.body);
    db.Tickets.create({

      // category:req.body.category,
      // title:req.body.title,
      // description:req.body.description,
      location:req.body.location,
      // status:req.body.status,
      UserId:1

    }).then(function(dbTickets) {
      res.json(dbTickets);
    });
  });

  // DELETE route for deleting tickets
  app.delete("/api/tickets/:id", function(req, res) {
    db.Tickets.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTickets) {
      res.json(dbTickets);
    });
  });

  // PUT route for updating tickets
  app.put("/api/tickets", function(req, res) {
    db.Tickets.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbTickets) {
      res.json(dbTickets);
    });
  });
};