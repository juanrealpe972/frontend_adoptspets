import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilScreen = () => {
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const ip = "http://192.168.1.4:3000";
  const id = 1084251889;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${ip}/v1/user/${id}`);
        if (response.data && response.data.data.length > 0) {
          setUserData(response.data.data[0]);
        }

        const jsonValue = await AsyncStorage.getItem('usuarios');
        if (jsonValue != null) {
          setCurrentUser(JSON.parse(jsonValue));
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
        <TouchableOpacity style={styles.updateButton}>
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
          source={require('../../resources/logo_adoptpets.jpg')}
          resizeMode="cover"
          style={styles.headerImage}
        />
      </View>

      <View style={styles.contentContainer}>
        <Image
          source={require('../../resources/logo_adoptpets.jpg')}
          resizeMode="contain"
          style={styles.profileImage}
        />

        <Text style={styles.nameText}>{userData.nombre_user || "Nombre no disponible"}</Text>
        <Text style={styles.infoText}>{userData.tipo_vivienda_user || "Tipo de vivienda no disponible"}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{userData.ubicacion_user || "Ubicación no disponible"}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.canti_mas_hogar_user || 0}</Text>
            <Text style={styles.statLabel}>Mascotas en el hogar</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.horas_en_casa_user || 0}</Text>
            <Text style={styles.statLabel}>Horas en casa</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.economia_user || "No disponible"}</Text>
            <Text style={styles.statLabel}>Economía</Text>
          </View>
        </View>

        {renderUpdateButton()}
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.additionalInfoText}>
            <Text style={styles.additionalInfoLabel}>Teléfono:</Text>
            <Text style={styles.additionalInfoValue}>{userData.telefono_user || "Teléfono no disponible"}</Text>
          </Text>
          <Text style={styles.additionalInfoText}>
            <Text style={styles.additionalInfoLabel}>Correo electrónico:</Text>
            <Text style={styles.additionalInfoValue}>{userData.email_user || "Correo electrónico no disponible"}</Text>
          </Text>
          <Text style={styles.additionalInfoText}>
            <Text style={styles.additionalInfoLabel}>Espacio disponible:</Text>
            <Text style={styles.additionalInfoValue}>{userData.espacio_dispo_user || "Espacio disponible no disponible"}</Text>
          </Text>
          <Text style={styles.additionalInfoText}>
            <Text style={styles.additionalInfoLabel}>Experiencia:</Text>
            <Text style={styles.additionalInfoValue}>{userData.experiencia_user || "Experiencia no disponible"}</Text>
          </Text>
          <Text style={styles.additionalInfoText}>
            <Text style={styles.additionalInfoLabel}>Disponibilidad:</Text>
            <Text style={styles.additionalInfoValue}>{userData.disponibilidad_user || "Disponibilidad no disponible"}</Text>
          </Text>
          <Text style={styles.additionalInfoText}>
            <Text style={styles.additionalInfoLabel}>Rol:</Text>
            <Text style={styles.additionalInfoValue}>{userData.rol_user || "Rol no disponible"}</Text>
          </Text>
          <Text style={styles.additionalInfoText}>
            <Text style={styles.additionalInfoLabel}>Municipio:</Text>
            <Text style={styles.additionalInfoValue}>{userData.fk_id_municipio || "Municipio no disponible"}</Text>
          </Text>
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
    color: "blue",
    marginVertical: 8,
  },
  infoText: {
    color: "black",
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: "row",
    marginVertical: 6,
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  statItem: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 12,
  },
  statValue: {
    fontSize: 24,
    color: "blue",
  },
  statLabel: {
    fontSize: 16,
    color: "blue",
  },
  updateButton: {
    width: 180,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    borderRadius: 10,
    marginVertical: 2,
  },
  updateButtonText: {
    fontSize: 16,
    color: "white",
  },
  additionalInfoText: {
    fontSize: 16,
    color: "black",
    marginVertical: 4,
  },
  additionalInfoContainer: {
    marginTop: 6,
    backgroundColor: "#f5f5f5",
    padding: 2,
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
  additionalInfoText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 8,
  },
  additionalInfoLabel: {
    fontWeight: "bold",
    marginRight: 4,
  },
  additionalInfoValue: {
    color: "#666",
  },
});

export default PerfilScreen;