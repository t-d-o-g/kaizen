module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Kaizen!', js: ['map.js'] });
  });

  app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', js: ['login.js'] });
  });
};
