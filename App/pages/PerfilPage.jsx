import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IP } from "../api/IP";
import { useAuthContext } from "../context/AuthContext";
import { useNavigation } from '@react-navigation/native';

const PerfilPage = () => {
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const { setIdUser } = useAuthContext();
  const navigation = useNavigation();

  const ahoraIniciar = (data) => {
    setIdUser(data);
    navigation.navigate('Registro', { mode: "update" });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('usuario');
        if (jsonValue !== null) {
          const userData = JSON.parse(jsonValue);
          const response = await axios.get(`${IP}/v1/user/${userData.pk_id_user}`);
          if (response.data && response.data.data.length > 0) {
            setUserData(response.data.data[0]);
          }
          setCurrentUser(userData); 
        } else {
          console.log('No se encontraron datos de usuario en AsyncStorage');
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    };
    fetchUserData();
  }, []);

  const renderUpdateButton = () => {
    if (userData.pk_id_user === currentUser.pk_id_user) {
      return (
        <TouchableOpacity style={styles.updateButton} onPress={() => ahoraIniciar(userData)}>
          <Text style={styles.updateButtonText}>Actualizar Perfil</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../resources/fondo_perfil1.png')}
          resizeMode="cover"
          style={styles.headerImage}
        />
      </View>

      <View style={styles.contentContainer}>
        <Image
          source={require('../resources/logo_adoptpets.jpg')}
          resizeMode="contain"
          style={styles.profileImage}
        />

        <Text style={styles.nameText}>{userData.nombre_user || "Nombre no disponible"}</Text>
        {renderUpdateButton()}
        <View style={styles.additionalInfoContainer}>
          <View style={styles.additionalInfoRow}>
            <Text style={styles.additionalInfoText}>
              <Text style={styles.additionalInfoLabel}>Teléfono:</Text>
              <Text style={styles.additionalInfoValue}>{userData.telefono_user || "Teléfono no disponible"}</Text>
            </Text>
            <Text style={styles.additionalInfoText}>
              <Text style={styles.additionalInfoLabel}>Tipo de vivienda:</Text>
              <Text style={styles.additionalInfoValue}>{userData.tipo_vivienda_user || "Vivienda no disponibles"}</Text>
            </Text>
          </View>
          <View style={styles.additionalInfoRow}>
            <Text style={styles.additionalInfoText}>
              <Text style={styles.additionalInfoLabel}>Ubicación:</Text>
              <Text style={styles.additionalInfoValue}>{userData.ubicacion_user || "Ubicación no disponible"}</Text>
            </Text>
            <Text style={styles.additionalInfoText}>
              <Text style={styles.additionalInfoLabel}>Horas en casa:</Text>
              <Text style={styles.additionalInfoValue}>{userData.horas_en_casa_user || "Horas no disponibles"}</Text>
            </Text>
          </View>
          <View style={styles.additionalInfoRow}>
            <Text style={styles.additionalInfoText}>
              <Text style={styles.additionalInfoLabel}>Mascotas en casa:</Text>
              <Text style={styles.additionalInfoValue}>{userData.canti_mas_hogar_user >= 0 ? userData.canti_mas_hogar_user : "No hay disponible"}</Text>
            </Text>
            <Text style={styles.additionalInfoText}>
              <Text style={styles.additionalInfoLabel}>Economía:</Text>
              <Text style={styles.additionalInfoValue}>{userData.economia_user || "Economía no disponible"}</Text>
            </Text>
          </View>
          <Text style={styles.additionalInfoTextEmail}>
            <Text style={styles.additionalInfoLabel}>Correo electrónico:</Text>
            <Text style={styles.additionalInfoValue}>{userData.email_user || "Correo electrónico no disponible"}</Text>
          </Text>
          <View style={styles.additionalInfoRow}>
            <Text style={styles.additionalInfoText}>
              <Text style={styles.additionalInfoLabel}>Rol:</Text>
              <Text style={styles.additionalInfoValue}>{userData.rol_user || "Rol no disponible"}</Text>
            </Text>
            <Text style={styles.additionalInfoText}>
              <Text style={styles.additionalInfoLabel}>Espacio Hogar:</Text>
              <Text style={styles.additionalInfoValue}>{userData.espacio_dispo_user || "Espacio disponible no disponible"}</Text>
            </Text>
          </View>
          <View style={styles.additionalInfoRow}>
            <Text style={styles.additionalInfoText}>
              <Text style={styles.additionalInfoLabel}>Experiencia:</Text>
              <Text style={styles.additionalInfoValue}>{userData.experiencia_user || "Experiencia no disponible"}</Text>
            </Text>
            <Text style={styles.additionalInfoText}>
              <Text style={styles.additionalInfoLabel}>Disponibilidad:</Text>
              <Text style={styles.additionalInfoValue}>{userData.disponibilidad_user || "Disponibilidad no disponible"}</Text>
            </Text>
          </View>
          <View style={styles.additionalInfoRow}>
            <Text style={styles.additionalInfoText}>
              <Text style={styles.additionalInfoLabel}>Municipio:</Text>
              <Text style={styles.additionalInfoValue}>{userData.nombre_muni || "Municipio no disponible"}</Text>
            </Text>
            <Text style={styles.additionalInfoText}>
              <Text style={styles.additionalInfoLabel}>Departamento:</Text>
              <Text style={styles.additionalInfoValue}>{userData.nombre_depar || "Nombre departamento no disponible"}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    width: "100%",
  },
  headerImage: {
    height: 228,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  profileImage: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: "blue",
    borderWidth: 2,
    marginTop: -90,
  },
  nameText: {
    fontSize: 24,
    marginVertical: 8,
  },
  updateButton: {
    width: 180,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06AEF4",
    borderRadius: 10,
    marginVertical: 2,
  },
  updateButtonText: {
    fontSize: 16,
    color: "white",
  },
  additionalInfoContainer: {
    marginTop: 6,
    width: "90%",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  additionalInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  additionalInfoText: {
    fontSize: 16,
    color: "#333",
    width: "48%",
  },
  additionalInfoTextEmail: {
    fontSize: 16,
    color: "#333",
    width: "98%",
  },
  additionalInfoLabel: {
    fontWeight: "bold",
    marginRight: 4,
  },
  additionalInfoValue: {
    color: "#666",
  },
});

export default PerfilPage;
