import React, { createContext, useContext, useState } from 'react';
import { getDepartamentos, getMunicipiosForDepar } from '../api/auth.api';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Debes usar AuthProvider en el App')
  }
  return context;
}

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [idUser, setIdUser] = useState([])
  const [departamentos, setDepartamentos] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [loginUser, setLoginUser] = useState(false)

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const getDeparts = async () => {
    try {
      const response = await getDepartamentos()
      setDepartamentos(response.data.data)
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
        login, 
        logout,
        isAuthenticated,
        loginUser, 
        departamentos,
        municipios,
        idUser, 
      }}
      >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
