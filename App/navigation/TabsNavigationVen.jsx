import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import iconNoti from "../resources/notificacionesIcono.png"
import iconSub from '../resources/logo_adoptpets.jpg';
import SideBar from "./SideBar";
import PerfilPage from "../pages/PerfilPage";
import Home from "../pages/Home";

const Tab = createBottomTabNavigator();

const TabNavigationVen = () => {
  const navigation = useNavigation();
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#E89551',
          tabBarInactiveTintColor: 'grey',
          tabBarActiveBackgroundColor: 'rgba(22, 16, 0, 0.1)',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'ADOPTS PETS') {
              iconName = 'house';
              return <FontAwesome6 name={iconName} size={size} color={color} />;
            } else if (route.name === 'Perfil') {
              iconName = 'person-circle-sharp';
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen
          name="ADOPTS PETS"
          component={Home}
          options={{
            tabBarLabel: 'ADOPTS PETS',
            tabBarLabelStyle: { color: '#FFF' },
            headerStyle: { backgroundColor: '#E89551' },
            headerTitleContainerStyle: { flex: 1, justifyContent: 'center' },
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                <TouchableOpacity onPress={() => setIsSideBarVisible(true)}>
                  <Feather name="list" size={26} color="#FFF" />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ color:'#FFF', fontSize: 26, fontWeight: 'bold' }}>
                    ADOPTS PETS
                  </Text>
                </View>
              </View>
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                <Image
                  source={iconSub}
                  style={{ width: 40, height: 40, marginLeft: 6, borderRadius: 10000 }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={PerfilPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='person-circle-sharp' size={34} color={color} />
            ),
            tabBarLabelStyle: { color: '#FFF' }, 
            headerTitle: 'Perfil', 
            headerStyle: { backgroundColor: '#E89551' },
            headerTitleStyle: { color: '#FFF' , fontSize:25, fontWeight:'bold'}, 
          }}
        />
      </Tab.Navigator>
      <SideBar visible={isSideBarVisible} onClose={() => setIsSideBarVisible(false)} /> 
    </>
  );
};

export default TabNavigationVen;
