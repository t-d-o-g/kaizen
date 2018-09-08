const faker = require('faker');
const db = require('../models');

module.exports = (app) => {
  async function seedCategory() {
    await db.Category.count().then(async (c) => {
      // If we got a positive count then assume that
      // the table is seeded
      if (c == 0) {
        db.Category.create({ category: 'None' });
        db.Category.create({ category: 'Parking' });
        db.Category.create({ category: 'Noise' });
        await db.Category.create({ category: 'Traffic' });
      }
    });
  }

  async function seedStatus() {
    await db.Status.count().then(async (c) => {
      // If we got a positive count then assume that
      // the table is seeded
      if (c == 0) {
        db.Status.create({ status: 'None' });
        db.Status.create({ status: 'Open' });
        await db.Status.create({ status: 'Close' });
      }
    });
  }

  async function seedUser() {
    const results = [];
    let i = 0;
    for (i = 0; i < 5; ++i) {
      const user = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
      results.push(db.User.create(user));
    }
    await Promise.all(results);
    return i;
  }

  function randomNum(min, max, prec) {
    return ( min + (Math.random() * (10**prec) / (10**prec) + (max - min - 1)) );
  }

  async function seedTicket() {
    const user = db.User.findOne({
      attributes: ['id'],
      order: db.sequelize.random(),
    });
    const status = db.Status.findOne({
      attributes: ['id'],
      order: db.sequelize.random(),
    });
    const category = db.Category.findOne({
      attributes: ['id'],
      order: db.sequelize.random(),
    });
    const ticket = db.Ticket.create({ ticket: faker.lorem.sentence() });

    const lat = randomNum(40, 41, 8).toFixed(8);
    const lng = randomNum(-75, -74, 13).toFixed(13);

    // let lat = 40.73072195;
    // let lng = -74.0659347096384;
    console.log('longitute', lng);

    const location = db.TicketLocation.create({
      location: db.sequelize.fn('ST_GeomFromText', `POINT(${lat} ${lng})`),
    });

    const promises = await Promise.all([user, status, category, ticket, location]);
    const xref = {
      UserId: promises[0].id,
      StatusId: promises[1].id,
      CategoryId: promises[2].id,
      TicketId: promises[3].id,
      TicketLocationId: promises[4].id,
    };

  db.TicketXref.create(xref);
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
