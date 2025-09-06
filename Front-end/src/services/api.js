import axios from 'axios';

const API_BASE_URL = 'http://localhost:3500/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contactAPI = {
  sendMail: (contactData) => {
    return api.post('/contactUs/sendMail', contactData);
  }
};

export default api;