const {
  sortBy,
  prop,
  concat,
  pipe,
  map,
  evolve,
  omit,
  invoker,
} = require('ramda');
const moment = require('moment');

const merge = (newIntervals, oldIntervals) => {
  const intervals = pipe(
    concat(newIntervals),
    map(pipe(
      omit(['id']),
      evolve({
        from: moment.utc,
        to: moment.utc,
      }),
    )),
    sortBy(prop('from')),
  )(oldIntervals);

  const resultArr = [];

  for (let i = 0; i < intervals.length; i += 1) {
    const interval = intervals[i];
    let tmpFrom = interval.from;

    if (interval === intervals[intervals.length - 1]) {
      resultArr.push(interval);
      break;
    }
    for (let j = i + 1; j < intervals.length; j += 1) {
      const currentInterval = intervals[j];

      if (currentInterval.from < interval.to) {
        if (tmpFrom < currentInterval.from) {
          resultArr.push({
            ...interval,
            from: tmpFrom,
            to: currentInterval.from,
          });
        }

        if (currentInterval.to < interval.to) {
          tmpFrom = currentInterval.to;

          if (currentInterval === intervals[intervals.length - 1]) {
            resultArr.push({
              ...interval,
              from: tmpFrom,
              to: interval.to,
            });
          }
        } else { break; }
      } else {
        resultArr.push({
          ...interval,
          from: tmpFrom,
          to: interval.to,
        });
        break;
      }
    }
  }

  return pipe(
    sortBy(prop('from')),
    map(evolve({
      from: invoker(0, 'toISOString'),
      to: invoker(0, 'toISOString'),
    })),
  )(resultArr);
};

module.exports = { merge };
