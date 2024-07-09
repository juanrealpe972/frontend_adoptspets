import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './App/Screen/LoginScreen.jsx';
import SplashScreen from './splashScreen';
import {useEffect, useState} from 'react';
import FirstPage from './App/Screen/FirstPage/firstPage.jsx';
import TabNavigationCom from './App/navigation/TabsNavigationCom.jsx';
import TabNavigationVen from './App/navigation/TabsNavigationVen.jsx';
import SideBar from './App/navigation/sidebar.jsx';
import OfertaScreen from './App/Screen/OfertaScreen.jsx';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);
  }, []);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {isShowSplash ? (
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
          ) : (
            <>
              <Stack.Screen
                name="FirstPage"
                component={FirstPage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="Visitante"
                component={TabNavigationCom}
                options={{
                  headerShown: false,
                  headerBackTitleVisible: false,
                }}
              /> 
              <Stack.Screen
                name="Administrador"
                component={TabNavigationVen}
                options={{
                  headerShown: false,
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="Ofertar"
                component={OfertaScreen}
                options={{
                  title: 'Ofertar',
                  headerStyle: {
                    backgroundColor: '#FDFFFE',
                  },
                  headerTintColor: 'white',
                }}
              />
              <Stack.Screen
                name="Main"
                options={{
                  headerShown: false,
                  headerBackTitleVisible: false,
                }}>
                {({route}) => <SideBar userType={route.params.userType} />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default App;