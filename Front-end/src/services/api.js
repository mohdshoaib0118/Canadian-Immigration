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

export const faqAPI = {
  getFAQs: () => {
    return api.get('/faq/getAllFaqs');
  }
};

export const blogAPI = {
  getAllBlogs: () => {
    return api.get('/blog/getAllBlogs');
  }
};

export const newsAPI = {
  getAllLatestNews: () => {
    return api.get('/latestNews/getAllLatestNews');
  }
};

export const teamAPI = {
  getAllTeamMembers: () => {
    return api.get('/teamMember/getAllTeamMembers');
  }
};

export default api;
