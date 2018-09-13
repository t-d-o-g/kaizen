module.exports = (app) => {
    app.get('/confirmation', (req, res) => {
      res.render('confirmation', { title: 'Confirmation', js: ['confirmation.js'] });
    });
  };