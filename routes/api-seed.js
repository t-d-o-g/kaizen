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
    var lat1 = 40.730816;
    var lon1 = -74.054130;
    var point1 ='POINT('+lon1 + ' ' + lat1 + ')';

    var lat2 = 40.727955;
    var lon2 = -74.071468;
    var point2 ='POINT('+lon2 + ' ' + lat2 + ')';

    var lat3 = 40.738386;
    var lon3 = -74.065782;
    var point3 ='POINT('+lon3 + ' ' + lat3 + ')';

    db.Tickets.create({

      category:"Traffic",
      title:"no green/red light",
      description:"no red/green light cross the road with so many pedastrians ",
      location:db.sequelize.fn("ST_GeomFromText", point1),
      status:"Open",
      UserId:"1"

    });
    db.Tickets.create({

      category:"Noise",
      title:"Noise is too loud",
      description:"too much choice in this community, need control especially in evenning ",
      location:db.sequelize.fn("ST_GeomFromText", point2),
      status:"Open",
      UserId:"2"

    });   
    db.Tickets.create({

      category:"Parking",
      title:"Parking is too expensive",
      description:"Parking is this train station is ridiculy expensive! ",
      location:db.sequelize.fn("ST_GeomFromText", point3),
      status:"Close",
      UserId:"3"

    });
    resp.json('3 Seeded ticket');
  });
};
