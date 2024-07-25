import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomModal from '../components/modal/modal';
import { IP } from '../api/IP';
import { useAuthContext } from '../context/AuthContext';

const LoginPage = ({visible, onClose}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { setIsAuthenticated } = useAuthContext();
  const [formData, setFormData] = useState({
    correo: '',
    password: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Tipo de conexión', state.type);
      console.log('¿Está conectado?', state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          'Sin conexión',
          'Por favor, verifica tu conexión a internet.',
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const Validacion = async () => {
    setIsLoading(true);

    const connectionInfo = await NetInfo.fetch();
    if (!connectionInfo.isConnected) {
      Alert.alert('Sin conexión', 'Por favor, verifica tu conexión a internet');
      setIsLoading(false);
      return;
    }
    if (!formData.correo || !formData.password) {
      Alert.alert('Campos vacíos', 'Por favor, complete todos los campos');
      setIsLoading(false);
      return;
    }
    if (!formData.correo.includes('@')) {
      Alert.alert(
        'Correo inválido',
        'Por favor, ingrese un correo electrónico válido',
      );
      setIsLoading(false);
      return;
    }

    try {
      const baseURL = `${IP}/auth/login`;
      const response = await axios.post(baseURL, formData);
      if (response.status === 200) {
        const {token, user} = response.data;
        if (token && user) {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('usuario', JSON.stringify(user));
          setLoginSuccess(true);
          setIsLoading(false);
          setIsAuthenticated(true);
          navigation.navigate('Visitante');
          Alert.alert('Inicio de sesión exitoso');
        } else {
          throw new Error('Datos de respuesta inválidos');
        }
      } else {
        throw new Error('Usuario no registrado en adopt pets');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      setIsLoading(false);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);

      if (error.response && error.response.status === 400) {
        Alert.alert('Usuario no registrado en adopt pets principal');
        setIsLoading(false);
      } else {
        Alert.alert('404', 'Usuario no registrado 3.1');
        setIsLoading(false);
      }
    }
  };

  if (!loginSuccess) {}
  return (
    <View style={{flex: 1}}>
      <CustomModal visible={visible} onClose={onClose}>
        <View style={styles.formulario}>
          <Text style={styles.titulo}>INICIAR SESIÓN</Text>
          <Text style={styles.etiqueta}>Correo electrónico:</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#999"
            value={formData.correo}
            onChangeText={text => handleInputChange('correo', text)}
            placeholder="Correo electrónico"
          />
          <Text style={styles.etiqueta}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#999"
            value={formData.password}
            onChangeText={text => handleInputChange('password', text)}
            placeholder="Contraseña"
            secureTextEntry={true}
          />
          <View style={{display:"flex", alignItems:"center"}}>
            <TouchableOpacity
              style={styles.boton}
              onPress={Validacion}
              >
              <Text style={styles.texto}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLoading}
        onRequestClose={() => {}}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color="#39A800" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  texto: {
    color: '#001528',
    fontSize: 20,
    fontWeight: '500',
    textAlign: "center"
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'rgba(0,0,0,0.5)',
  },
  formulario: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  etiqueta: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#9c9c9c',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#000',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boton: {
    width: 200,
    height: "auto",
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#E89551',
    borderRadius: 10,
    paddingVertical: 10
  },
});

export default LoginPage;
