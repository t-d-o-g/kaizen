const path = require('path');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/mapindex.html'));
  });
  app.get("/registration", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/registration.html"));
  });
};
