import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./splashScreen";
import FirstPage from "./App/pages/FirstPage.jsx";
import TabNavigationVen from "./App/navigation/TabsNavigationVen.jsx";
import SideBar from "./App/navigation/sidebar.jsx";
import ForgotPassword from "./App/pages/Recuperar-Password.jsx";
import Notificaciones from "./App/pages/Notificaciones.jsx";
import TerminosyCondiciones from "./App/pages/TerminosyCondiciones.jsx";
import Soporte from "./App/pages/Soporte.jsx";
import { UserProvider } from "./App/Api/context/UserContext.jsx";
import LoginPage from "./App/pages/LoginPage.jsx";
import InvitadoPage from "./App/pages/InvitadoPage.jsx";
import RegisterPage from "./App/pages/RegisterPage.jsx";
import ListPetsPage from "./App/pages/ListPetsPage.jsx";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);
  }, []);
    return(
    <>
        <NavigationContainer>
          <UserProvider>
            <Stack.Navigator>
              {isShowSplash ? (
                <Stack.Screen
                  name="Splash"
                  component={SplashScreen}
                  options={{ headerShown: false }}
                />
              ) : (
              <>
                <Stack.Screen
                  name="FirstPage"
                  component={FirstPage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Login"
                  component={LoginPage}
                  options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="Visitante"
                  component={TabNavigationVen}
                  options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="Recuperar-Password"
                  component={ForgotPassword}
                  options={{
                    title:'Recuperar Contraseña',
                    headerStyle: {
                      backgroundColor: '#E89551', 
                    },
                      headerTintColor: 'white', 
                  }}
                /> 
                <Stack.Screen
                  name="Notificaciones"
                  component={Notificaciones}
                  options={{
                    title:'Notificaciones',
                    headerStyle: {
                      backgroundColor: '#E89551', 
                    },
                      headerTintColor: 'white', 
                  }}
                /> 
                <Stack.Screen
                  name="Terminos"
                  component={TerminosyCondiciones}
                  options={{
                    title:'Terminos y Condiciones',
                    headerStyle: {
                      backgroundColor: '#E89551', 
                    },
                      headerTintColor: 'white', 
                  }}
                /> 
                <Stack.Screen
                  name="Pet"
                  component={ListPetsPage}
                  options={{
                    title:'ADOPTS PETS',
                    headerStyle: {
                      backgroundColor: '#E89551', 
                    },
                      headerTintColor: 'white', 
                  }}
                /> 
                <Stack.Screen
                  name="Invitado"
                  component={InvitadoPage}
                  options={{
                    title:'Invitado',
                    headerStyle: {
                      backgroundColor: '#E89551', 
                    },
                      headerTintColor: 'white', 
                  }}
                /> 
                <Stack.Screen
                  name="Soporte"
                  component={Soporte}
                  options={{
                    title:'Soporte',
                    headerStyle: {
                      backgroundColor: '#E89551', 
                    },
                      headerTintColor: 'white', 
                  }}
                /> 
                <Stack.Screen
                  name="Registro"
                  component={RegisterPage}
                  options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="Main"
                  options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                  }}
                >
                  {({ route }) => <SideBar userType={route.params.userType} />}
                </Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </UserProvider>
      </NavigationContainer>
    </>
  );
}

export default App