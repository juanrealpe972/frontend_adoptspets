import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const LinkBoton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.boton}
        onPress={props.press}
      >
        {props.style}
        <Text style={styles.texto}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LinkBoton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20, 
  },
  boton: {
    width: 220,
    height: "auto",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#E89551',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  texto: {
    color: '#001528',
    fontSize: 25,
    fontWeight: '500',
    textAlign: "center"
  }
});
