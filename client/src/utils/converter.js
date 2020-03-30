import moment from 'moment';

const timeFrom = time => moment(time).fromNow();
const parseDateFrom = time => moment(time).format('MMMM D, YYYY');
const parseShortDateFrom = time => moment(time).format('DD/MM/YYYY');
const parseStringFrom = number => parseInt(number).toLocaleString('en-EN');

export { timeFrom, parseDateFrom, parseShortDateFrom, parseStringFrom };
