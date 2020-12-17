import axios from 'axios';
import { getToken } from './auth'

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: { 'Content-Type': 'application/json' },
});


api.interceptors.request.use(
  async config => {
    const token = getToken()
  if (token) {
    config.headers['x-access-token'] = token
  }
  return config
  },
  err => {
    return Promise.reject(err.response);
  }
);

export default api;
