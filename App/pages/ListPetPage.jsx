import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { IP } from '../api/IP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../context/AuthContext';
import LinkBoton from '../components/atoms/button/linkboton';
import AdoptFinally from './AdoptFinally';

function ListPetPage({ route }) {
    const { petId } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [pet, setPet] = useState(null);
    const [userAuth, setUserAuth] = useState({});
    const { isAuthenticated } = useAuthContext();
    const [adoptVisible, setAdoptVisible] = useState(false);

    const getPetDetails = async () => {
        try {
            const response = await axios.get(`${IP}/v1/petsone/${petId}`);
            setPet(response.data.data[0]);
        } catch (error) {
            console.log('Error en el servidor: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            const jsonValue = await AsyncStorage.getItem('usuario');
            const userData = JSON.parse(jsonValue);
            if(userData) {
                setUserAuth(userData);
            }
        }
        getUser();
        getPetDetails();
    }, []);

    const renderUpdateButton = () => {
        if (isAuthenticated && userAuth !== "admin") {
            return (
                <LinkBoton press={() => setAdoptVisible(true)} text={'Adoptar Mascota'} />
            );
        }
        return null;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={{ marginTop: 20 }} />
            ) : (
                pet && (
                    <View style={styles.petDetails}>
                        <Image
                            source={{ uri: `${IP}/pets/${pet.imagen_pet}` }}
                            style={styles.petImage}
                            onError={() => console.log('Error loading image')}
                        />
                        <View>
                            <Text style={styles.petName}>{pet.nombre_mas}</Text>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoTitle}>Datos básicos:</Text>
                                <Text style={styles.infoText}>Edad: {pet.edad_mas} meses</Text>
                                <Text style={styles.infoText}>Tamaño: {pet.tamano_mas}cm</Text>
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
                                {renderUpdateButton()}
                            </View>
                            {adoptVisible && (
                                <AdoptFinally
                                    visible={true}
                                    onClose={() => setAdoptVisible(false)}
                                />
                            )}
                        </View>
                    </View>
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
        textAlign:"center"
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
    },
    updateButton: {
        width: 180,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#06AEF4",
        borderRadius: 10,
        marginVertical: 2,
    },
    updateButtonText: {
        fontSize: 16,
        color: "white",
    },
});

export default ListPetPage;
