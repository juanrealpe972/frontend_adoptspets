import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axiosClient from '../api/axios';
import { IP } from '../api/IP';
import { launchImageLibrary } from 'react-native-image-picker';

const RegisterPetForm = () => {
    const [petData, setPetData] = useState({
        nombre_mas: '',
        edad_mas: '',
        tamano_mas: '',
        peso_mas: '',
        descripcion_mas: '',
        vacunacion_mas: '',
        esterilizacion_castracion_mas: '',
        enfermedades_mas: '',
        tratamientos_mas: '',
        energia_mas: '',
        compatibilidad_mas: '',
        habitos_mas: '',
        necesidades_mas: '',
        lugar_rescate_mas: '',
        condiciones_estado_mas: '',
        tiempo_en_refugio_mas: '',
        genero_mas: '',
        estado_mas: '',
        fk_raza_mas: '',
        imagen_pet: null,
    });

    const handleInputChange = (name, value) => {
        setPetData({ ...petData, [name]: value });
    };

    const handleImagePick = () => {
        launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const image = {
                    uri: response.assets[0].uri,
                    type: response.assets[0].type,
                    name: response.assets[0].fileName,
                };
                setPetData({ ...petData, imagen_pet: image });
            }
        });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        Object.keys(petData).forEach(key => {
            formData.append(key, petData[key]);
        });
        try {
            const response = await axiosClient.post(`${IP}/v1/pets`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                Alert.alert('Éxito', 'Mascota registrada exitosamente');
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            console.error('Error al registrar la mascota:', error);
            Alert.alert('Error', 'Hubo un problema al intentar registrar la mascota.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registrar Mascota</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={petData.nombre_mas}
                onChangeText={(value) => handleInputChange('nombre_mas', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Edad (meses)"
                value={petData.edad_mas}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('edad_mas', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Tamaño (cm)"
                value={petData.tamano_mas}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('tamano_mas', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Peso (kilos)"
                value={petData.peso_mas}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('peso_mas', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={petData.descripcion_mas}
                onChangeText={(value) => handleInputChange('descripcion_mas', value)}
            />
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('vacunacion_mas', value)}
                items={[
                    { label: 'Sí', value: 'Sí' },
                    { label: 'No', value: 'No' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Vacunación', value: null }}
            />
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('esterilizacion_castracion_mas', value)}
                items={[
                    { label: 'Sí', value: 'Sí' },
                    { label: 'No', value: 'No' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Esterilización/Castración', value: null }}
            />
            <TextInput
                style={styles.input}
                placeholder="Enfermedades"
                value={petData.enfermedades_mas}
                onChangeText={(value) => handleInputChange('enfermedades_mas', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Tratamientos"
                value={petData.tratamientos_mas}
                onChangeText={(value) => handleInputChange('tratamientos_mas', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Energía"
                value={petData.energia_mas}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('energia_mas', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Compatibilidad"
                value={petData.compatibilidad_mas}
                onChangeText={(value) => handleInputChange('compatibilidad_mas', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Hábitos"
                value={petData.habitos_mas}
                onChangeText={(value) => handleInputChange('habitos_mas', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Necesidades especiales"
                value={petData.necesidades_mas}
                onChangeText={(value) => handleInputChange('necesidades_mas', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Lugar de rescate"
                value={petData.lugar_rescate_mas}
                onChangeText={(value) => handleInputChange('lugar_rescate_mas', value)}
            />
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('condiciones_estado_mas', value)}
                items={[
                    { label: 'Mal', value: 'Mal' },
                    { label: 'Regular', value: 'Regular' },
                    { label: 'Bien', value: 'Bien' },
                    { label: 'Muy Bien', value: 'Muy Bien' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Condiciones Estado', value: null }}
            />
            <TextInput
                style={styles.input}
                placeholder="Tiempo en refugio (meses)"
                value={petData.tiempo_en_refugio_mas}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('tiempo_en_refugio_mas', value)}
            />
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('genero_mas', value)}
                items={[
                    { label: 'Macho', value: 'Macho' },
                    { label: 'Hembra', value: 'Hembra' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Género', value: null }}
            />
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('estado_mas', value)}
                items={[
                    { label: 'Activo', value: 'activo' },
                    { label: 'Inactivo', value: 'inactivo' },
                    { label: 'Espera', value: 'espera' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Estado', value: null }}
            />
            <TextInput
                style={styles.input}
                placeholder="ID Raza"
                value={petData.fk_raza_mas}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('fk_raza_mas', value)}
            />
            <Button title="Seleccionar Imagen" onPress={handleImagePick} />
            {petData.imagen_pet && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: petData.imagen_pet.uri }} style={styles.image} />
                </View>
            )}
            <Button title="Registrar Mascota" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    inputAndroid: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default RegisterPetForm;
