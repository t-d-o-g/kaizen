module.exports = (app) => {
  app.get('/registration', (req, res) => {
    res.render('registration', { title: 'Registration', js: ['registration.js'] });
  });
};
