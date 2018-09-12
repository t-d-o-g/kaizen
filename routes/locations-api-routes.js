// Requiring our models
const db = require('../models');

// Routes
// =============================================================
module.exports = function (app) {
  app.put('/api/locations', (req, res) => {
    db.TicketLocation.update(
      req.body,
      {
        where: {
          id: req.body.id,
        },
      },
    ).then((dbLocations) => {
      res.json(dbLocations);
    });
  });

  // Post to insert new locations in the database;
  app.post('/api/locations', (req, res) => {
    console.log(req.body);
    db.TicketLocation.create({
      location: db.sequelize.fn('ST_GeomFromText', `POINT(${req.body.newLat} ${req.body.newLng})`),
    }).then((dbLocations) => {
      res.json(dbLocations);
    });
  });
};
