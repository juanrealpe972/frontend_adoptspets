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
import CustomModalPets from '../modal/CustomModalPets';

const ip = "http://192.168.1.4:3000";

function Home({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const URL = `${ip}/v1/petsactivos`;

  const getPetsAxios = async () => {
    try {
      const response = await axios.get(URL);
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

  const handlePetPress = pet => {
    setSelectedPet(pet);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handlePressAdoptar = () => {
    navigation.navigate('Adoptar', { pet: selectedPet });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.pk_id_mas.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePetPress(item)}>
              <View style={styles.petCard}>
                <Image
                  source={{ uri: `${ip}/pets/${item.imagen_pet}` }}
                  style={styles.petImage}
                />
                <Text style={styles.petName}>{item.nombre_mas}</Text>
                <Text style={styles.petLocation}>{item.lugar_rescate_mas}</Text>
                <Text style={styles.petCategory}>{item.nombre_cate}</Text>
                <Text style={styles.petBreed}>{item.nombre_raza}</Text>
                <TouchableOpacity style={styles.adoptButton} onPress={() => handlePetPress(item)}>
                  <Text style={styles.adoptButtonText}>Visualizar</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <CustomModalPets
        visible={showModal}
        onClose={handleModalClose}
        title="Detalles de la mascota">
        {selectedPet && (
          <View>
            <Image
              source={{ uri: `${ip}/pets/${selectedPet.imagen_pet}` }}
              style={styles.modalImage}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.modalText}>Nombre: {selectedPet.nombre_mas}</Text>
            </View>
            <View style={styles.smallInfoContainer}>
              <Text style={styles.smallInfoText}>Edad: {selectedPet.edad_mas} meses</Text>
              <Text style={styles.smallInfoText}>Tamaño: {selectedPet.tamano_mas} cm</Text>
              <Text style={styles.smallInfoText}>Peso: {selectedPet.peso_mas} kg</Text>
            </View>
            <Text style={styles.modalText}>Descripción: {selectedPet.descripcion_mas}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.modalText}>Vacunación: {selectedPet.vacunacion_mas}</Text>
              <Text style={styles.modalText}>Esterilización: {selectedPet.esterilizacion_castracion_mas}</Text>
            </View>
            <TouchableOpacity style={styles.adoptButton} onPress={handlePressAdoptar}>
              <Text style={styles.adoptButtonText}>Ir a Adoptar</Text>
            </TouchableOpacity>
          </View>
        )}
      </CustomModalPets>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  petCard: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  petImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  petLocation: {
    fontSize: 16,
    color: '#666',
  },
  petCategory: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  petBreed: {
    fontSize: 16,
  },
  adoptButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  adoptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  smallInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  smallInfoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});

export default Home;