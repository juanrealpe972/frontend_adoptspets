import React, { useEffect, useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { useAuthContext } from '../context/AuthContext';
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
        imagen_pet: '',
        fk_categoria: ''
    });

    useEffect(() => {
        getCategorias();
        setRazas([]);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (mode === 'update' && idPet) {
<<<<<<< HEAD
                    console.log(idPet);
=======
>>>>>>> d092ca3c25c67803d59352c28f7c53ee893b7ca0
                    setFormData({
                        nombre_mas: idPet.nombre_mas,
                        edad_mas: String(idPet.edad_mas),
                        tamano_mas: String(idPet.tamano_mas),
                        peso_mas: String(idPet.peso_mas),
                        descripcion_mas: idPet.descripcion_mas,
                        esterilizacion_castracion_mas: String(idPet.esterilizacion_castracion_mas),
                        enfermedades_mas: idPet.enfermedades_mas,
                        vacunacion_mas: String(idPet.vacunacion_mas),
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
                        imagen_pet: idPet.imagen_pet
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
                const image = response.assets[0];
                setFormData({ ...formData, imagen_pet: {
                    uri: image.uri,
                    type: image.type,
                    name: image.fileName,
                }});
            }
        });
    };

    const handleSubmit = async () => {
        const { fk_categoria, imagen_pet, ...resDatas } = formData;
        const dataToSend = new FormData();
        Object.keys(resDatas).forEach(key => {
            dataToSend.append(key, resDatas[key]);
        });

        if (formData.imagen_pet && typeof formData.imagen_pet === 'object') {
            dataToSend.append('imagen_pet', {
                uri: formData.imagen_pet.uri,
                type: 'image/jpeg',
                name: formData.imagen_pet.name,
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
<<<<<<< HEAD
                getPetsAxios()
=======
>>>>>>> d092ca3c25c67803d59352c28f7c53ee893b7ca0
            } else {
                response = await axiosClient.post(`/v1/pets`, dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
<<<<<<< HEAD
                getPetsAxios()
=======
>>>>>>> d092ca3c25c67803d59352c28f7c53ee893b7ca0
            }

            console.log('Response:', response);
            if (response.status === 200) {
                Alert.alert('Éxito', `Mascota ${mode === 'update' ? 'actualizada' : 'registrada'} exitosamente`);
                getPetsAxios();
                navigation.navigate('Visitante');
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            console.error(`Error al ${mode === 'update' ? 'actualizar' : 'registrar'} la mascota:`, error);
            Alert.alert('Error', `Hubo un problema al intentar ${mode === 'update' ? 'actualizar' : 'registrar'} la mascota.`);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>${mode === 'update' ? 'actualizar' : 'registrar'} Mascota</Text>
            {mode === "update" && (
                <Image
                    source={{ uri: `${IP}/pets/${idPet.imagen_pet}` }}
                    style={styles.petImage}
                    onError={() => console.log('Error cargando la imagen')}
                />
            )}
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
            <Text style={styles.label}>Energía:</Text>
            <TextInput
                style={styles.input}
                placeholder="Energía"
                placeholderTextColor="#BFBFBF"
                value={formData.energia_mas}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('energia_mas', value)}
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
                value={formData.genero_mas}
                style={pickerSelectStyles}
                placeholder={{ label: 'Selecciona Genero', value: null }}
                placeholderTextColor="#BFBFBF"
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
            <Text style={styles.label}>Esterilización/Castración:</Text>
            <RNPickerSelect
                placeholder={{ label: 'Selecciona opción', value: null }}
                value={formData.esterilizacion_castracion_mas}
                onValueChange={(value) => handleInputChange('esterilizacion_castracion_mas', value)}
                items={[
                    { label: 'Si', value: 'Si' },
                    { label: 'No', value: 'No' },
                ]}
                style={pickerSelectStyles}
                placeholderTextColor="#BFBFBF"
            />
            <Text style={styles.label}>Vacunaciones:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('vacunacion_mas', value)}
                items={[
                    { label: 'Si', value: 'Si' },
                    { label: 'No', value: 'No' },
                ]}
                value={formData.vacunacion_mas}
                style={pickerSelectStyles}
                placeholder={{ label: 'Selecciona opción', value: null }}
                placeholderTextColor="#BFBFBF"
            />
            <Text style={styles.label}>Enfermedades:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('enfermedades_mas', value)}
                items={[
                    { label: 'Si', value: 'Si' },
                    { label: 'No', value: 'No' },
                ]}
                value={formData.enfermedades_mas}
                style={pickerSelectStyles}
                placeholder={{ label: 'Selecciona opción', value: null }}
                placeholderTextColor="#BFBFBF"
            />
            <Text style={styles.label}>Tratamientos:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('tratamientos_mas', value)}
                items={[
                    { label: 'Si', value: 'Si' },
                    { label: 'No', value: 'No' },
                ]}
                value={formData.tratamientos_mas}
                style={pickerSelectStyles}
                placeholder={{ label: 'Selecciona opción', value: null }}
                placeholderTextColor="#BFBFBF"
            />
            <Text style={styles.label}>Compatibilidad con niños y más mascotas:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('compatibilidad_mas', value)}
                items={[
                    { label: 'Si', value: 'Si' },
                    { label: 'No', value: 'No' },
                ]}
                value={formData.compatibilidad_mas}
                style={pickerSelectStyles}
                placeholder={{ label: 'Selecciona opción', value: null }}
                placeholderTextColor="#BFBFBF"
            />
            <Text style={styles.label}>Condiciones Estado:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('condiciones_estado_mas', value)}
                items={[
                    { label: 'Mal', value: 'Mal' },
                    { label: 'Regular', value: 'Regular' },
                    { label: 'Bien', value: 'Bien' },
                    { label: 'Muy Bien', value: 'Muy Bien' },
                ]}
                value={formData.condiciones_estado_mas}
                style={pickerSelectStyles}
                placeholder={{ label: 'Selecciona condiciones de estado', value: null }}
                placeholderTextColor="#BFBFBF"
            />
            <Text style={styles.label}>Imagen:</Text>
            <Button title="Seleccionar Imagen" onPress={handleImagePick} />
            {formData.imagen_pet ? (
                <Image
                    source={{ uri: formData.imagen_pet.uri }}
                    style={styles.image}
                    onError={() => console.log('Error cargando la imagen')}
<<<<<<< HEAD
                />  
=======
                />
>>>>>>> d092ca3c25c67803d59352c28f7c53ee893b7ca0
            ) : (
                <Text>No image selected</Text>
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
    petImage: {
        width: '100%',
        height: 400,
        borderRadius: 10,
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
