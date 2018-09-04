const faker = require('faker');
const db = require('../models');

module.exports = (app) => {
  app.get('/api/seed-user', (req, resp) => {
    let i = 0;
    for (i = 0; i < 5; ++i) {
      const user = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
      db.User.create(user);
    }
    resp.json(`${5} seed records for users were added`);
    // console.log('faker card', faker.helpers.createCard());
  });

  app.get('/api/seed-category', (req, resp) => {
    db.Category.create({ category: 'None' });
    db.Category.create({ category: 'Parking' });
    db.Category.create({ category: 'Noise' });
    db.Category.create({ category: 'Traffic' });
    resp.json(' seed records for Category were added');
  // console.log('faker card', faker.helpers.createCard());
  });

  app.get('/api/seed-status', (req, resp) => {
    db.Status.create({ status: 'None' });
    db.Status.create({ status: 'Open' });
    db.Status.create({ status: 'Close' });
    resp.json(' seed records for Status were added');
    // console.log('faker card', faker.helpers.createCard());
  });

  app.get('/api/seed-ticket', (req, resp) => {
    db.User.findAll({
      attributes: ['id'],
      order: db.sequelize.random(),
      limit: 1,
    }).then((data) => {
      console.log(data);
    });
    resp.json('Seeded ticket');
  });
};
