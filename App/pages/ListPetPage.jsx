import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import axiosClient from '../api/axios';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../context/AuthContext';
import LinkBoton from '../components/atoms/LinkBoton';
import { IP } from '../api/IP';
import ModalAdoptFinally from '../components/modal/ModalAdoptFinally';

function ListPetPage() {
    const route = useRoute();
    const { petId } = route.params;
    const navigation = useNavigation();
    const [pet, setPet] = useState(null);
    const [userAuth, setUserAuth] = useState({});
    const [isLoading, setLoading] = useState(true);
    const { setIdPet, isAuthenticated } = useAuthContext();
    const [adoptVisible, setAdoptVisible] = useState(false);

    const getPetDetails = async () => {
        try {
            const response = await axiosClient.get(`${IP}/v1/petsone/${petId}`);
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
        getPetDetails();
    }, []);
    
    const getUser = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('usuario'));
        if (user) {
            setUserAuth(user);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getUser();
        }, [])
    );

    const renderUpdateButton = () => {
        if (userAuth.rol_user !== "admin") {
            return (
                <LinkBoton press={() => setAdoptVisible(true)} text={'Adoptar Mascota'} />
            );
        }
        return null;
    };

    const ahoraIniciar = (data) => {
        setIdPet(data);
        navigation.navigate('FormMascota', { mode: "update" });
    };

    const renderUpdateButtonPet = () => {
        if (userAuth.rol_user === "admin") {
            return (
                <LinkBoton 
                    press={() => ahoraIniciar(pet)} 
                    text={'Actualizar Mascota'} 
                />
            );
        }
        return null;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={{ marginTop: 20 }} />
            ) : (
                pet ? (
                    <View style={styles.petDetails}>
                        <Text style={styles.petName}>{pet.nombre_mas}</Text>
                        <Image
                            source={{ uri: `${IP}/pets/${pet.imagen_pet}` }}
                            style={styles.petImage}
                            onError={() => console.log('Error cargando la imagen')}
                        />
                        <View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoTitle}>Datos básicos:</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Edad:</Text> {pet.edad_mas} meses</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Tamaño:</Text> {pet.tamano_mas} cm</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Peso:</Text> {pet.peso_mas} kilos</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Raza:</Text> {pet.nombre_raza}</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Descripción:</Text> {pet.descripcion_mas}</Text>
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoTitle}>Historial médico:</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Vacunación:</Text> {pet.vacunacion_mas}</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Esterilización/Castración:</Text> {pet.esterilizacion_castracion_mas}</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Enfermedades:</Text> {pet.enfermedades_mas}</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Tratamientos:</Text> {pet.tratamientos_mas}</Text>
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoTitle}>Comportamiento y personalidad:</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Nivel de energía:</Text> {pet.energia_mas} de 10</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Compatibilidad con niños, otras mascotas:</Text> {pet.compatibilidad_mas}</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Hábitos:</Text> {pet.habitos_mas}</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Necesidades especiales:</Text> {pet.necesidades_mas}</Text>
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoTitle}>Historia de adopción:</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Género:</Text> {pet.genero_mas}</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Lugar de rescate:</Text> {pet.lugar_rescate_mas}</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Condiciones en las que fue encontrado:</Text> {pet.condiciones_estado_mas}</Text>
                                <Text style={styles.infoText}><Text style={styles.boldText}>Tiempo en el refugio o con el cuidador:</Text> {pet.tiempo_en_refugio_mas} meses</Text>
                                {
                                    pet.estado_mas === "activo" && (
                                        renderUpdateButton()
                                    )
                                }
                                {renderUpdateButtonPet()}
                            </View>
                            {adoptVisible && (
                                <ModalAdoptFinally
                                    visible={true}
                                    onClose={() => setAdoptVisible(false)}
                                    IdPet={pet}
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
        paddingBottom: 25
    },
    petDetails: {
        alignItems: 'center',
    },
    petImage: {
        width: '100%',
        height: 400,
        borderRadius: 10,
    },
    petName: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: "center",
        color:"black"
    },
    infoSection: {
        width: '100%',
        marginTop: 20,
    },
    infoTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color:"#a9a9a9"
    },
    infoText: {
        fontSize: 18,
        marginTop: 5,
        color:"black"
    },
    boldText: {
        fontWeight: '700',
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
