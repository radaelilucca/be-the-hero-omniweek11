import axios from 'axios';

const api = axios.create({
  baseURL: 'http://159.89.234.207:3333',
});

export default api;
