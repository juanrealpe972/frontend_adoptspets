import React, { createContext, useContext, useState } from 'react';
import axios from "axios";
import { IP } from './ip';

const ip = IP

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [usuarios, setusuarios] = useState([])

  const getUser = async () => {
    try {
      await axios.get(`${ip}/v1/users/${userId}`)
        .then(response => {
          if (response.data.data) {
            setusuarios(response.data.data);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching coffee data:', error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }
  // }

  return (
    <UserContext.Provider value={{ userId, setUserId, getUser, usuarios
      
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext