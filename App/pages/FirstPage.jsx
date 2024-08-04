import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuthContext } from '../context/AuthContext';
import LoginPage from './LoginPage';
import LinkBoton from '../components/atoms/LinkBoton';

export default function FirstPage() {
  const { setLoginUser, loginUser } = useAuthContext();
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserAndToken = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('usuario');

      if (token && user) {
        navigation.navigate("Visitante");
      }
    };

    checkUserAndToken();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          ADOPTS PETS
        </Text>
        <Image
          source={require('../resources/logo_adoptpets.jpg')}
          style={styles.logo}
        />
        <Text style={styles.customSubtitle}>
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
    fontWeight: '700',
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
    fontSize: 20,
    fontWeight: '500',
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
