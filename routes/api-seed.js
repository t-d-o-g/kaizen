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
        // console.log('c4');
      }
    });
    // console.log('c5');
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

    // const lat = 40 + (Math.random() * (10**8) / (10**8) + (42 - 40));
    const lat = randomNum(40, 41, 8).toFixed(8);
    const lng = randomNum(74, 75, 13).toFixed(13);

    // let lat = 40.73072195;
    // let lng = -74.0659347096384;
    // const lat = faker.random.number({ option: { min: 40, max: 42, precision: 8 } });
    // const lng = faker.random.number({ option: { min: 70, max: 74, precision: 13 } });
    console.log('lat', lat, 'lng', lng);

    const location = await db.TicketLocation.create({
      

      location: db.sequelize.fn('ST_GeomFromText', `POINT(
        ${lat} ${lng})`),
        // ${faker.address.latitude()} ${faker.address.longitude()})`),
    });
    const xref = {
      UserId: user.id,
      StatusId: status.id,
      CategoryId: category.id,
      TicketId: ticket.id,
      TicketLocationId: location.id,
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
