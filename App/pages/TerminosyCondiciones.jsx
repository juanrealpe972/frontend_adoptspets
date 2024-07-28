import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TerminosyCondiciones = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Términos y Condiciones</Text>
      <Text style={styles.text}>
        Estos términos y condiciones describen las reglas y regulaciones para el uso de nuestra aplicación.
      </Text>
      <Text style={styles.subHeader}>1. Introducción</Text>
      <Text style={styles.text}>
        Al acceder a esta aplicación asumimos que aceptas estos términos y condiciones. No continúes utilizando la aplicación si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
      </Text>
      <Text style={styles.subHeader}>2. Licencia</Text>
      <Text style={styles.text}>
        A menos que se indique lo contrario, nosotros y/o nuestros licenciantes poseemos los derechos de propiedad intelectual de todo el material en la aplicación. Todos los derechos de propiedad intelectual están reservados.
      </Text>
      <Text style={styles.subHeader}>3. Uso de la Aplicación</Text>
      <Text style={styles.text}>
        - No debes: Reproducir, duplicar o copiar material de la aplicación.
        {'\n'}- Redistribuir contenido de nuestra aplicación.
      </Text>
      <Text style={styles.subHeader}>4. Enlaces a otros Sitios Web</Text>
      <Text style={styles.text}>
        Nuestra aplicación puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados por nosotros. No tenemos control sobre, y no asumimos responsabilidad por el contenido, las políticas de privacidad o las prácticas de sitios web de terceros.
      </Text>
      <Text style={styles.subHeader}>5. Cambios a los Términos y Condiciones</Text>
      <Text style={styles.text}>
        Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: 'black',
  },
});

export default TerminosyCondiciones;
