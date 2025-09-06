import { APICore } from '../../helpers/api/apiCore';

const api = new APICore();

const teamsApi = {
    getAllTeamMembers: (params) => {
        const baseUrl = '/api/teamMember/getAllTeamMembers';
        return api.get(`${baseUrl}`, params);
    },

    getTeamMemberById: (id) => {
        const baseUrl = `/api/teamMember/getTeamMemberById/${id}`;
        return api.get(`${baseUrl}`);
    },

    addTeamMember: (data) => {
        const baseUrl = '/api/teamMember/add';
        return api.createWithFile(`${baseUrl}`, data);
    },

    editTeamMember: (data) => {
        const baseUrl = '/api/teamMember/edit';
        return api.updatePutWithFile(`${baseUrl}`, data);
    },

    deleteTeamMember: (data) => {
        const baseUrl = '/api/teamMember/delete';
        return api.delete(`${baseUrl}`, data);
    },
};

export { teamsApi };
