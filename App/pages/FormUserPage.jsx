import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinkBoton from '../components/atoms/button/linkboton';
import { IP } from '../api/IP';
import { useAuthContext } from '../context/AuthContext';
import axiosClient from '../api/axios';

const FormUserPage = () => {
    const { getDeparts, departamentos, municipios, getMunis, setLoginUser, idUser } = useAuthContext()
    const navigation = useNavigation()
    const route = useRoute();
    const { mode } = route.params;
    const [formData, setFormData] = useState({
        pk_id_user: '',
        nombre_user: '',
        email_user: '',
        password_user: '',
        telefono_user: '',
        ubicacion_user: '',
        tipo_vivienda_user: '',
        espacio_dispo_user: '',
        canti_mas_hogar_user: '',
        horas_en_casa_user: '',
        experiencia_user: '',
        disponibilidad_user: '',
        economia_user: '',
        fk_id_municipio: ''
    });

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        getDeparts();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (mode === "update" && idUser) {
                    console.log(idUser);
                    console.log(idUser.pk_id_user);
                    setFormData({
                        pk_id_user: idUser.pk_id_user,
                        nombre_user: idUser.nombre_user,
                        email_user: idUser.email_user,
                        password_user: idUser.password_user,
                        telefono_user: idUser.telefono_user,
                        ubicacion_user: idUser.ubicacion_user,
                        tipo_vivienda_user: idUser.tipo_vivienda_user,
                        espacio_dispo_user: idUser.espacio_dispo_user,
                        canti_mas_hogar_user: idUser.canti_mas_hogar_user,
                        horas_en_casa_user: idUser.horas_en_casa_user,
                        experiencia_user: idUser.experiencia_user,
                        disponibilidad_user: idUser.disponibilidad_user,
                        economia_user: idUser.economia_user,
                        fk_id_municipio: idUser.fk_id_municipio
                    });
                    getMunis(idUser.fk_id_depar);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [mode, idUser]);

    const handleDepartamentoChange = async (value) => {
        handleInputChange('departamento', value);
        getMunis(value)
    };

    const ahoraIniciar = () => {
        navigation.navigate('FirstPage');
        setLoginUser(true)
    }

    const handleSubmit = async () => {
        try {
            if (mode === "create") {
                const response = await axiosClient.post(`${IP}/v1/users`, formData);
                if (response.status === 200) {
                    Alert.alert("Éxito", "Usuario creado exitosamente");
                    navigation.navigate('FirstPage');
                } else {
                    Alert.alert("Error", "No se pudo crear el usuario");
                }
            } else if (mode === "update") {
                const response = await axiosClient.put(`${IP}/v1/users/${formData.pk_id_user}`, formData);
                if (response.status === 200) {
                    Alert.alert("Éxito", "Usuario actualizado exitosamente");
                    navigation.navigate('FirstPage');
                } else {
                    Alert.alert("Error", "No se pudo actualizar el usuario");
                }
            }
        } catch (error) {
            Alert.alert("Error", "Error en el servidor: " + error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{mode === "create" ? "Registrarme" : "Actualizar Usuario"}</Text>
            <TextInput
                style={styles.input}
                placeholder="Cedula"
                value={formData.pk_id_user}
                onChangeText={(value) => handleInputChange('pk_id_user', value)}
                keyboardType="phone-pad"
            />
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
                            inputIOS: { ...pickerSelectStyles.inputIOS, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                            inputAndroid: { ...pickerSelectStyles.inputAndroid, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                        }}
                        placeholder={{ label: 'Experiencia previa...', value: null, }}
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
                            inputIOS: { ...pickerSelectStyles.inputIOS, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                            inputAndroid: { ...pickerSelectStyles.inputAndroid, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                        }}
                        placeholder={{ label: 'Ubicación...', value: null, }}
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
                            inputIOS: { ...pickerSelectStyles.inputIOS, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                            inputAndroid: { ...pickerSelectStyles.inputAndroid, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                        }}
                        placeholder={{ label: 'Tipo de vivienda...', value: null, }}
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
            <View style={styles.pickerContainer}>
                <View style={styles.pickerItem}>
                    <RNPickerSelect
                        style={{
                            ...pickerSelectStyles,
                            inputIOS: { ...pickerSelectStyles.inputIOS, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                            inputAndroid: { ...pickerSelectStyles.inputAndroid, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                        }}
                        placeholder={{ label: 'Espacio disponible...', value: null, }}
                        value={formData.espacio_dispo_user}
                        onValueChange={(value) => handleInputChange('espacio_dispo_user', value)}
                        items={[
                            { label: 'Jardin', value: 'Jardin' },
                            { label: 'Patio', value: 'Patio' },
                            { label: 'Terraza', value: 'Terraza' },
                        ]}
                    />
                </View>
                <View style={styles.pickerItem}>
                    <RNPickerSelect
                        style={{
                            ...pickerSelectStyles,
                            inputIOS: { ...pickerSelectStyles.inputIOS, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                            inputAndroid: { ...pickerSelectStyles.inputAndroid, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                        }}
                        placeholder={{ label: 'Capacidad económica...', value: null, }}
                        value={formData.economia_user}
                        onValueChange={(value) => handleInputChange('economia_user', value)}
                        items={[
                            { label: 'Mala', value: 'Mala' },
                            { label: 'Regular', value: 'Regular' },
                            { label: 'Buena', value: 'Buena' },
                            { label: 'Muy Buena', value: 'Muy Buena' },
                        ]}
                    />
                </View>
            </View>
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
            <View style={styles.pickerContainer}>
                <View style={styles.pickerItem}>
                    <RNPickerSelect
                        style={{
                            ...pickerSelectStyles,
                            inputIOS: { ...pickerSelectStyles.inputIOS, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                            inputAndroid: { ...pickerSelectStyles.inputAndroid, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                        }}
                        placeholder={{ label: 'Departamento...', value: null, }}
                        value={formData.departamento}
                        onValueChange={handleDepartamentoChange}
                        items={departamentos.map(dep => ({ label: dep.nombre_depar, value: dep.pk_id_depar }))}
                    />
                </View>
                <View style={styles.pickerItem}>
                    <RNPickerSelect
                        style={{
                            ...pickerSelectStyles,
                            inputIOS: { ...pickerSelectStyles.inputIOS, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                            inputAndroid: { ...pickerSelectStyles.inputAndroid, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                        }}
                        placeholder={{ label: 'Municipio...', value: null, }}
                        value={formData.fk_id_municipio}
                        onValueChange={(value) => handleInputChange('fk_id_municipio', value)}
                        items={municipios.map(mun => ({ label: mun.nombre_muni, value: mun.pk_id_muni }))}
                    />
                </View>
            </View>
            <LinkBoton
                press={handleSubmit}
                text={mode === "create" ? "Registrarme" : "Actualizar"}
                styles={styles.boton}
            />
            {mode === "create" && (
                <View style={styles.loginPrompt}>
                    <Text style={styles.promptText}>¿Ya tienes una cuenta?</Text>
                    <Text style={styles.loginLink} onPress={ahoraIniciar}>Iniciar sesión.</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#FDFFFE",
    },
    boton: {
        backgroundColor: '#000',
        fontSize: 15
    },
    title: {
        fontSize: 40,
        marginVertical: 35
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
        width: '45%',
    },
    loginPrompt: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
    },
    promptText: {
        fontSize: 16,
        color: 'black',
    },
    loginLink: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline'
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

export default FormUserPage;
