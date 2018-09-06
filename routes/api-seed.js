const faker = require('faker');
const db = require('../models');

module.exports = (app) => {
  function seedCategory() {
    db.Category.count().then((c) => {
      // If we got a positive count then assume that
      // the table is seeded
      if (c == 0) {
        db.Category.create({ category: 'None' });
        db.Category.create({ category: 'Parking' });
        db.Category.create({ category: 'Noise' });
        db.Category.create({ category: 'Traffic' });
      }
    });
  }

  function seedStatus() {
    db.Status.count().then((c) => {
      // If we got a positive count then assume that
      // the table is seeded
      if (c == 0) {
        db.Status.create({ status: 'None' });
        db.Status.create({ status: 'Open' });
        db.Status.create({ status: 'Close' });
      }
    });
  }

  function seedUser() {
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
    return i;
  }

  async function seedTicket() {
    const user = await db.User.findOne({
      attributes: ['id'],
      order: db.sequelize.random(),
    });
    const status = await db.Status.findOne({
      attributes: ['id'],
      order: db.sequelize.random(),
    });
    const category = await db.Category.findOne({
      attributes: ['id'],
      order: db.sequelize.random(),
    });
    const ticket = await db.Ticket.create({ ticket: faker.lorem.sentence() });

    // let lat = 40.73072195;
    // let lng = -74.0659347096384;
    const location = await db.TicketLocation.create({

      location: db.sequelize.fn('ST_GeomFromText', `POINT(${faker.address.latitude()} ${faker.address.longitude()})`),
    });
    const xref = {
      UserId: user.id,
      StatusId: status.id,
      CategoryId: category.id,
      TicketId: ticket.id,
      TicketLocationId: location.id,
    };

    db.TicketXref.create(xref);
    // console.log('user', user.id);
    // console.log('status', status.id);
    // console.log('category', category.id);
    // console.log('ticket', ticket.id);
    // console.log('location', location.id);
  }

  function seedTheTickets() {
    const count = 5;
    for (let i = 0; i < count; ++i) {
      seedTicket();
    }
    return count;
  }

  app.get('/api/seed-user', (req, resp) => {
    const i = seedUser();
    resp.json(`${i} seed records for users were added`);
    // console.log('faker card', faker.helpers.createCard());
  });

  app.get('/api/seed-category', (req, resp) => {
    seedCategory();
    resp.json('seed records for Category were added');
  // console.log('faker card', faker.helpers.createCard());
  });

  app.get('/api/seed-status', (req, resp) => {
    seedStatus();
    resp.json('seed records for Status were added');
    // console.log('faker card', faker.helpers.createCard());
  });

  app.get('/api/seed-ticket', (req, resp) => {
    const c = seedTheTickets();
    resp.json(`${c} tickets were seeded`);
  });

  app.get('/api/seed-database', (req, resp) => {
    async function seedDatabase() {
      await seedUser();
      await seedCategory();
      await seedStatus();
      seedTheTickets();
    }

    seedDatabase();
    resp.json('Database was seeded. Click again to seed more records.');
  });
};
