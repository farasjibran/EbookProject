/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import LoginScreen from './src/screen/authcomponents/LoginScreen';
import RegisterScreen from './src/screen/authcomponents/RegisterScreen';
import {ToastProvider} from 'react-native-toast-notifications';
import {LogBox} from 'react-native';
import MyTabs from './src/screen/components/MyTabs';

const App: () => Node = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const Stack = createStackNavigator();

  // Ignore Log Box
  LogBox.ignoreAllLogs();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  if (initializing) {
    return null;
  }

  console.log(user);

  return (
    <PaperProvider>
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {user == null ? (
              <>
                <Stack.Screen name="SignIn" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={RegisterScreen} />
              </>
            ) : (
              <Stack.Screen name="MyTabs" component={MyTabs} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </PaperProvider>
  );
};

export default App;
