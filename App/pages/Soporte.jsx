import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HelpIcon from '../icons/HelpIcon';

const Soporte = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HelpIcon size={40} color="black" />
        <Text style={styles.headerText}>Soporte de la Aplicación</Text>
      </View>
      <Text style={styles.description}>
        Bienvenido al centro de soporte de nuestra aplicación de adopción de mascotas. Aquí podrás encontrar ayuda para resolver cualquier problema que puedas tener.
      </Text>
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
        <Text style={styles.sectionText}>
          - ¿Cómo puedo adoptar una mascota?{'\n'}
          - ¿Cómo puedo registrar una mascota?{'\n'}
          - ¿Cómo puedo actualizar mis datos de usuario?{'\n'}
        </Text>
      </View> */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contacto</Text>
        <Text style={styles.sectionText}>
          Si necesitas más ayuda, no dudes en contactarnos:{'\n'}
          - Email: juan@gmail.com{'\n'}
          - Teléfono: +57 315 787 4593{'\n'}
        </Text>
      </View>
      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Contáctanos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color:"black"
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color:"black"
  },
  section: {
    marginBottom: 20,
    color:"black"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"black"
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 22,
    color:"black"
  },
  contactButton: {
    backgroundColor: '#E89551',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Soporte;
