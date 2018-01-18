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
      console.log(resultArr);
      const currentInterval = intervals[j];
      if (currentInterval.from < interval.to) {
        if (tmpFrom < currentInterval.from) {
          resultArr.push({
            from: tmpFrom,
            to: currentInterval.from,
          });
        }
        if (tmpFrom.getTime() === currentInterval.from.getTime()) {
          if (interval.to < currentInterval.to) {
            resultArr.push({
              from: tmpFrom,
              to: interval.to,
            });
            tmpFrom = interval.to;
            break;
          }
          if (interval.to > currentInterval.to) {
            tmpFrom = currentInterval.to;
            continue;
          }
        }
        tmpFrom = currentInterval.to;
        if (tmpFrom < interval.to) {
          resultArr.push({
            from: tmpFrom,
            to: interval.to,
          });
        }
        break;
      }
      if (interval.to < currentInterval.to) {
        resultArr.push(interval);
      }
      break;
    }
  }
  return sortBy(prop('from'), resultArr);
};

const newIntervals = [{
  from: new Date('2015-08-03T13:00:00.000Z'),
  to: new Date('2015-08-03T14:30:00.000Z'),
}];

const oldIntervals = [{
  from: new Date('2015-08-03T13:00:00.000Z'),
  to: new Date('2015-08-03T13:30:00.000Z'),
}, {
  from: new Date('2015-08-03T14:00:00.000Z'),
  to: new Date('2015-08-03T14:30:00.000Z'),
}];

diff(newIntervals, oldIntervals);

module.exports = { diff };
