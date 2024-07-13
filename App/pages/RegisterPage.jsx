import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import LinkBoton from '../components/atoms/button/linkboton';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        pk_id_user: '',
        nombre_user: '',
        email_user: '',
        telefono_user: '',
        password_user: '',
        departamento: '',
        municipio: '',
        ubicacion_user: '',
        tipo_vivienda_user: '',
        espacio_dispo_user: '',
        canti_mas_hogar_user: '',
        horas_en_casa_user: '',
        experiencia_user: '',
        disponibilidad_user: '',
        economia_user: '',
        rol_user: '',
        estado_user: '',
    });

    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        async function fetchDepartamentos() {
            try {
                const response = await axios.get('http://192.168.1.11:3000/v1/departamentos');
                setDepartamentos(response.data.data);
            } catch (error) {
                console.error('Error fetching departamentos:', error);
            }
        }

        fetchDepartamentos();
    }, []);

    const handleDepartamentoChange = async (value) => {
        handleInputChange('departamento', value);
        try {
            const response = await axios.get(`http://192.168.1.11:3000/v1/muni_depar/${value}`);
            setMunicipios(response.data.data);
        } catch (error) {
            console.error('Error fetching municipios:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://192.168.1.11:3000/v1/user', formData);
            if (response.status === 200) {
                Alert.alert("Éxito", "Usuario creado exitosamente");
            } else {
                Alert.alert("Error", "No se pudo crear el usuario");
            }
        } catch (error) {
            Alert.alert("Error", "Error en el servidor: " + error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registrarme</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={formData.nombre_user}
                onChangeText={(value) => handleInputChange('nombre_user', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email_user}
                onChangeText={(value) => handleInputChange('email_user', value)}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={formData.telefono_user}
                onChangeText={(value) => handleInputChange('telefono_user', value)}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={formData.password_user}
                onChangeText={(value) => handleInputChange('password_user', value)}
                secureTextEntry
            />
            <View style={styles.pickerContainer}>
                <View style={styles.pickerItem}>
                    <RNPickerSelect
                        style={{
                            ...pickerSelectStyles,
                            inputIOS: {
                                ...pickerSelectStyles.inputIOS,
                                height: 40,
                                borderColor: '#000',
                                borderWidth: 1,
                                marginBottom: 10,
                            },
                            inputAndroid: {
                                ...pickerSelectStyles.inputAndroid,
                                height: 40,
                                borderColor: '#000',
                                borderWidth: 1,
                                marginBottom: 10,
                            },
                        }}
                        placeholder={{
                            label: 'Experiencia previa...',
                            value: null,
                        }}
                        value={formData.experiencia_user}
                        onValueChange={(value) => handleInputChange('experiencia_user', value)}
                        items={[
                            { label: 'Sí', value: 'Si' },
                            { label: 'No', value: 'No' },
                        ]}
                    />
                </View>
                <View style={styles.pickerItem}>
                    <TextInput
                        style={styles.input}
                        placeholder="Disponibilidad horas"
                        value={formData.disponibilidad_user}
                        onChangeText={(value) => handleInputChange('disponibilidad_user', value)}
                        keyboardType="numeric"
                    />
                </View>
            </View>
            <View style={styles.pickerContainer}>
                <View style={styles.pickerItem}>
                    <RNPickerSelect
                        style={{
                            ...pickerSelectStyles,
                            inputIOS: {
                                ...pickerSelectStyles.inputIOS,
                                height: 40,
                                borderColor: '#000',
                                borderWidth: 1,
                                marginBottom: 10,
                            },
                            inputAndroid: {
                                ...pickerSelectStyles.inputAndroid,
                                height: 40,
                                borderColor: '#000',
                                borderWidth: 1,
                                marginBottom: 10,
                            },
                        }}
                        placeholder={{
                            label: 'Ubicación...',
                            value: null,
                        }}
                        value={formData.ubicacion_user}
                        onValueChange={(value) => handleInputChange('ubicacion_user', value)}
                        items={[
                            { label: 'Barrio', value: 'Barrio' },
                            { label: 'Vereda', value: 'Vereda' },
                        ]}
                    />
                </View>
                <View style={styles.pickerItem}>
                    <RNPickerSelect
                        style={{
                            ...pickerSelectStyles,
                            inputIOS: {
                                ...pickerSelectStyles.inputIOS,
                                height: 40,
                                borderColor: '#000',
                                borderWidth: 1,
                                marginBottom: 10,
                            },
                            inputAndroid: {
                                ...pickerSelectStyles.inputAndroid,
                                height: 40,
                                borderColor: '#000',
                                borderWidth: 1,
                                marginBottom: 10,
                            },
                        }}
                        placeholder={{
                            label: 'Tipo de vivienda...',
                            value: null,
                        }}
                        value={formData.tipo_vivienda_user}
                        onValueChange={(value) => handleInputChange('tipo_vivienda_user', value)}
                        items={[
                            { label: 'Casa', value: 'Casa' },
                            { label: 'Apartamento', value: 'Apartamento' },
                            { label: 'Finca', value: 'Finca' },
                        ]}
                    />
                </View>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Espacio disponible"
                value={formData.espacio_dispo_user}
                onChangeText={(value) => handleInputChange('espacio_dispo_user', value)}
            />
            <View style={styles.pickerContainer}>
                <View style={styles.pickerItem}>
                    <TextInput
                        style={styles.input}
                        placeholder="Cantidad de mascotas en el hogar"
                        value={formData.canti_mas_hogar_user}
                        onChangeText={(value) => handleInputChange('canti_mas_hogar_user', value)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.pickerItem}>
                    <TextInput
                        style={styles.input}
                        placeholder="Horas en casa"
                        value={formData.horas_en_casa_user}
                        onChangeText={(value) => handleInputChange('horas_en_casa_user', value)}
                        keyboardType="numeric"
                    />
                </View>
            </View>
            <RNPickerSelect
                style={{
                    ...pickerSelectStyles,
                    inputIOS: {
                        ...pickerSelectStyles.inputIOS,
                        height: 40,
                        borderColor: '#000',
                        borderWidth: 1,
                        marginBottom: 10,
                    },
                    inputAndroid: {
                        ...pickerSelectStyles.inputAndroid,
                        height: 40,
                        borderColor: '#000',
                        borderWidth: 1,
                        marginBottom: 10,
                    },
                }}
                placeholder={{
                    label: 'Capacidad económica...',
                    value: null,
                }}
                value={formData.economia_user}
                onValueChange={(value) => handleInputChange('economia_user', value)}
                items={[
                    { label: 'Mala', value: 'Mala' },
                    { label: 'Regular', value: 'Regular' },
                    { label: 'Buena', value: 'Buena' },
                    { label: 'Muy Buena', value: 'Muy Buena' },
                ]}
            />
            <LinkBoton
                press={handleSubmit}
                text="Registrarme"
                styles={styles.boton}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#FDFFFE"
    },
    boton: {
        backgroundColor: '#000',
        fontSize: 15
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    pickerItem: {
        width: '45%', // Ajusta el ancho según tu diseño
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 16,
        paddingTop: 13,
    },
    inputAndroid: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 16,
        paddingTop: 13,
    },
});

export default RegisterPage;
