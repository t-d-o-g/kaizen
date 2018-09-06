const ticketController = require('../controllers/ticket-controller');

module.exports = (app) => {
  app.get('/api/tickets', (req, res) => {
    res.send('NOT IMPLEMENTED: Site Homepage');
  });
};
