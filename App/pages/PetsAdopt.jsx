import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { IP } from '../api/IP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../context/AuthContext';
import LinkBoton from '../components/atoms/button/linkboton';
import AdoptFinally from './AdoptFinally';
import { useRoute } from '@react-navigation/native';

const AdoptanteSection = ({ pet, navigateToUserProfile }) => {
    return (
        <View style={styles.adoptanteContainer}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../resources/fondo_perfil1.png')}
                    resizeMode="cover"
                    style={styles.headerImage}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.adoptanteText}>Adoptante: {pet.nombre_user}</Text>
                <Text style={styles.adoptanteText}>Email: {pet.email_user}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => navigateToUserProfile(pet.fk_adoptante)}
                >
                    <Text style={styles.profileButtonText}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

function ListPetPage({ navigation }) {
    const route = useRoute();
    const { params } = route;
    const [isLoading, setLoading] = useState(true);
    const [pet, setPet] = useState(null);
    const [userAuth, setUserAuth] = useState({});
    const { isAuthenticated } = useAuthContext();
    const [adoptVisible, setAdoptVisible] = useState(false);

    const getPetDetails = async () => {
        try {
            const response = await axios.get(`${IP}/v1/petsone/${params.pk_id_mas}`);
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
        };
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

    const navigateToUserProfile = (userId) => {
        navigation.navigate('Perfil', { userId });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={{ marginTop: 20 }} />
            ) : (
                pet && (
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
    headerImage: {
        height: 228,
        width: "100%",
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
    },
    profileButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#06AEF4',
        borderRadius: 5,
        alignItems: 'center',
    },
    profileButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    adoptanteContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 10,
    },
    infoContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    adoptanteText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    cancelButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default ListPetPage;
