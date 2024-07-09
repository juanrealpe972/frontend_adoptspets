import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PerfilScreen from '../components/templates/perfil';
import Home from '../components/templates/Home';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import iconSub from '../resources/logo_adoptpets.jpg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const TabNavigationCom = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'rgb(191, 174, 103)', 
        tabBarInactiveTintColor: 'grey',
        tabBarActiveBackgroundColor: 'rgba(57, 168, 0, 0.1)',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'house';
            return <FontAwesome6 name={iconName} size={size} color={color} />;
          } else if (route.name === 'Perfil') {
            iconName = 'person-circle-sharp';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {color: '#FFF'},
          headerTitle: () => (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 26,
                  fontWeight: 'bold',
                }}>
                ADOPTSPETS
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#FFF',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 5,
          },
          headerTitleStyle: {color: 'black', fontSize: 25, fontWeight: 'bold'},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{marginLeft: 16}}
            >
              <MaterialIcons name="menu" size={28} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Perfil')}
              style={{marginRight: 16}}
            >
              <Image
                source={iconSub}
                style={{width: 40, height: 40, marginLeft: 6}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-circle-sharp" size={34} color={color} />
          ),
          tabBarLabelStyle: {color: '#FFF'},
          headerTitle: 'Perfil',
          headerStyle: {
            backgroundColor: '#FFF',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 5,
          },
          headerTitleStyle: {color: 'black', fontSize: 25, fontWeight: 'bold'},
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigationCom;
