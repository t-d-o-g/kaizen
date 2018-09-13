module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Kaizen!', js: ['map.js', 'index.js'] });
  });

  app.get('/login', (req, res) => {
    res.render('login-signup', { title: 'Login', js: ['login.js', 'registration.js'] });
  });
};
