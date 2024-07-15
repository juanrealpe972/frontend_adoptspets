import React, { createContext, useContext, useState } from 'react';
import { createUserApi, getDepartamentos, getMunicipiosForDepar, getPetsEsperaApi, getUserApi, updateUserApi } from '../api/auth.api';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
  const [municipios, setMunicipios] = useState([]);
  const [loginUser, setLoginUser] = useState(false);
  const [userDate, setUserData] = useState([]);
  const [petsEnEspera, setPetsEnEspera] = useState([])

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const getUser = async (id) => {
    try {
      const response = await getUserApi(id)
      setUserData(response.data)
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  const getDeparts = async () => {
    try {
      const response = await getDepartamentos()
      setDepartamentos(response.data.data)
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  const getMascotasEnEspera = async () => {
    try {
      const response = await getPetsEsperaApi()
      setPetsEnEspera(response.data.data)
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  const createUser = async (data) => {
    try {
      const response = await createUserApi(data)
      Alert.alert("Éxito", response.data.message);
      navigation.navigate('FirstPage');
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  const updateUser = async (id, data) => {
    try {
      const response = await updateUserApi(id, data)
      Alert.alert("Éxito", response.data.message);
      navigation.navigate('Visitante');
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  const getMunis = async (id) => {
    try {
      const response = await getMunicipiosForDepar(id)
      setMunicipios(response.data.data)
    } catch (error) {
      console.log('error en el controlador', error);
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        setIsAuthenticated,
        setLoginUser,
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
        loginUser, 
        departamentos,
        petsEnEspera,
        municipios,
        idUser,
        userDate,
      }}
      >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
