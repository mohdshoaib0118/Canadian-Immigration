import { APICore } from '../../helpers/api/apiCore';

const api = new APICore();

const blogsApi = {
    getAllBlogs: () => {
        const baseUrl = '/api/blog/getAllBlogs';
        return api.get(`${baseUrl}`, {});
    },

    getBlogById: (id) => {
        const baseUrl = `/api/blog/getById/${id}`;
        return api.get(`${baseUrl}`, {});
    },

    addBlog: (data) => {
        const baseUrl = '/api/blog/add';
        return api.createWithFile(`${baseUrl}`, data);
    },

    editBlog: (data) => {
        const baseUrl = '/api/blog/edit';
        return api.update(`${baseUrl}`, data);
    },

    deleteBlog: (data) => {
        const baseUrl = '/api/blog/delete';
        return api.delete(`${baseUrl}`, data);
    },
};

export { blogsApi };
