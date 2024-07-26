import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axiosClient from '../api/axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdoptFinally from './AdoptFinally';
import { IP } from '../api/IP';

function ListPetPageDue() {
    const navigation = useNavigation();
    const route = useRoute();
    const { petIdWithDue } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [pet, setPet] = useState(null);
    const [userAuth, setUserAuth] = useState({});
    const [adoptVisible, setAdoptVisible] = useState(false);

    const getPetDetails = async () => {
        try {
            const response = await axiosClient.get(`${IP}/v1/petsone-due/${petIdWithDue}`);
            if (response.data && response.data.data) {
                setPet(response.data.data[0]);
            } else {
                console.log('Error al obtener los detalles de la mascota:', response.data.message);
            }
        } catch (error) {
            if (error.response) {
                console.log('Error en la solicitud:', error.response.data);
                console.log('Status code:', error.response.status);
                console.log('Headers:', error.response.headers);
            } else if (error.request) {
                console.log('Error en la solicitud: No response was received', error.request);
            } else {
                console.log('Error en la solicitud:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            const jsonValue = await AsyncStorage.getItem('usuario');
            const userData = JSON.parse(jsonValue);
            if (userData) {
                setUserAuth(userData);
            }
        };
        getUser();
        getPetDetails();
    }, []);

    const handleCancelAdoption = async () => {
        if (!pet) {
            Alert.alert('Error', 'Detalles de la mascota no disponibles.');
            return;
        }
        setLoading(true);
        try {
            const response = await axiosClient.put(`${IP}/v1/petsac/${pet.pk_id_mas}`);
            if (response.status === 200) {
                Alert.alert('Éxito', 'La adopción ha sido cancelada. La mascota está disponible nuevamente.');
                navigation.navigate('PetDue');
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            console.error('Error al cancelar la adopción:', error);
            Alert.alert('Error', 'Hubo un problema al intentar cancelar la adopción.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleGiveForAdoption = async () => {
        if (!pet) {
            Alert.alert('Error', 'Detalles de la mascota no disponibles.');
            return;
        }
        setLoading(true);
        try {
            const response = await axiosClient.put(`${IP}/v1/petsdes/${pet.pk_id_mas}`);
            if (response.status === 200) {
                Alert.alert('Éxito', 'La mascota se ha dado en adopción exitosamente.');
                navigation.navigate('PetDue');
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            console.error('Error al dar en adopción la mascota:', error);
            Alert.alert('Error', 'Hubo un problema al intentar dar en adopción la mascota.');
        } finally {
            setLoading(false);
        }
    };    

    const perfilDeUsuario = async (id) => {
        try {
            navigation.navigate('Perfil', { idUser: id });
        } catch (error) {
            console.error('Perfil de usuario:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={{ marginTop: 20 }} />
            ) : (
                pet ? (
                    <View style={styles.petDetails}>
                        <Image
                            source={{ uri: `${IP}/pets/${pet.imagen_pet}` }}
                            style={styles.petImage}
                            onError={() => console.log('Error cargando la imagen')}
                        />
                        <View>
                            <Text style={styles.petName}>{pet.nombre_mas}</Text>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoTitle}>Datos básicos:</Text>
                                <Text style={styles.infoText}>Edad: {pet.edad_mas} meses</Text>
                                <Text style={styles.infoText}>Tamaño: {pet.tamano_mas} cm</Text>
                                <Text style={styles.infoText}>Peso: {pet.peso_mas} kilos</Text>
                                <Text style={styles.infoText}>Raza: {pet.nombre_raza}</Text>
                                <Text style={styles.infoText}>Descripción: {pet.descripcion_mas}</Text>
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoTitle}>Historial médico:</Text>
                                <Text style={styles.infoText}>Vacunación: {pet.vacunacion_mas}</Text>
                                <Text style={styles.infoText}>Esterilización/Castración: {pet.esterilizacion_castracion_mas}</Text>
                                <Text style={styles.infoText}>Enfermedades: {pet.enfermedades_mas}</Text>
                                <Text style={styles.infoText}>Tratamientos: {pet.tratamientos_mas}</Text>
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoTitle}>Comportamiento y personalidad:</Text>
                                <Text style={styles.infoText}>Nivel de energía: {pet.energia_mas} de 10</Text>
                                <Text style={styles.infoText}>Compatibilidad con niños, otras mascotas: {pet.compatibilidad_mas}</Text>
                                <Text style={styles.infoText}>Hábitos: {pet.habitos_mas}</Text>
                                <Text style={styles.infoText}>Necesidades especiales: {pet.necesidades_mas}</Text>
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoTitle}>Historia de adopción:</Text>
                                <Text style={styles.infoText}>Género: {pet.genero_mas}</Text>
                                <Text style={styles.infoText}>Lugar de rescate: {pet.lugar_rescate_mas}</Text>
                                <Text style={styles.infoText}>Condiciones en las que fue encontrado: {pet.condiciones_estado_mas}</Text>
                                <Text style={styles.infoText}>Tiempo en el refugio o con el cuidador: {pet.tiempo_en_refugio_mas} meses</Text>
                            </View>
                            <View style={styles.contactSection}>
                                <Text style={styles.infoTitle}>Datos de contacto que desea adoptar la mascota:</Text>
                                <Text style={styles.infoText}>Nombre: {pet.nombre_user}</Text>
                                <Text style={styles.infoText}>Gmail: {pet.email_user}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => perfilDeUsuario(pet.pk_id_user)}>
                                    <Text style={styles.buttonText}>Perfil de usuario</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={handleCancelAdoption}>
                                    <Text style={styles.buttonText}>Cancelar adopción</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={handleGiveForAdoption}>
                                    <Text style={styles.buttonText}>Dar en adopción la mascota</Text>
                                </TouchableOpacity>
                            </View>
                            {adoptVisible && (
                                <AdoptFinally
                                    visible={true}
                                    onClose={() => setAdoptVisible(false)}
                                />
                            )}
                        </View>
                    </View>
                ) : (
                    <Text style={styles.infoText}>No se encontraron detalles de la mascota.</Text>
                )
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    petDetails: {
        alignItems: 'center',
    },
    petImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    petName: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: "center",
    },
    infoSection: {
        width: '100%',
        marginTop: 20,
    },
    infoTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 18,
        marginTop: 5,
        color:"black"
    },
    contactSection: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        width: 180,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#001528",
        borderRadius: 10,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 18,
        color: "white",
        textAlign:"center"
    },
});

export default ListPetPageDue;
