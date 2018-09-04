const ticket = require('../models/ticket');

describe('ticket model tests', () => {
  it('ticket is a function', () => {
    expect(typeof ticket).toBe('function');
  });
});
