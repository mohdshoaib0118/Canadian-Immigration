import { APICore } from '../../helpers/api/apiCore';

const api = new APICore();

const faqApi = {
    getAllFaqs: (params) => {
        const baseUrl = '/api/faq/getAllFaqs';
        return api.get(`${baseUrl}`, params);
    },

    getFaqById: (id) => {
        const baseUrl = `/api/faq/getFaqById/${id}`;
        return api.get(`${baseUrl}`);
    },

    addFaq: (data) => {
        const baseUrl = '/api/faq/add';
        return api.create(`${baseUrl}`, data);
    },

    editFaq: (data) => {
        const baseUrl = '/api/faq/edit';
        return api.update(`${baseUrl}`, data);
    },

    deleteFaq: (data) => {
        const baseUrl = '/api/faq/delete';
        return api.delete(`${baseUrl}`, data);
    },
};

export { faqApi };
