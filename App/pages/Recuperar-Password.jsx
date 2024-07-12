import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Modal, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import NetInfo from '@react-native-community/netinfo';

import Input from "../components/atoms/inputs/Inputs";
import LinkBoton from "../components/atoms/button/linkboton";
import { IP } from "../Api/context/ip";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ correo: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handlePress = async () => {
    const { correo } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(correo)) {
      Alert.alert("Error", "Por favor ingrese un correo electrónico válido");
      return;
    }

    console.log("Correo ingresado:", correo);

    const connectionInfo = await NetInfo.fetch();
    if (!connectionInfo.isConnected) {
      Alert.alert('Sin conexión', 'Por favor, verifica tu conexión a internet');
      return;
    }

    setIsLoading(true);
    try {
      const baseURL = `${IP}/v1/solicitarCambioContrasena`;
      const response = await axios.post(baseURL, { email_user: correo });

      if (response.status === 200) {
        Alert.alert("Éxito", "Código enviado a tu correo electrónico", [
          { text: "Aceptar", onPress: () => navigation.navigate("VerificarCode") }
        ]);
      } else if (response.status === 404) {
        Alert.alert("Error", "Correo electrónico incorrecto");
      } else {
        Alert.alert("Error", "Error al enviar el código");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      Alert.alert("Error", "Error del servidor");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => {
        setIsLoading(false);
        Alert.alert('Tiempo de espera agotado', 'La solicitud ha tardado más de lo esperado, por favor intentalo de nuevo más tarde.');
      }, 60000);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitud de Cambio de Contraseña</Text>
      <Text style={styles.explicacion}>
        Por favor, ingrese su correo electrónico y presione "Enviar" para solicitar un cambio de contraseña. Se enviará un código de verificación a su correo electrónico registrado.
      </Text>
      <Input
        placeholder="Correo Electrónico"
        value={formData.correo}
        onChangeText={(value) => handleInputChange('correo', value)}
        keyboardType="email-address"
      />
      <LinkBoton press={handlePress} text="Enviar" styles={styles.boton} />
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLoading}
        onRequestClose={() => {}}
      >
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
    padding: 16,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 14,
    textAlign: "center",
    color: "black",
  },
  explicacion: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 30
  },
  boton: {
    marginBottom: 12
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ForgotPassword;
