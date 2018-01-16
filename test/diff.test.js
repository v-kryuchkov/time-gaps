const { diff } = require('../index');
const { expect } = require('chai');
const moment = require('moment');

describe('Test diff', () => {
  describe('13:00-13:00 and 14:00-14:30', () => {
    const interval1 = [moment('2015-08-03T13:00:00.000Z'), moment('2015-08-03T13:30:00.000Z')];
    const interval2 = [moment('2015-08-03T14:00:00.000Z'), moment('2015-08-03T14:30:00.000Z')];

    it('12:45-15:00', async () => {
      const newInterval = [moment('2015-08-03T12:45:00.000Z'), moment('2015-08-03T15:00:00.000Z')];
      const result = await diff(newInterval, [interval1, interval2]);

      const waitResult = [
        [moment('2015-08-03T12:45:00.000Z'), moment('2015-08-03T13:00:00.000Z')],
        [moment('2015-08-03T12:45:00.000Z'), moment('2015-08-03T14:00:00.000Z')],
        [moment('2015-08-03T14:30:00.000Z'), moment('2015-08-03T15:00:00.000Z')],
      ];

      return expect(result)
        .to.deep.equal(waitResult);
    });

    it('13:15-13:45', async () => {
      const newInterval = [moment('2015-08-03T13:15:00.000Z'), moment('2015-08-03T13:45:00.000Z')];
      const result = await diff(newInterval, [interval1, interval2]);

      const waitResult = [
        [moment('2015-08-03T13:30:00.000Z'), moment('2015-08-03T13:45:00.000Z')],
      ];

      return expect(result)
        .to.deep.equal(waitResult);
    });

    it('13:45-14:15', async () => {
      const newInterval = [moment('2015-08-03T13:45:00.000Z'), moment('2015-08-03T14:15:00.000Z')];
      const result = await diff(newInterval, [interval1, interval2]);

      const waitResult = [
        [moment('2015-08-03T13:45:00.000Z'), moment('2015-08-03T14:00:00.000Z')],
      ];

      return expect(result)
        .to.deep.equal(waitResult);
    });

    it('13:15-14:15', async () => {
      const newInterval = [moment('2015-08-03T13:15:00.000Z'), moment('2015-08-03T14:15:00.000Z')];
      const result = await diff(newInterval, [interval1, interval2]);

      const waitResult = [
        [moment('2015-08-03T13:30:00.000Z'), moment('2015-08-03T14:00:00.000Z')],
      ];

      return expect(result)
        .to.deep.equal(waitResult);
    });
  });
});
