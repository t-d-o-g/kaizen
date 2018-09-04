const ticketLocation = require('../models/ticket_location');

describe('ticketLocation model tests', () => {
  it('ticketLocation is a function', () => {
    expect(typeof ticketLocation).toBe('function');
  });
});
