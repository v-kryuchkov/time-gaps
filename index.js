const {
  sortBy,
  prop,
  concat,
  pipe,
  map,
  evolve,
  omit,
  invoker,
  last,
} = require('ramda');
const { DateTime } = require('luxon');

const merge = (newIntervals, oldIntervals) => {
  const intervals = pipe(
    concat(newIntervals),
    map(pipe(
      omit(['id']),
      evolve({
        from: (d) => DateTime.fromISO(d).toUTC(),
        to: (d) => DateTime.fromISO(d).toUTC(),
      }),
    )),
    sortBy(prop('from')),
  )(oldIntervals);

  const resultArr = [];

  for (let i = 0; i < intervals.length; i += 1) {
    const interval = intervals[i];
    let tmpFrom = interval.from;

    if (interval === last(intervals)) {
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

          if (currentInterval === last(intervals)) {
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
      from: invoker(0, 'toISO'),
      to: invoker(0, 'toISO'),
    })),
  )(resultArr);
};

module.exports = { merge };
