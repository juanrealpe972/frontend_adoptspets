import { View, Text, StyleSheet, ActivityIndicator, Modal, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../components/modal/modal';
import { IP } from '../api/IP';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const AdoptFinally = ({ visible, onClose, IdPet }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const { getPetsAxios } = useAuthContext();

    const handleAdopt = async () => {
        setIsLoading(true);
        try {
            const jsonValue = await AsyncStorage.getItem('usuario');
            const user = JSON.parse(jsonValue);
            if (!user) {
                throw new Error('Usuario no encontrado en AsyncStorage');
            }
            const userId = user.pk_id_user;
            const response = await axios.put(`${IP}/v1/petses/${IdPet.pk_id_mas}`, {
                adoptanteId: userId
            });
            console.log(response.data);
            if (response.status === 200) {
                Alert.alert('Éxito', 'Se registró su petición exitosamente');
                navigation.navigate('Visitante');
                getPetsAxios()
            } else {
                Alert.alert('Error', response.data.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error al intentar adoptar la mascota:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'Hubo un problema al intentar adoptar la mascota.');
        } finally {
            setIsLoading(false);
            onClose();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <CustomModal visible={visible} onClose={onClose}>
                <Text style={styles.modalText}>¿Estás seguro que deseas adoptar a {IdPet.nombre_mas}?</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Sí, adoptar"
                        onPress={handleAdopt}
                        color="#E89551"
                    />
                    <Button
                        title="Cancelar"
                        onPress={onClose}
                        color="#E89551"
                    />
                </View>
            </CustomModal>
            <Modal
                transparent={true}
                animationType="fade"
                visible={isLoading}
                onRequestClose={() => { }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator size="large" color="#39A800" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    activityIndicatorWrapper: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 20
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        color: "black",
        paddingHorizontal: 10,
        textAlign: "center"
    },
});

export default AdoptFinally;
