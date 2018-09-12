// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
const db = require('../models');

// Routes
// =============================================================
module.exports = function (app) {
  // GET route for getting all of the tickets
  app.get('/api/ticketxrefs', (req, res) => {
    console.log('ok');
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    } else if (req.query.ticket_id) {
      query.TicketId = req.query.ticket_id;
    }
    console.log(query);
    db.TicketXref.findAll({
      where: query,
      //   include: [db.Ticket],
      //   include: [db.Category],
      //   include: [db.TicketLocation],
      //   include: [db.User],
      include: [
        { model: db.Status },
        { model: db.User },
        { model: db.TicketLocation },
        { model: db.Ticket },
        { model: db.Category },
      ],

    }).then((dbTickets) => {
    //   console.log(dbTickets);
      // console.log(dbTickets[0].location);
      res.json(dbTickets);
    });
  });

  // Get route for retrieving a single ticket
  app.get('/api/ticketxrefs/:id', (req, res) => {
    db.TicketXref.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: db.Status },
        { model: db.User },
        { model: db.TicketLocation },
        { model: db.Ticket },
        { model: db.Category },
      ],
    }).then((dbTicket) => {
      console.log(dbTicket);
      res.json(dbTicket);
    });
  });

  // POST route for saving a new ticket
  app.post('/api/ticketxrefs', (req, res) => {
    console.log(req.body);
    db.TicketXref.create(
      req.body,
    ).then((dbTickets) => {
      res.json(dbTickets);
    });
  });

  // DELETE route for deleting ticketxrefs
  app.delete('/api/ticketxrefs/:id', (req, res) => {
    db.TicketXref.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbTickets) => {
      res.json(dbTickets);
    });
  });

  // PUT route for updating ticketxrefs
  app.put('/api/ticketxrefs', (req, res) => {
    db.TicketXref.update(
      req.body,
      {
        where: {
          id: req.body.id,
        },
      },
    ).then((dbTickets) => {
      res.json(dbTickets);
    });
  });
};
