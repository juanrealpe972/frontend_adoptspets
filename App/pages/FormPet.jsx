import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const FormPet = () => {
    const [form, setForm] = useState({
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
        imagen_pet: '',
        fk_adoptante: ''
    });

    const handleInputChange = (name, value) => {
        setForm({ ...form, [name]: value });
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
                <TextInput
                    style={styles.input}
                    value={form.vacunacion_mas}
                    onChangeText={(text) => handleInputChange('vacunacion_mas', text)}
                />
                <Text style={styles.label}>Esterilización/Castración</Text>
                <TextInput
                    style={styles.input}
                    value={form.esterilizacion_castracion_mas}
                    onChangeText={(text) => handleInputChange('esterilizacion_castracion_mas', text)}
                />
                <Text style={styles.label}>Enfermedades</Text>
                <TextInput
                    style={styles.input}
                    value={form.enfermedades_mas}
                    onChangeText={(text) => handleInputChange('enfermedades_mas', text)}
                />
                <Text style={styles.label}>Tratamientos</Text>
                <TextInput
                    style={styles.input}
                    value={form.tratamientos_mas}
                    onChangeText={(text) => handleInputChange('tratamientos_mas', text)}
                />
                <Text style={styles.label}>Energía</Text>
                <TextInput
                    style={styles.input}
                    value={form.energia_mas}
                    onChangeText={(text) => handleInputChange('energia_mas', text)}
                />
                <Text style={styles.label}>Compatibilidad</Text>
                <TextInput
                    style={styles.input}
                    value={form.compatibilidad_mas}
                    onChangeText={(text) => handleInputChange('compatibilidad_mas', text)}
                />
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
                <TextInput
                    style={styles.input}
                    value={form.condiciones_estado_mas}
                    onChangeText={(text) => handleInputChange('condiciones_estado_mas', text)}
                />
                <Text style={styles.label}>Tiempo en Refugio</Text>
                <TextInput
                    style={styles.input}
                    value={form.tiempo_en_refugio_mas}
                    onChangeText={(text) => handleInputChange('tiempo_en_refugio_mas', text)}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>Género</Text>
                <TextInput
                    style={styles.input}
                    value={form.genero_mas}
                    onChangeText={(text) => handleInputChange('genero_mas', text)}
                />
                <Text style={styles.label}>Estado</Text>
                <TextInput
                    style={styles.input}
                    value={form.estado_mas}
                    onChangeText={(text) => handleInputChange('estado_mas', text)}
                />
                <Text style={styles.label}>Raza</Text>
                <TextInput
                    style={styles.input}
                    value={form.fk_raza_mas}
                    onChangeText={(text) => handleInputChange('fk_raza_mas', text)}
                />
                <Text style={styles.label}>Imagen</Text>
                <TextInput
                    style={styles.input}
                    value={form.imagen_pet}
                    onChangeText={(text) => handleInputChange('imagen_pet', text)}
                />
                <Text style={styles.label}>Adoptante</Text>
                <TextInput
                    style={styles.input}
                    value={form.fk_adoptante}
                    onChangeText={(text) => handleInputChange('fk_adoptante', text)}
                />
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
    }
});

export default FormPet;
