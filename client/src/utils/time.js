import moment from 'moment';

const timeFrom = time => moment(time).fromNow();
const parseDateFrom = time => moment(time).format('MMMM D, YYYY');

export { timeFrom, parseDateFrom };
