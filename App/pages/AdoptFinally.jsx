import { View, Text, StyleSheet, ActivityIndicator, Modal, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../components/modal/modal';
import { IP } from '../api/IP';
import axiosClient from '../api/axios';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const AdoptFinally = ({ visible, onClose, IdPet }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation()

    const handleAdopt = async () => {
        setIsLoading(true);
        try {
            const adoptanteData = await AsyncStorage.getItem('usuario');
            const userData = JSON.parse(adoptanteData);

            const response = await axios.put(`${IP}/v1/petses/${IdPet.pk_id_mas}`, {
                adoptanteId: userData.pk_id_user
            });

            if (response.status === 200) {
                Alert.alert('Éxito', 'Se registró su petición exitosamente');
                navigation.navigate('Visitante')
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al intentar adoptar la mascota.');
            console.error(error);
        } finally {
            setIsLoading(false);
            onClose();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <CustomModal visible={visible} onClose={onClose}>
                <Text>¿Estás seguro que deseas adoptar a {IdPet.nombre_mas}?</Text>
                <View>
                    <Button title="Sí, adoptar" onPress={handleAdopt} />
                    <Button title="Cancelar" onPress={onClose} />
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
});

export default AdoptFinally;
