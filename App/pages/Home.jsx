import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import { IP } from '../api/IP';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [userRole, setUserRole] = useState('');

  const getPetsAxios = async () => {
    try {
      const response = await axios.get(`${IP}/v1/petsactivos`);
      setData(response.data.data);
    } catch (error) {
      console.log('Error en el servidor: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPetsAxios();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('usuario');
        if (jsonValue !== null) {
          const userData = JSON.parse(jsonValue);
          setUserRole(userData.rol_user)
        } else {
          console.log('No se encontraron datos de usuario en AsyncStorage');
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    };
    fetchUserData();
  }, []);

  const handlePressAdoptar = (id) => {
    navigation.navigate('Pet', { petId: id });
  };

  const renderRegisterPetsButton = () => {
    if (userRole === "admin") {
      return (
        <TouchableOpacity style={styles.registerPetsButton} onPress={() => navigation.navigate('FormMascota')}>
          <Text style={styles.registerPetsButtonText}>Registrar Mascotas</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <>
          {renderRegisterPetsButton()}
          <FlatList
            data={data}
            keyExtractor={item => item.pk_id_mas.toString()}
            renderItem={({ item }) => (
              <View style={styles.petCard}>
                <View style={styles.petViewImage}>
                  <Image
                    source={{ uri: `${IP}/pets/${item.imagen_pet}` }}
                    style={styles.petImage}
                  />
                </View>
                <View style={styles.petInfo}>
                  <View style={styles.petDetailsLeft}>
                    <Text style={styles.petName}>{item.nombre_mas}</Text>
                    <Text style={styles.petLocation}>{item.lugar_rescate_mas}</Text>
                  </View>
                  <View style={styles.petDetailsRight}>
                    <Text style={styles.petCategory}>{item.nombre_cate}</Text>
                    <Text style={styles.petBreed}>{item.nombre_raza}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.adoptButton} onPress={() => handlePressAdoptar(item.pk_id_mas)}>
                  <Text style={styles.adoptButtonText}>Visualizar</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  petCard: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    borderColor: "#000",
    borderWidth: 0.4
  },
  petViewImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  petImage: {
    width: '95%',
    height: 200,
    borderRadius: 10,
    marginTop: 12,
    borderColor: "#000",
    borderWidth: 0.4
  },
  petInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal:20
  },
  petDetailsLeft: {
    flex: 1,
    paddingRight: 10,
  },
  petDetailsRight: {
    flex: 1,
    alignItems: 'flex-end',
    paddingLeft: 10,
  },
  petName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  petLocation: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },
  petCategory: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  petBreed: {
    fontSize: 15,
    marginTop: 4,
  },
  adoptButton: {
    backgroundColor: '#E89551',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  adoptButtonText: {
    color: '#001528',
    fontSize: 22,
    fontWeight: 'bold',
  },
  registerPetsButton: {
    backgroundColor: '#001528',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  registerPetsButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Home;
