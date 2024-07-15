import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, Animated, TouchableWithoutFeedback, Image, Text, TouchableOpacity, Alert } from 'react-native';
import icono from '../resources/logo_adoptpets.jpg';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from 'react-native-vector-icons/Entypo';
import iconNoti from "../resources/notificacionesIcono.png";

const SideBar = ({ visible, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(-300));
  const [selectedButton, setSelectedButton] = useState('');
  const [userAuth, setUserAuth] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -500,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    const getUser = async () => {
      const jsonValue = await AsyncStorage.getItem('usuario');
      const userData = JSON.parse(jsonValue);
      if (userData) {
        setUserAuth(userData);
      }
    }
    getUser();
  }, [visible]);

  const handlePress = (screenName) => {
    navigation.navigate(screenName);
    onClose();
    setSelectedButton(screenName);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert("Cierre de Sesión", "Has cerrado sesión exitosamente.");
      navigation.navigate('FirstPage');
      onClose();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "Hubo un problema al cerrar sesión. Intenta de nuevo.");
    }
  };

  const buttonStyle = (buttonName) => {
    return {
      ...styles.button,
      backgroundColor: selectedButton === buttonName ? '#E89551' : 'transparent',
    };
  };

  const textStyle = (buttonName) => {
    return {
      ...styles.buttonText,
      color: selectedButton === buttonName ? 'white' : 'black',
    };
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
              <View style={styles.imageContainer}>
                <Image
                  source={icono}
                  style={styles.iconImage}
                />
              </View>
              <View style={styles.divider} />
              <TouchableOpacity
                style={buttonStyle('Terminos')}
                onPress={() => handlePress('Terminos')}
              >
                <Ionicons name="newspaper-outline" size={24} color={selectedButton === 'Terminos' ? 'white' : 'black'} style={styles.buttonIcon} />
                <Text style={textStyle('Terminos')}>Terminos y Condiciones</Text>
              </TouchableOpacity>
              {userAuth.rol_user === 'admin' && (
                <TouchableOpacity
                  style={buttonStyle('PetsAdopt')}
                  onPress={() => handlePress('PetsAdopt')}
                >
                  <Image source={iconNoti} style={styles.buttonIcon} />
                  <Text style={textStyle('PetsAdopt')}>Mascotas por adoptar</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={buttonStyle('Soporte')}
                onPress={() => handlePress('Soporte')}
              >
                <Entypo name="tools" size={24} color={selectedButton === 'Soporte' ? 'white' : 'black'} style={styles.buttonIcon} />
                <Text style={textStyle('Soporte')}>Soporte</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color="black" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
  },
  sidebar: {
    width: 310,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconImage: {
    width: 180,
    height: 180,
    margin: 10,
  },
  divider: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 2,
  },
  buttonIcon: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
});

export default SideBar;
