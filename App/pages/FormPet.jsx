import React, { useEffect, useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView, Alert, View, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axiosClient from '../api/axios';
import { IP } from '../api/IP';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterPetForm = () => {
    const { getCategorias, categorias, getRazasForCategorias, razas, setRazas, getPetsAxios } = useAuthContext();
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
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
        fk_raza_mas: '',
        imagen_pet: null,
        fk_categoria: ''
    });

    const requiredFields = {
        nombre_mas: 'Nombre',
        edad_mas: 'Edad (meses)',
        tamano_mas: 'Tamaño (cm)',
        peso_mas: 'Peso (kilos)',
        descripcion_mas: 'Descripción/enfermedades/tratamientos',
        vacunacion_mas: 'Vacunaciones',
        esterilizacion_castracion_mas: 'Esterilización/Castración',
        enfermedades_mas: 'Enfermedades',
        tratamientos_mas: 'Tratamientos',
        energia_mas: 'Energía',
        compatibilidad_mas: 'Compatibilidad con niños y mas mascotas',
        habitos_mas: 'Hábitos',
        necesidades_mas: 'Necesidades especiales',
        lugar_rescate_mas: 'Lugar de rescate',
        condiciones_estado_mas: 'Condiciones Estado',
        tiempo_en_refugio_mas: 'Tiempo en refugio (meses)',
        genero_mas: 'Género',
        fk_raza_mas: 'Raza',
        fk_categoria: 'Categoria'
    };

    useEffect(() => {
        getCategorias();
        setRazas([]);
    }, []);

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoriaChange = async (value) => {
        if (value) {
            handleInputChange('fk_categoria', value);
            getRazasForCategorias(value);
        }
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
                setFormData({ ...formData, imagen_pet: image });
            }
        });
    };

    const handleSubmit = async () => {
        for (let field in requiredFields) {
            if (!formData[field]) {
                Alert.alert('Error', `Por favor complete el campo: ${requiredFields[field]}`);
                return;
            }
        }

        const { fk_categoria, ...resDatas } = formData;
        const dataToSend = new FormData();
        Object.keys(resDatas).forEach(key => {
            dataToSend.append(key, resDatas[key]);
        });

        try {
            const response = await axios.post(`${IP}/v1/pets`, dataToSend);

            if (response.status === 200) {
                Alert.alert('Éxito', 'Mascota registrada exitosamente');
                getPetsAxios();
                navigation.navigate('Visitante');
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
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#BFBFBF"
                value={formData.nombre_mas}
                onChangeText={(value) => handleInputChange('nombre_mas', value)}
            />
            <Text style={styles.label}>Edad (meses):</Text>
            <TextInput
                style={styles.input}
                placeholder="Edad (meses)"
                placeholderTextColor="#BFBFBF"
                value={formData.edad_mas}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('edad_mas', value)}
            />
            <Text style={styles.label}>Tamaño (cm):</Text>
            <TextInput
                style={styles.input}
                placeholder="Tamaño (cm)"
                placeholderTextColor="#BFBFBF"
                value={formData.tamano_mas}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('tamano_mas', value)}
            />
            <Text style={styles.label}>Peso (kilos):</Text>
            <TextInput
                style={styles.input}
                placeholder="Peso (kilos)"
                placeholderTextColor="#BFBFBF"
                value={formData.peso_mas}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('peso_mas', value)}
            />
            <Text style={styles.label}>Descripción/enfermedades/tratamientos:</Text>
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                placeholderTextColor="#BFBFBF"
                value={formData.descripcion_mas}
                onChangeText={(value) => handleInputChange('descripcion_mas', value)}
            />
            <Text style={styles.label}>Vacunaciones:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('vacunacion_mas', value)}
                items={[
                    { label: 'Sí', value: 'Sí' },
                    { label: 'No', value: 'No' },
                ]}
                placeholderTextColor="#BFBFBF"
                style={pickerSelectStyles}
                placeholder={{ label: 'Vacunación', value: null }}
            />
            <Text style={styles.label}>Esterilización/Castración:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('esterilizacion_castracion_mas', value)}
                items={[
                    { label: 'Sí', value: 'Sí' },
                    { label: 'No', value: 'No' },
                ]}
                placeholderTextColor="#BFBFBF"
                style={pickerSelectStyles}
                placeholder={{ label: 'Esterilización/Castración', value: null }}
            />
            <Text style={styles.label}>Enfermedades:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('enfermedades_mas', value)}
                items={[
                    { label: 'Sí', value: 'Sí' },
                    { label: 'No', value: 'No' },
                ]}
                placeholderTextColor="#BFBFBF"
                style={pickerSelectStyles}
                placeholder={{ label: 'Enfermedades', value: null }}
            />
            <Text style={styles.label}>Tratamientos:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('tratamientos_mas', value)}
                items={[
                    { label: 'Sí', value: 'Sí' },
                    { label: 'No', value: 'No' },
                ]}
                placeholderTextColor="#BFBFBF"
                style={pickerSelectStyles}
                placeholder={{ label: 'Tratamientos', value: null }}
            />
            <Text style={styles.label}>Energía:</Text>
            <TextInput
                style={styles.input}
                placeholder="Energía"
                placeholderTextColor="#BFBFBF"
                value={formData.energia_mas}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('energia_mas', value)}
            />
            <Text style={styles.label}>Compatibilidad con niños y mas mascotas:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('compatibilidad_mas', value)}
                items={[
                    { label: 'Sí', value: 'Sí' },
                    { label: 'No', value: 'No' },
                ]}
                placeholderTextColor="#BFBFBF"
                style={pickerSelectStyles}
                placeholder={{ label: 'Compatibilidad', value: null }}
            />
            <Text style={styles.label}>Hábitos:</Text>
            <TextInput
                style={styles.input}
                placeholder="Hábitos"
                placeholderTextColor="#BFBFBF"
                value={formData.habitos_mas}
                onChangeText={(value) => handleInputChange('habitos_mas', value)}
            />
            <Text style={styles.label}>Necesidades especiales:</Text>
            <TextInput
                style={styles.input}
                placeholder="Necesidades especiales"
                placeholderTextColor="#BFBFBF"
                value={formData.necesidades_mas}
                onChangeText={(value) => handleInputChange('necesidades_mas', value)}
            />
            <Text style={styles.label}>Lugar de rescate:</Text>
            <TextInput
                style={styles.input}
                placeholder="Lugar de rescate"
                placeholderTextColor="#BFBFBF"
                value={formData.lugar_rescate_mas}
                onChangeText={(value) => handleInputChange('lugar_rescate_mas', value)}
            />
            <Text style={styles.label}>Condiciones Estado:</Text>
            <TextInput
                style={styles.input}
                placeholder="Condiciones Estado"
                placeholderTextColor="#BFBFBF"
                value={formData.condiciones_estado_mas}
                onChangeText={(value) => handleInputChange('condiciones_estado_mas', value)}
            />
            <Text style={styles.label}>Tiempo en refugio (meses):</Text>
            <TextInput
                style={styles.input}
                placeholder="Tiempo en refugio (meses)"
                placeholderTextColor="#BFBFBF"
                value={formData.tiempo_en_refugio_mas}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('tiempo_en_refugio_mas', value)}
            />
            <Text style={styles.label}>Género:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('genero_mas', value)}
                items={[
                    { label: 'Macho', value: 'Macho' },
                    { label: 'Hembra', value: 'Hembra' },
                ]}
                placeholderTextColor="#BFBFBF"
                style={pickerSelectStyles}
                placeholder={{ label: 'Género', value: null }}
            />
            <Text style={styles.label}>Categoria:</Text>
            <RNPickerSelect
                onValueChange={handleCategoriaChange}
                items={categorias.map(cat => ({ label: cat.nombre_cat, value: cat.pk_id_cat }))}
                placeholderTextColor="#BFBFBF"
                style={pickerSelectStyles}
                placeholder={{ label: 'Categoria', value: null }}
            />
            <Text style={styles.label}>Raza:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('fk_raza_mas', value)}
                items={razas.map(raza => ({ label: raza.nombre_raza, value: raza.pk_id_raza }))}
                placeholderTextColor="#BFBFBF"
                style={pickerSelectStyles}
                placeholder={{ label: 'Raza', value: null }}
            />
            <Text style={styles.label}>Imagen:</Text>
            <Button title="Seleccionar Imagen" onPress={handleImagePick} />
            {formData.imagen_pet && <Image source={{ uri: formData.imagen_pet.uri }} style={styles.image} />}
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
        color: '#000',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        color: '#000',
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: '#000',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        color: '#000',
        paddingRight: 30,
    },
});

export default RegisterPetForm;
