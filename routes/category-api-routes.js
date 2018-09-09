const db = require('../models');

module.exports = function (app) {
  // Find all Categorys and return them to the user with res.json
  app.get('/api/category', (req, res) => {
    db.Category.findAll({}).then((dbCategory) => {
      res.json(dbCategory);
    });
  });
};
