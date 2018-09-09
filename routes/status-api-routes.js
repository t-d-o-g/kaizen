var db = require("../models");

module.exports = function(app) {
  // Find all Authors and return them to the user with res.json
  app.get("/api/status", function(req, res) {
    db.Status.findAll({}).then(function(dbStatus) {
      res.json(dbStatus);
    });
  });
}