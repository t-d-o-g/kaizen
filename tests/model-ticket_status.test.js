const ticketStatus = require('../models/ticket_status');

describe('ticketStatus model tests', () => {
  it('ticketStatus is a function', () => {
    expect(typeof ticketStatus).toBe('function');
  });
});
