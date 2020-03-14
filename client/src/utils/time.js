import moment from 'moment';

const timeFrom = time => moment(time).fromNow();

export { timeFrom };
