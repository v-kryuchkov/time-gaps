const { sortBy, prop } = require('ramda');

const diff = (newIntervals, oldIntervals) => {
  const intervals = sortBy(prop('from'), newIntervals.concat(oldIntervals));
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
            from: tmpFrom,
            to: currentInterval.from,
          });
        }
        if (currentInterval.to < interval.to) {
          tmpFrom = currentInterval.to;
          if (currentInterval === intervals[intervals.length - 1]) {
            resultArr.push({
              from: tmpFrom,
              to: interval.to,
            });
          }
        } else { break; }
      } else {
        resultArr.push({
          from: tmpFrom,
          to: interval.to,
        });
        break;
      }
    }
  }
  return sortBy(prop('from'), resultArr);
};

module.exports = { diff };
