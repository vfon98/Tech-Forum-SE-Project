const moment = require('moment');

const getDateBefore = dayNumber => moment().subtract(dayNumber, 'days');
const getDayMonthBefore = dayNumber => moment().subtract(dayNumber, 'days').format('D/M');

module.exports = {
  getDateBefore,
  getDayMonthBefore
}
