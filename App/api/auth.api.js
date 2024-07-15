import axiosClient from "./axios";

export const createUserApi = (data) => axiosClient.post(`/v1/users`, data);
export const updateUserApi = (id, data) => axiosClient.put(`/v1/users/${id}`, data);
export const getUserApi = (id) => axiosClient.get(`/v1/user/${id}`)
export const getPetsEsperaApi = () => axiosClient.get('/v1/petsespera')
export const getDepartamentos = () => axiosClient.get('/v1/departamentos')
export const getMunicipiosForDepar = (id) => axiosClient.get(`/v1/muni_depar/${id}`)