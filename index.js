const { sortBy, prop } = require('ramda');
const moment = require('moment');

const merge = (newIntervals, oldIntervals) => {
  const notSortedArray = newIntervals.concat(oldIntervals)
    .map(({ id, ...interval }) =>
      Object.assign(interval, {
        from: moment.utc(interval.from),
        to: moment.utc(interval.to),
      }));
  const intervals = sortBy(prop('from'), notSortedArray);

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

  return sortBy(prop('from'), resultArr).map(interval =>
    Object.assign(interval, {
      from: interval.from.toISOString(),
      to: interval.to.toISOString(),
    }));
};

module.exports = { merge };
