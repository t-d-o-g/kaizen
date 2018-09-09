var db = require("../models");

module.exports = function(app) {
  // Find all Categorys and return them to the user with res.json
  app.get("/api/category", function(req, res) {
    db.Category.findAll({}).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });
}