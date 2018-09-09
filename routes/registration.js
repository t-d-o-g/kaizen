module.exports = (app) => {
  app.get('/registration', (req, res) => {
    res.render('registration', { title: 'registration', js: ['registration.js'] });
  });
};
