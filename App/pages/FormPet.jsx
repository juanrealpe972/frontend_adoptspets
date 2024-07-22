import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Picker, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const FormPet = () => {
    const [form, setForm] = useState({
        nombre_mas: '',
        edad_mas: '',
        tamano_mas: '',
        peso_mas: '',
        descripcion_mas: '',
        vacunacion_mas: 'No',
        esterilizacion_castracion_mas: 'No',
        enfermedades_mas: 'No',
        tratamientos_mas: 'No',
        energia_mas: '',
        compatibilidad_mas: 'No',
        habitos_mas: '',
        necesidades_mas: '',
        lugar_rescate_mas: '',
        condiciones_estado_mas: 'Regular',
        tiempo_en_refugio_mas: '',
        genero_mas: 'Macho',
        estado_mas: 'activo',
        fk_raza_mas: '',
        imagen_pet: '',
    });

    const handleInputChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleImagePicker = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const source = { uri: response.assets[0].uri };
                setForm({ ...form, imagen_pet: source.uri });
            }
        });
    };

    const handleSubmit = () => {
        // Aquí puedes manejar el envío del formulario, por ejemplo, realizando una solicitud a tu backend
        console.log(form);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                    style={styles.input}
                    value={form.nombre_mas}
                    onChangeText={(text) => handleInputChange('nombre_mas', text)}
                />
                <Text style={styles.label}>Edad</Text>
                <TextInput
                    style={styles.input}
                    value={form.edad_mas}
                    onChangeText={(text) => handleInputChange('edad_mas', text)}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>Tamaño</Text>
                <TextInput
                    style={styles.input}
                    value={form.tamano_mas}
                    onChangeText={(text) => handleInputChange('tamano_mas', text)}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>Peso</Text>
                <TextInput
                    style={styles.input}
                    value={form.peso_mas}
                    onChangeText={(text) => handleInputChange('peso_mas', text)}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                    style={styles.input}
                    value={form.descripcion_mas}
                    onChangeText={(text) => handleInputChange('descripcion_mas', text)}
                />
                <Text style={styles.label}>Vacunación</Text>
                <Picker
                    selectedValue={form.vacunacion_mas}
                    style={styles.input}
                    onValueChange={(itemValue) => handleInputChange('vacunacion_mas', itemValue)}
                >
                    <Picker.Item label="Si" value="Si" />
                    <Picker.Item label="No" value="No" />
                </Picker>
                <Text style={styles.label}>Esterilización/Castración</Text>
                <Picker
                    selectedValue={form.esterilizacion_castracion_mas}
                    style={styles.input}
                    onValueChange={(itemValue) => handleInputChange('esterilizacion_castracion_mas', itemValue)}
                >
                    <Picker.Item label="Si" value="Si" />
                    <Picker.Item label="No" value="No" />
                </Picker>
                <Text style={styles.label}>Enfermedades</Text>
                <Picker
                    selectedValue={form.enfermedades_mas}
                    style={styles.input}
                    onValueChange={(itemValue) => handleInputChange('enfermedades_mas', itemValue)}
                >
                    <Picker.Item label="Si" value="Si" />
                    <Picker.Item label="No" value="No" />
                </Picker>
                <Text style={styles.label}>Tratamientos</Text>
                <Picker
                    selectedValue={form.tratamientos_mas}
                    style={styles.input}
                    onValueChange={(itemValue) => handleInputChange('tratamientos_mas', itemValue)}
                >
                    <Picker.Item label="Si" value="Si" />
                    <Picker.Item label="No" value="No" />
                </Picker>
                <Text style={styles.label}>Energía</Text>
                <TextInput
                    style={styles.input}
                    value={form.energia_mas}
                    onChangeText={(text) => handleInputChange('energia_mas', text)}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>Compatibilidad</Text>
                <Picker
                    selectedValue={form.compatibilidad_mas}
                    style={styles.input}
                    onValueChange={(itemValue) => handleInputChange('compatibilidad_mas', itemValue)}
                >
                    <Picker.Item label="Si" value="Si" />
                    <Picker.Item label="No" value="No" />
                </Picker>
                <Text style={styles.label}>Hábitos</Text>
                <TextInput
                    style={styles.input}
                    value={form.habitos_mas}
                    onChangeText={(text) => handleInputChange('habitos_mas', text)}
                />
                <Text style={styles.label}>Necesidades</Text>
                <TextInput
                    style={styles.input}
                    value={form.necesidades_mas}
                    onChangeText={(text) => handleInputChange('necesidades_mas', text)}
                />
                <Text style={styles.label}>Lugar de Rescate</Text>
                <TextInput
                    style={styles.input}
                    value={form.lugar_rescate_mas}
                    onChangeText={(text) => handleInputChange('lugar_rescate_mas', text)}
                />
                <Text style={styles.label}>Condiciones de Estado</Text>
                <Picker
                    selectedValue={form.condiciones_estado_mas}
                    style={styles.input}
                    onValueChange={(itemValue) => handleInputChange('condiciones_estado_mas', itemValue)}
                >
                    <Picker.Item label="Mal" value="Mal" />
                    <Picker.Item label="Regular" value="Regular" />
                    <Picker.Item label="Bien" value="Bien" />
                    <Picker.Item label="Muy Bien" value="Muy Bien" />
                </Picker>
                <Text style={styles.label}>Tiempo en Refugio</Text>
                <TextInput
                    style={styles.input}
                    value={form.tiempo_en_refugio_mas}
                    onChangeText={(text) => handleInputChange('tiempo_en_refugio_mas', text)}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>Género</Text>
                <Picker
                    selectedValue={form.genero_mas}
                    style={styles.input}
                    onValueChange={(itemValue) => handleInputChange('genero_mas', itemValue)}
                >
                    <Picker.Item label="Macho" value="Macho" />
                    <Picker.Item label="Hembra" value="Hembra" />
                </Picker>
                <Text style={styles.label}>Estado</Text>
                <Picker
                    selectedValue={form.estado_mas}
                    style={styles.input}
                    onValueChange={(itemValue) => handleInputChange('estado_mas', itemValue)}
                >
                    <Picker.Item label="activo" value="activo" />
                    <Picker.Item label="inactivo" value="inactivo" />
                    <Picker.Item label="espera" value="espera" />
                </Picker>
                <Text style={styles.label}>Raza</Text>
                <TextInput
                    style={styles.input}
                    value={form.fk_raza_mas}
                    onChangeText={(text) => handleInputChange('fk_raza_mas', text)}
                />
                <Text style={styles.label}>Imagen</Text>
                <Button title="Seleccionar Imagen" onPress={handleImagePicker} />
                {form.imagen_pet ? <Image source={{ uri: form.imagen_pet }} style={styles.image} /> : null}
                <Button title="Registrar Mascota" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 15
}
});

export default FormPet;
