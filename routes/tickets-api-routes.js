// Requiring our models
const db = require('../models');

// Routes
// =============================================================
module.exports = function (app) {
  // GET route for updating tickets
  app.get('/ticket', (req, res) => {
    res.render('ticket', { title: 'Improve It', js: ['ticket.js'] });
  });

  // GET route for creating tickets
  app.get('/update-ticket', (req, res) => {
    res.render('update-ticket', { title: 'Update Ticket', js: ['ticket.js'] });
  });

  // PUT route for updating tickets
  app.put('/api/tickets', (req, res) => {
    db.Ticket.update(
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

  // POST route for creating tickets
  app.post('/api/tickets', (req, res) => {
    db.Ticket.create(
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
