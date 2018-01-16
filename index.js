const { unnest } = require('ramda');

const overlaps = ([startNewInt, endNewInt], [startInt, endInt]) =>
  startNewInt < endInt && startInt < endNewInt;

const diff = ([startNewInt, endNewInt], intervals) => {
  if (intervals.length) {
    return unnest(intervals
      .filter(interval => overlaps([startNewInt, endNewInt], interval))
      .map((interval, index, array) => {
        const [startInt, endInt] = interval;

        if (!overlaps([startNewInt, endNewInt], [startInt, endInt])) {
          return [];
        }
        if (startInt <= startNewInt) {
          if (endNewInt > endInt) {
            if (index !== array.length - 1 && array[index + 1][0] < endNewInt) {
              return [[endInt, array[index + 1][0]]];
            }
            return [[endInt, endNewInt]];
          }

          return [];
        }

        if (endInt < endNewInt) {
          if (index === array.length - 1) {
            return [[startNewInt, startInt], [endInt, endNewInt]];
          }
          return [[startNewInt, startInt]];
        }

        if (index === 0) {
          return [[startNewInt, startInt]];
        }

        return [];
      }));
  }

  return [[startNewInt, endNewInt]];
};

module.exports = { diff };

