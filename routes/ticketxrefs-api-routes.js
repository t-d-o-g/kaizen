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
    }
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
  app.get('/api/tickets/:id', (req, res) => {
    db.Tickets.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbTickets) => {
      console.log(dbTickets);
      res.json(dbTickets);
    });
  });

  // POST route for saving a new ticket
  app.post('/api/tickets', (req, res) => {
    console.log(req.body);
    const point = { type: 'Point', coordinates: [39.807222, -76.984722] };
    db.Tickets.create({

      category: 'traffic',
      title: 'red light',
      description: 'no red/green light across the road',
      location: db.sequelize.fn('ST_GeomFromText', 'POINT(12 11)'),
      status: 'open',
      UserId: '1',

    }).then((dbTickets) => {
      res.json(dbTickets);
    });
  });

  // DELETE route for deleting tickets
  app.delete('/api/tickets/:id', (req, res) => {
    db.Tickets.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbTickets) => {
      res.json(dbTickets);
    });
  });

  // PUT route for updating tickets
  app.put('/api/tickets', (req, res) => {
    db.Tickets.update(
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
