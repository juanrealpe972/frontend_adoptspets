import React, { useEffect } from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { IP } from '../api/IP';
import EnergyCircle from '../components/atoms/EnergyCircle';
import { useAuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ListMisPets({ navigation }) {
    const { getMisPets, misPets } = useAuthContext();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await AsyncStorage.getItem('usuario');
                if (user) {
                    const parsedUser = JSON.parse(user);
                    getMisPets(parsedUser.pk_id_user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [getMisPets]);

    const handlePressAdoptar = id => {
        navigation.navigate('Pet', { petId: id });
    };

    const getStatusStyle = (estado) => {
        switch (estado) {
            case 'en espera':
                return styles.statusWaiting;
            case 'inactivo':
                return styles.statusInactive;
            default:
                return styles.statusDefault;
        }
    };

    return (
        <View style={styles.container}>
            {misPets.length === 0 ? (
                <Text style={styles.noPetsMessage}>No he adoptado o no tengo mascotas por adoptar.</Text>
            ) : (
                <FlatList
                    data={misPets}
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
                                <EnergyCircle energyLevel={item.energia_mas} />
                                <View style={styles.petDetailsRight}>
                                    <Text style={styles.petCategory}>{item.nombre_cate}</Text>
                                    <Text style={styles.petBreed}>{item.nombre_raza}</Text>
                                </View>
                            </View>
                            <View style={styles.adoptionInfo}>
                                <Text style={styles.petBreed}>
                                    Fecha de adopción: {item.fecha_adop_mas ? item.fecha_adop_mas : ''}
                                </Text>
                                <Text style={[styles.petStatus, getStatusStyle(item.estado_mas)]}>
                                    {item.estado_mas}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.adoptButton}
                                onPress={() => handlePressAdoptar(item.pk_id_mas)}
                            >
                                <Text style={styles.adoptButtonText}>Visualizar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
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
        borderWidth: 0.4,
    },
    petViewImage: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#ccc",
        borderWidth: 0.4,
        padding: 5,
    },
    petImage: {
        width: '50%',
        height: 200,
        borderRadius: 10,
    },
    petInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 20,
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
        fontSize: 15,
        fontWeight: 'bold',
        color: "black"
    },
    petLocation: {
        fontSize: 15,
        color: '#666',
        marginTop: 4,
    },
    petCategory: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "black"
    },
    petBreed: {
        fontSize: 15,
        marginTop: 4,
        color: "black"
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
    noPetsMessage: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    petStatus: {
        fontSize: 15,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    statusWaiting: {
        color: 'blue',
    },
    statusInactive: {
        color: 'red',
    },
    statusDefault: {
        color: 'black',
    },
    adoptionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 20,
    },
});

export default ListMisPets;
