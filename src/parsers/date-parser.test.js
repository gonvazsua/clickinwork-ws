const dateParser = require('./date-parser');

test('Convert to ISO date', () => {
    const date = new Date();
    date.setHours(0,0,0,0);
    const expectedDate = new Date('2019-06-01T00:00:00.000Z');
    const isoDate = dateParser.toISOdate(date);
    expect(isoDate.toISOString()).toBe(expectedDate.toISOString());
});