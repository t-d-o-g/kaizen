const user = require('../models/user');

describe('user model tests', () => {
  it('user is a function', () => {
    expect(typeof user).toBe('function');
  });
});
