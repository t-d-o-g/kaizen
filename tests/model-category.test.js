const category = require('../models/category');

describe('category model tests', () => {
  it('category is a function', () => {
    expect(typeof category).toBe('function');
  });
});
