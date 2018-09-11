const faker = require('faker');
const db = require('../models');

module.exports = (app) => {
  app.post('/api/user-registration', (req, resp) => {
    // Regex to get the first name and last name
    // Any input string, delimited by space, which
    // has more than 1 word, the last word will be
    // assigned to last name
    /* const re = /(([a-zA-Z\s]+)\s([a-zA-Z]+))|([a-zA-Z]+)/;
    const arr = req.body.name.match(re);
    // VIK_TODO: Assert that index 2 or 4 is defined
    // VIK_TODO: Also make sure array length is 5
    let firstName = arr[2] ? arr[2] : arr[4];
    firstName = firstName.trim();
    req.body.first_name = firstName;
    req.body.last_name = arr[3] ? arr[3] : '';
    console.assert(arr.size() === 0, 'Expecting size of array to be 5'); */
    // Commented by Palak, as this is giving errors, need to sort out on Thursday
    db.User.create(req.body).then((data) => {
      resp.json(data);
    });
  });

  app.post('/api/login', (req, resp) => {
    console.log('Comes in login route');
    db.User.findOne({
      attributes: ['id', 'uuid'],
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    }).then((data) => {
      resp.json(data || 'failed');
    });
  });
};
