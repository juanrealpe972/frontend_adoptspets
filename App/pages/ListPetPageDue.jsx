import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import axiosClient from '../api/axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { IP } from '../api/IP';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import ConfirmationModal from '../components/modal/ConfirmationModal';

function ListPetPageDue() {
    const navigation = useNavigation();
    const route = useRoute();
    const { getPetsEspera, getPetsAxios } = useAuthContext();
    const { petIdWithDue } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [pet, setPet] = useState(null);
    const [whatsAppMessage, setWhatsAppMessage] = useState('Estimado/a usuario/a, soy el administrador de la aplicación Adopts Pets. Y necesito realizarle una serie de preguntas');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('');

    const getPetDetails = async () => {
        try {
            const response = await axiosClient.get(`${IP}/v1/petsone-due/${petIdWithDue}`);
            if (response.data && response.data.data) {
                setPet(response.data.data[0]);
            } else {
                console.log('Error al obtener los detalles de la mascota:', response.data.message);
            }
        } catch (error) {
            console.log('Error', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPetDetails();
    }, []);

    const handleCancelAdoption = async () => {
        setLoading(true);
        setModalVisible(false);
        try {
            const response = await axios.put(`${IP}/v1/petsac/${pet.pk_id_mas}`);
            if (response.status === 200) {
                Alert.alert('Éxito', 'La adopción ha sido cancelada. La mascota está disponible nuevamente.');
<<<<<<< HEAD
                navigation.navigate('Visitante');
=======
                navigation.navigate('PetsAdopt');
>>>>>>> d092ca3c25c67803d59352c28f7c53ee893b7ca0
                getPetsEspera();
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
        setLoading(true);
        setModalVisible(false);
        try {
            const response = await axios.put(`${IP}/v1/petsdes/${pet.pk_id_mas}`);
            if (response.status === 200) {
                Alert.alert('Éxito', 'La mascota se ha dado en adopción exitosamente.');
<<<<<<< HEAD
                navigation.navigate('Visitante');
=======
                navigation.navigate('PetsAdopt');
>>>>>>> d092ca3c25c67803d59352c28f7c53ee893b7ca0
                getPetsEspera();
                getPetsAxios();
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

    const showModal = (mode) => {
        setModalMode(mode);
        setModalVisible(true);
    };

    const perfilDeUsuario = async (id) => {
        try {
            navigation.navigate('Perfil', { idUser: id });
        } catch (error) {
            console.error('Perfil de usuario:', error);
        }
    };

    const handleWhatsApp = (phone) => {
        let url = `whatsapp://send?text=${encodeURIComponent(whatsAppMessage)}&phone=${phone}`;
        Linking.openURL(url).catch(() => {
            Alert.alert('Error', 'Asegúrese de que WhatsApp esté instalado en su dispositivo.');
        });
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
                                <TouchableOpacity style={styles.button} onPress={() => perfilDeUsuario(pet.fk_adoptante)}>
                                    <Text style={styles.buttonText}>Perfil de usuario</Text>
                                </TouchableOpacity>
                                {pet.estado_mas === "espera" && (
                                    <>
                                        <TouchableOpacity style={styles.button} onPress={() => showModal('cancel')}>
                                            <Text style={styles.buttonText}>Cancelar adopción</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => showModal('adopt')}>
                                            <Text style={styles.buttonText}>Dar en adopción la mascota</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                                <TouchableOpacity style={styles.whatsappButton} onPress={() => handleWhatsApp(pet.telefono_user)}>
                                    <WhatsAppIcon size={20} color="white" />
                                    <Text style={styles.buttonText}> Contactar por WhatsApp</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.noPetText}>No se encontraron detalles de la mascota.</Text>
                )
            )}
            <ConfirmationModal
                visible={modalVisible}
                message={
                    modalMode === 'cancel' ?
                    '¿Estás seguro que deseas cancelar la adopción de esta mascota?' :
                    '¿Estás seguro que deseas dar en adopción esta mascota?'
                }
                onConfirm={modalMode === 'cancel' ? handleCancelAdoption : handleGiveForAdoption}
                onCancel={() => setModalVisible(false)}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
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
    contactSection: {
        marginTop: 20,
    },
    button: {
        backgroundColor: '#E89551',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    whatsappButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#001528',
        padding: 10,
        borderRadius: 5,
        textAlign: "center",
        justifyContent: "center",
        marginTop: 10
    },
    noPetText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ListPetPageDue;
