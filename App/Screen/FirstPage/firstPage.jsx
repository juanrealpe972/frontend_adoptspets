import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Text, Image} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import LinkBoton from '../../components/atoms/button/linkboton';
import checkConnectivity from '../../components/error/errorHandler';
import {Typography} from '../../components/atoms/Typography/textGlobal';
import LoginScreen from '../LoginScreen';

export default function FirstPage() {
  const [loginVisible, setLoginVisible] = useState(null);

  useEffect(() => {
    const onConnected = () => console.log('conectado a internet');
    const onDisconnected = () => {
      Alert.alert('Sin Conexion', 'Conectese a internet nuevamente');
      console.log('sin conexion');
    };
    const unsubscribe = checkConnectivity(onConnected, onDisconnected);
    return () => unsubscribe();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setLoginVisible(false);
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[Typography.subtitle, styles.title]}>
          ADOPTS PETS
        </Text>
        <Image
          source={require('../../resources/logo_adoptpets.jpg')}
          style={styles.logo}
        />
        <Text style={[Typography.subtitle, styles.customSubtitle]}>
          Adopts Pets es una aplicación para que puedas adoptar la mascota de tu gusto de manera fácil y rápida.
        </Text>
        <View style={styles.footer}>
          <LinkBoton press={() => setLoginVisible(true)} text={'Iniciar Sesión'} />
          {loginVisible && (
            <LoginScreen
              visible={true}
              onClose={() => setLoginVisible(false)}
            />
          )}
        </View>
        <View style={styles.footer1}>
          <LinkBoton press={() => setLoginVisible(true)} text={'Registrarse'} />
          {loginVisible && (
            <LoginScreen
              visible={true}
              onClose={() => setLoginVisible(false)}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFFE',
  },
  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 65,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 185,
  },
  customSubtitle: {
    color: 'black',
    marginBottom: '90%',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 170,
  },
  footer1: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 100,
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 5,
  },
});
