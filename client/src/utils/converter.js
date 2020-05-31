import moment from 'moment';

const timeFrom = time => moment(time).fromNow();
const parseDateFrom = time => moment(time).format('MMMM D, YYYY');
const parseShortDateFrom = time => moment(time || new Date()).format('DD/MM/YYYY');
const parseLongDateFrom = time => moment(time || new Date()).format('DD/MM/YYYY hh:mm a');
const getCurrentTime = () => moment().add(1, 'days').format('YYYY-MM-DDTHH:mm:ss');
const isValidTime = time => moment(new Date()).isAfter(time);
const parseStringFrom = number => parseInt(number).toLocaleString('en-EN');
const parseTagFrom = roomName => '#' + roomName.replace(/\s/g, '');
const parseTextFromHTML = htmlString => htmlString.replace(/<.*?>(-->)?/g, '');

export {
  timeFrom,
  parseDateFrom,
  parseShortDateFrom,
  parseLongDateFrom,
  getCurrentTime,
  isValidTime,
  parseStringFrom,
  parseTagFrom,
  parseTextFromHTML,
};
