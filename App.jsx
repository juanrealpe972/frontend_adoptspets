import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./splashScreen";
import FirstPage from "./App/pages/FirstPage.jsx";
import TabNavigationVen from "./App/navigation/TabsNavigationVen.jsx";
import SideBar from "./App/navigation/SideBar.jsx";
import ForgotPassword from "./App/pages/Recuperar-Password.jsx";
import Notificaciones from "./App/pages/Notificaciones.jsx";
import TerminosyCondiciones from "./App/pages/TerminosyCondiciones.jsx";
import Soporte from "./App/pages/Soporte.jsx";
import LoginPage from "./App/pages/LoginPage.jsx";
import InvitadoPage from "./App/pages/InvitadoPage.jsx";
import ListPetPage from "./App/pages/ListPetPage.jsx";
import { AuthProvider } from "./App/context/AuthContext";
import FormUserPage from "./App/pages/FormUserPage.jsx";
import FormPet from "./App/pages/FormPet.jsx";
import PetsAdopt from "./App/pages/PetsAdopt.jsx";
import PerfilPage from "./App/pages/PerfilPage.jsx";

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
        <AuthProvider>
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
                  component={ListPetPage}
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
                    title:'ADOPTS PETS',
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
                  component={FormUserPage}
                  options={{
                    title:'Usuario',
                    headerStyle: {
                      backgroundColor: '#E89551', 
                    },
                      headerTintColor: 'white', 
                  }}
                />
                <Stack.Screen
                  name="FormMascota"
                  component={FormPet}
                  options={{
                    title:'Mascota',
                    headerStyle: {
                      backgroundColor: '#E89551', 
                    },
                      headerTintColor: 'white', 
                  }}
                />
                <Stack.Screen
                  name="PetsAdopt"
                  component={PetsAdopt}
                  options={{
                    title:'Mascota por adoptar',
                    headerStyle: {
                      backgroundColor: '#E89551', 
                    },
                      headerTintColor: 'white', 
                  }}
                />
                <Stack.Screen
                  name="Perfil"
                  component={PerfilPage}
                  options={{
                    title:'Perfil',
                    headerStyle: {
                      backgroundColor: '#E89551', 
                    },
                      headerTintColor: 'white', 
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
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}

export default App;