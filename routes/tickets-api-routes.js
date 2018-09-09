// Requiring our models
const db = require('../models');

// Routes
// =============================================================
module.exports = function (app) {
  // PUT route for updating tickes
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

  app.post("/api/tickets", function(req, res) {
    db.Ticket.create(
      req.body
    ).then(function(dbTickets) {
      res.json(dbTickets);
    });
  });
  
};
