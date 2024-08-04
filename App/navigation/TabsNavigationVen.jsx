import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity, View, Text } from "react-native";
import ListIcon from "../icons/ListIcon";
import HouseIcon from "../icons/HouseIcon";
import PersonIcon from "../icons/PersonIcon";

import iconSub from '../resources/logo_adoptpets.jpg';
import SideBar from "./SideBar";
import Home from "../pages/Home";
import MiProfile from "../pages/MiProfile";

const Tab = createBottomTabNavigator();

const TabNavigationVen = () => {
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
            if (route.name === 'ADOPTS PETS') {
              return <HouseIcon size={size} color={color} />;
            } else if (route.name === 'Perfil') {
              return <PersonIcon size={size} color={color} />;
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
                  <ListIcon size={26} color="#FFF" />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold' }}>
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
          component={MiProfile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <PersonIcon size={34} color={color} />
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
