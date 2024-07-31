import React, { useEffect, useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import axiosClient from '../api/axios';
import { IP } from '../api/IP';

const RegisterPetForm = ({ route }) => {
    const { getCategorias, categorias, getRazasForCategorias, razas, setRazas, getPetsAxios, idPet } = useAuthContext();
    const navigation = useNavigation();
    const { mode } = route.params;
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

    const camposRequeridos = {
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
        compatibilidad_mas: 'Compatibilidad con niños y más mascotas',
        habitos_mas: 'Hábitos',
        necesidades_mas: 'Necesidades especiales',
        lugar_rescate_mas: 'Lugar de rescate',
        condiciones_estado_mas: 'Condiciones Estado',
        tiempo_en_refugio_mas: 'Tiempo en refugio (meses)',
        genero_mas: 'Género',
        fk_raza_mas: 'Raza',
        fk_categoria: 'Categoría'
    };

    useEffect(() => {
        getCategorias();
        setRazas([]);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (mode === 'update' && idPet) {
                    setFormData({
                        nombre_mas: idPet.nombre_mas,
                        edad_mas: String(idPet.edad_mas),
                        tamano_mas: String(idPet.tamano_mas),
                        peso_mas: String(idPet.peso_mas),
                        descripcion_mas: idPet.descripcion_mas,
                        vacunacion_mas: idPet.vacunacion_mas,
                        esterilizacion_castracion_mas: idPet.esterilizacion_castracion_mas,
                        enfermedades_mas: idPet.enfermedades_mas,
                        tratamientos_mas: idPet.tratamientos_mas,
                        energia_mas: String(idPet.energia_mas),
                        compatibilidad_mas: idPet.compatibilidad_mas,
                        habitos_mas: idPet.habitos_mas,
                        necesidades_mas: idPet.necesidades_mas,
                        lugar_rescate_mas: idPet.lugar_rescate_mas,
                        condiciones_estado_mas: idPet.condiciones_estado_mas,
                        tiempo_en_refugio_mas: String(idPet.tiempo_en_refugio_mas),
                        genero_mas: idPet.genero_mas,
                        fk_raza_mas: String(idPet.fk_raza_mas),
                        fk_categoria: String(idPet.fk_id_cate),
                        imagen_pet: idPet.imagen_pet ? { uri: `http://${IP}/pets/${idPet.imagen_pet}` } : null,
                    });
                    getRazasForCategorias(idPet.fk_id_cate);
                }
            } catch (error) {
                console.error("Error fetching pet data:", error);
            }
        };

        fetchData();
    }, [mode, idPet]);

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
        for (let data in camposRequeridos) {
            if (!formData[data]) {
                Alert.alert('Error', `Por favor complete el campo: ${camposRequeridos[data]}`);
                return;
            }
        }

        const { fk_categoria, imagen_pet, ...resDatas } = formData;
        const dataToSend = new FormData();
        Object.keys(resDatas).forEach(key => {
            dataToSend.append(key, resDatas[key]);
        });

        if (imagen_pet) {
            dataToSend.append('imagen_pet', {
                uri: imagen_pet.uri,
                type: imagen_pet.type,
                name: imagen_pet.name
            });
        }

        try {
            let response;
            if (mode === "update" && idPet) {
                response = await axiosClient.put(`/v1/pets/${idPet.pk_id_mas}`, dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                response = await axiosClient.post(`/v1/pets`, dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            console.log('Response:', response);
            if (response.status === 200) {
                Alert.alert('Éxito', `Mascota ${mode === 'update' ? 'actualizada' : 'registrada'} exitosamente`);
                getPetsAxios();
                navigation.navigate('Visitante');
            } else {
                Alert.alert('Error', response.data.message || 'Algo salió mal');
            }
        } catch (error) {
            console.error(`Error al ${mode === 'update' ? 'actualizar' : 'registrar'} la mascota:`, error);
            Alert.alert('Error', `Hubo un problema al intentar ${mode === 'update' ? 'actualizar' : 'registrar'} la mascota.`);
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
            <TextInput
                style={styles.input}
                placeholder="Vacunaciones"
                placeholderTextColor="#BFBFBF"
                value={formData.vacunacion_mas}
                onChangeText={(value) => handleInputChange('vacunacion_mas', value)}
            />
            <Text style={styles.label}>Esterilización/Castración:</Text>
            <TextInput
                style={styles.input}
                placeholder="Esterilización/Castración"
                placeholderTextColor="#BFBFBF"
                value={formData.esterilizacion_castracion_mas}
                onChangeText={(value) => handleInputChange('esterilizacion_castracion_mas', value)}
            />
            <Text style={styles.label}>Enfermedades:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enfermedades"
                placeholderTextColor="#BFBFBF"
                value={formData.enfermedades_mas}
                onChangeText={(value) => handleInputChange('enfermedades_mas', value)}
            />
            <Text style={styles.label}>Tratamientos:</Text>
            <TextInput
                style={styles.input}
                placeholder="Tratamientos"
                placeholderTextColor="#BFBFBF"
                value={formData.tratamientos_mas}
                onChangeText={(value) => handleInputChange('tratamientos_mas', value)}
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
            <Text style={styles.label}>Compatibilidad con niños y más mascotas:</Text>
            <TextInput
                style={styles.input}
                placeholder="Compatibilidad con niños y más mascotas"
                placeholderTextColor="#BFBFBF"
                value={formData.compatibilidad_mas}
                onChangeText={(value) => handleInputChange('compatibilidad_mas', value)}
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
            <TextInput
                style={styles.input}
                placeholder="Género"
                placeholderTextColor="#BFBFBF"
                value={formData.genero_mas}
                onChangeText={(value) => handleInputChange('genero_mas', value)}
            />
            <Text style={styles.label}>Categoría:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleCategoriaChange(value)}
                items={categorias.map((categoria) => ({
                    label: categoria.nombre_cate,
                    value: categoria.pk_id_cate,
                }))}
                value={formData.fk_categoria}
                style={pickerSelectStyles}
                placeholder={{ label: 'Categoria...', value: null }}
                placeholderTextColor="#BFBFBF"
            />
            <Text style={styles.label}>Raza:</Text>
            <RNPickerSelect
                placeholder={{ label: 'Selecciona una raza', value: null }}
                value={formData.fk_raza_mas}
                onValueChange={(value) => handleInputChange('fk_raza_mas', value)}
                items={razas.map((raza) => ({
                    label: raza.nombre_raza,
                    value: raza.pk_id_raza
                }))}
                style={pickerSelectStyles}
            />
            <Text style={styles.label}>Imagen:</Text>
            <Button title="Seleccionar Imagen" onPress={handleImagePick} />
            {formData.imagen_pet && (
                <Image source={{ uri: formData.imagen_pet.uri }} style={styles.image} />
            )}
            <Button title={mode === 'update' ? 'Actualizar Mascota' : 'Registrar Mascota'} onPress={handleSubmit} />
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
        width: '100%',
        height: 56,
        marginBottom: 10,
        paddingHorizontal: 10,
        color:"black",
        backgroundColor:"#F3F3F3",
        fontSize: 16
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000',
    },
    inputAndroid: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        color: '#000',
        backgroundColor:"#F3F3F3"
    },
});

export default RegisterPetForm;
