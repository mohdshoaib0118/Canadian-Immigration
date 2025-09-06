import { APICore } from '../../helpers/api/apiCore';

const api = new APICore();

const getLatestNews = (data) => {
    const baseURL = '/api/latestNews/getAllLatestNews';
    return api.get(`${baseURL}`, data);
};

const addLatestNews = (data) => {
    const baseURL = '/api/latestNews/add';
    return api.createWithFile(`${baseURL}`, data);
};

const editLatestNews = (data) => {
    const baseURL = '/api/latestNews/edit';
    return api.updatePutWithFile(`${baseURL}`, data);
};

const deleteLatestNews = (data) => {
    const baseURL = '/api/latestNews/delete';
    return api.delete(`${baseURL}`, data);
};

export { getLatestNews, addLatestNews, editLatestNews, deleteLatestNews };
