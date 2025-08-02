import axios from 'axios';
import store from '../store/store';
import { logout } from '../featuers/login-slice/loginSlice';

const apiService = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiService.interceptors.request.use((config) => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth && auth.access) {
      config.headers['Authorization'] = `Bearer ${auth.access}`;
    }
  } catch {}
  return config;
});

apiService.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.setItem('sessionExpired', '1');
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default apiService; 