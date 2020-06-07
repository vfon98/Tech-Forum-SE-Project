import axios from 'axios';

let serverURL = 'http://localhost:9000';

if (window.location.hostname !== 'localhost') {
  serverURL = 'https://covid-forum-rest-server.herokuapp.com';
}

const instance = axios.create({
  baseURL: serverURL,
  withCredentials: true,
});

export default instance;
export { serverURL };
