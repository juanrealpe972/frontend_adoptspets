import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinkBoton from '../components/atoms/button/linkboton';
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
        fk_id_municipio: '',
        fk_id_departamento: ''
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
                    setFormData({
                        pk_id_user: String(idUser.pk_id_user),
                        nombre_user: idUser.nombre_user,
                        email_user: idUser.email_user,
                        password_user: '',
                        telefono_user: String(idUser.telefono_user),
                        ubicacion_user: idUser.ubicacion_user,
                        tipo_vivienda_user: idUser.tipo_vivienda_user,
                        espacio_dispo_user: idUser.espacio_dispo_user,
                        canti_mas_hogar_user: String(idUser.canti_mas_hogar_user),
                        horas_en_casa_user: String(idUser.horas_en_casa_user),
                        experiencia_user: idUser.experiencia_user,
                        disponibilidad_user: String(idUser.disponibilidad_user),
                        economia_user: idUser.economia_user,
                        fk_id_municipio: String(idUser.fk_id_municipio),
                        fk_id_departamento: String(idUser.fk_id_depar)
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
        let data;
        if (mode === "create") {
            data = {
                pk_id_user: formData.pk_id_user,
                nombre_user: formData.nombre_user,
                email_user: formData.email_user,
                password_user: formData.password_user,
                telefono_user: formData.telefono_user,
                ubicacion_user: formData.ubicacion_user,
                tipo_vivienda_user: formData.tipo_vivienda_user,
                espacio_dispo_user: formData.espacio_dispo_user,
                canti_mas_hogar_user: formData.canti_mas_hogar_user,
                horas_en_casa_user: formData.horas_en_casa_user,
                experiencia_user: formData.experiencia_user,
                disponibilidad_user: formData.disponibilidad_user,
                economia_user: formData.economia_user,
                fk_id_municipio: formData.fk_id_municipio
            };
        } else if (mode === "update") {
            data = {
                pk_id_user: formData.pk_id_user,
                nombre_user: formData.nombre_user,
                email_user: formData.email_user,
                telefono_user: formData.telefono_user,
                ubicacion_user: formData.ubicacion_user,
                tipo_vivienda_user: formData.tipo_vivienda_user,
                espacio_dispo_user: formData.espacio_dispo_user,
                canti_mas_hogar_user: formData.canti_mas_hogar_user,
                horas_en_casa_user: formData.horas_en_casa_user,
                experiencia_user: formData.experiencia_user,
                disponibilidad_user: formData.disponibilidad_user,
                economia_user: formData.economia_user,
                fk_id_municipio: formData.fk_id_municipio,
            };
        }
    
        try {
            if (mode === "create") {
                const response = await axiosClient.post(`/v1/users`, data);
                Alert.alert("Éxito", response.data.message);
                navigation.navigate('FirstPage');
            } else if (mode === "update") {
                const response = await axiosClient.put(`/v1/users/${idUser.pk_id_user}`, data);
                Alert.alert("Éxito", response.data.message);
                navigation.navigate('Visitante');
            } else {
                Alert.alert("Error", "No se pudo realizar la operación");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            Alert.alert("Error", "Error en el servidor: " + error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{mode === "create" ? "Registrarme" : "Actualizar Usuario"}</Text>
            <Text style={styles.label}>Cedula:</Text>
            <TextInput
                style={styles.input}
                placeholder="Cedula"
                value={formData.pk_id_user}
                onChangeText={(value) => handleInputChange('pk_id_user', value)}
                keyboardType="phone-pad"
            />
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={formData.nombre_user}
                onChangeText={(value) => handleInputChange('nombre_user', value)}
            />
            <Text style={styles.label}>Gmail:</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email_user}
                onChangeText={(value) => handleInputChange('email_user', value)}
                keyboardType="email-address"
            />
            <Text style={styles.label}>Telefono:</Text>
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={formData.telefono_user}
                onChangeText={(value) => handleInputChange('telefono_user', value)}
                keyboardType="phone-pad"
            />
            {mode === "create" && (
                <>
                    <Text style={styles.label}>Contraseña:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        value={formData.password_user}
                        onChangeText={(value) => handleInputChange('password_user', value)}
                        secureTextEntry
                    />
                </>
            )}
            <View style={styles.pickerContainer}>
                <View style={styles.pickerItem}>
                    <Text style={styles.label}>Experiencia:</Text>
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
                    <Text style={styles.label}>Horas disponibles:</Text>
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
                    <Text style={styles.label}>Ubicación:</Text>
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
                    <Text style={styles.label}>Vivienda:</Text>
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
                    <Text style={styles.label}>Espacio disponible:</Text>
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
                    <Text style={styles.label}>Economia:</Text>
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
                    <Text style={styles.label}>¿Mas mascotas en casa?:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Cantidad de mascotas en el hogar"
                        value={formData.canti_mas_hogar_user}
                        onChangeText={(value) => handleInputChange('canti_mas_hogar_user', value)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.pickerItem}>
                    <Text style={styles.label}>Horas en casa:</Text>
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
                    <Text style={styles.label}>Departamento:</Text>
                    <RNPickerSelect
                        style={{
                            ...pickerSelectStyles,
                            inputIOS: { ...pickerSelectStyles.inputIOS, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                            inputAndroid: { ...pickerSelectStyles.inputAndroid, height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10, },
                        }}
                        placeholder={{ label: 'Departamento...', value: null, }}
                        value={formData.fk_id_departamento}
                        onValueChange={handleDepartamentoChange}
                        items={departamentos.map(dep => ({ label: dep.nombre_depar, value: dep.pk_id_depar }))}
                    />
                </View>
                <View style={styles.pickerItem}>
                    <Text style={styles.label}>Municipio:</Text>
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
        paddingHorizontal:25,
        backgroundColor: "#FDFFFE",
        paddingBottom:20
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        textAlign:"left"
    },
    boton: {
        backgroundColor: '#000',
        fontSize: 15
    },
    title: {
        fontSize: 40,
        marginVertical: 45,
        textAlign:"center"
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
        width: '48%',
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
