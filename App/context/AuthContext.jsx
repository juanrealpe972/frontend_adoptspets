import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { IP } from '../api/IP';
import axiosClient from '../api/axios';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Debes usar AuthProvider en el App')
  }
  return context;
}

export const AuthProvider = ({children}) => {
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [idUser, setIdUser] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [razas, setRazas] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [userDate, setUserData] = useState([]);
  const [petsEnEspera, setPetsEnEspera] = useState([]);
  const [petsInactivas, setPetsInactivas] = useState([]);
  const [idPet, setIdPet] = useState([]);

  const [misPets, setMisPets] = useState([])

  const [data, setData] = useState([]);
  const [dataEspera, setDataEspera] = useState([]);

  const [modalLogin, setModalLogin] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const getUser = async (id) => {
    try {
      const response = await axiosClient.get(`/v1/user/${id}`)
      setUserData(response.data)
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  const getDeparts = async () => {
    try {
      const response = await axios.get(`${IP}/v1/departamentos`)
      setDepartamentos(response.data.data)
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  const getCategorias = async () => {
    try {
      const response = await axios.get(`${IP}/v1/categorias`)
      setCategorias(response.data.data)
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  const getRazasForCategorias = async (id) => {
    try {
      const response = await axios.get(`${IP}/v1/razas_cate/${id}`)
      setRazas(response.data.data)
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  const getMisPets = async (id) => {
    try {
      const response = await axios.get(`${IP}/v1/mispets/${id}`)
      setMisPets(response.data.data)
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  const getMascotasEnEspera = async () => {
    try {
      const response = await axiosClient.get('/v1/petsespera')
      setPetsEnEspera(response.data.data)
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  const getMascotasInactivas = async () => {
    try {
      const response = await axiosClient.get('/v1/petsinactivos')
      setPetsInactivas(response.data.data)
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  const createUser = async (data) => {
    try {
      const response = await axiosClient.post(`/v1/users`, data)
      Alert.alert("Éxito", response.data.message);
      navigation.navigate('FirstPage');
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  const updateUser = async (id, data) => {
    try {
      const response = await axiosClient.put(`/v1/users/${id}`, data)
      Alert.alert("Éxito", response.data.message);
      navigation.navigate('Visitante');
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  const getPetsAxios = async () => {
    try {
      const response = await axios.get(`${IP}/v1/petsactivos`);
      setData(response.data.data);
    } catch (error) {
      console.log('Error en el servidor: ', error);
    }
  };

  const getPetsEspera = async () => {
    try {
        const response = await axios.get(`${IP}/v1/petsespera`);
        setDataEspera(response.data.data);
    } catch (error) {
        console.log('Error en el servidor: ', error);
    }
  };

  const getMunis = async (id) => {
    try {
      const response = await axiosClient.get(`/v1/muni_depar/${id}`)
      setMunicipios(response.data.data)
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        setIsAuthenticated,
        setIdUser,
        getDeparts,
        getMunis,
        getUser,
        getMascotasEnEspera,
        createUser,
        updateUser,
        login, 
        logout,
        isAuthenticated,
        departamentos,
        petsEnEspera,
        municipios,
        idUser,
        userDate,
        setMunicipios,
        getCategorias,
        categorias, 
        setCategorias,
        getRazasForCategorias,
        razas, 
        setRazas,
        data,
        getPetsAxios,
        getPetsEspera,
        dataEspera, 
        setDataEspera,
        idPet, 
        setIdPet,
        getMascotasInactivas,
        petsInactivas,
        getMisPets,
        misPets,
        modalLogin, 
        setModalLogin
      }}
      >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
