# time-gaps
A simple module for working with time intervals
## Installation
```bash
$ npm install time-gaps
```
## Usage
```javascript
const timeGaps = require('time-gaps');
```
## Example
```javascript
const timeGaps = require('time-gaps');

// previously available intervals
const oldIntervals = [{
  from: '2015-08-03T13:00:00.000Z',
  to: '2015-08-03T13:30:00.000Z',
}, {
  from: '2015-08-03T14:00:00.000Z',
  to: '2015-08-03T14:30:00.000Z',
}];

const newIntervals = [{
  from: '2015-08-03T12:45:00.000Z',
  to: '2015-08-03T13:15:00.000Z',
}];

const mergedIntervals = timeGaps.megre(newIntervals, oldIntervals);
/*
[
  {
    from: '2015-08-03T12:45:00.000Z',
    to: '2015-08-03T13:00:00.000Z',
  },
  {
    from: '2015-08-03T13:00:00.000Z',
    to: '2015-08-03T13:30:00.000Z',
  },
  {
    from: '2015-08-03T14:00:00.000Z',
    to: '2015-08-03T14:30:00.000Z',
  },
] */
```
