const ticketController = require('../controllers/ticket-controller');

module.exports = (app) => {
  app.get('/ticket', (req, res) => {
    res.render('ticket', { title: 'ticket' });
  });

  app.get('/update-ticket', (req, res) => {
    res.render('update-ticket', { title: 'Update Ticket', js: ['ticket.js'] });
  });

  app.post('/api/ticket', (req, res) => {
    res.send('NOT IMPLEMENTED: Site Homepage');
  });

  app.get('/api/tickets', (req, res) => {
    res.send('NOT IMPLEMENTED: Site Homepage');
  });
};
