const db = require('../models');

module.exports = function (app) {
  // Find all Users and return them to the user with res.json
  app.get('/api/users', (req, res) => {
    db.User.findAll({}).then((dbUser) => {
      res.json(dbUser);
    });
  });

  app.get('/api/users/:id', (req, res) => {
    // Find one User with the id in req.params.id and return them to the user with res.json
    db.User.findOne({
      where: {
        uuid: req.params.id,
      },
    }).then((dbUser) => {
      res.json(dbUser);
    });
  });

  app.post('/api/users', (req, res) => {
    // Create an User with the data available to us in req.body
    console.log(req.body);
    db.User.create(req.body).then((dbUser) => {
      res.json(dbUser);
    });
  });

  app.delete('/api/users/:id', (req, res) => {
    // Delete the User with the id available to us in req.params.id
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbUser) => {
      res.json(dbUser);
    });
  });
};
