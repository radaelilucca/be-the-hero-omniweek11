import axios from 'axios';

const ongId = localStorage.getItem('id');

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    auth: ongId,
  },
});

export default api;
