import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Alert, Text, Image } from 'react-native';

import { useAuthContext } from '../context/AuthContext';
import LinkBoton from '../components/atoms/button/linkboton';
import checkConnectivity from '../components/error/errorHandler';
import { Typography } from '../components/atoms/Typography/textGlobal';
import LoginPage from './LoginPage';

export default function FirstPage() {
  const { setLoginUser, loginUser } = useAuthContext()
  const navigation = useNavigation()

  useEffect(() => {
    const onConnected = () => console.log('conectado a internet');
    const onDisconnected = () => {
      Alert.alert('Sin Conexion', 'Conectese a internet nuevamente');
      console.log('sin conexion');
    };
    const unsubscribe = checkConnectivity(onConnected, onDisconnected);
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[Typography.subtitle, styles.title]}>
          ADOPTS PETS
        </Text>
        <Image
          source={require('../resources/logo_adoptpets.jpg')}
          style={styles.logo}
        />
        <Text style={[Typography.subtitle, styles.customSubtitle]}>
          Adopts Pets una aplicación para que puedas adoptar la mascota de tu gusto de manera fácil y rápida.
        </Text>
        <View style={styles.footer}>
          <LinkBoton press={() => setLoginUser(true)} text={'Iniciar Sesión'} />
          {loginUser && (
            <LoginPage
              visible={true}
              onClose={() => setLoginUser(false)}
            />
          )}
        </View>
        <View style={styles.footer1}>
          <LinkBoton press={() => navigation.navigate("Registro", { mode: "create" })} text={'Registrarme'} />
        </View>
        <View style={styles.footer2}>
          <LinkBoton press={() => navigation.navigate("Invitado")} text={'Ingresar como invitado'} />
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
    fontSize: 55,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 120,
  },
  customSubtitle: {
    color: 'black',
    marginBottom: '85%',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 180,
  },
  footer1: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 120,
  },
  footer2: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 27,
  },
  logo: {
    width: 300,
    height: 300,
  },
});
