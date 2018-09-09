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
};
