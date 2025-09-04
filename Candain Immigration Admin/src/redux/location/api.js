import { APICore } from "../../helpers/api/apiCore";
import * as URL from "../../helpers/api/apiEndPoint";
const api = new APICore();

export function getStatesApi(params: any): any {
  const { limit, page, search } = params?.data;
  return api.get(`${URL.GET_ALL_STATES}?limit=${limit}&page=${page}&search=${encodeURIComponent(search)}`);
};
export function createLocationApi(params: any): any {
  const { data } = params;
  return api.create(`${URL.CREATE_LOCATION}`, data);
}
export function updateTicketApi(params: any): any {
  const { data } = params;
  return api.update(`${URL.UPDATE_TICKET}`, data);
}
export function getCitiesByIdApi(params: any): any {
  const { id } = params?.data;
  return api.get(`${URL.GET_CITIES_BY_ID}/${id}`);
}
export function updateCityApi(params: any): any {
  const { id, status, name } = params?.data;
  const payload = {
    status: status,
    name: name
  };
  return api.update(`${URL.UPDATE_CITY}/${id}`, payload);
}
