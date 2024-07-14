import axiosClient from "./axios";


export const getDepartamentos = () => axiosClient.get('/v1/departamentos')
export const getMunicipiosForDepar = (id) => axiosClient.get(`/v1/muni_depar/${id}`)