/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createNativeStackNavigator();

const App= () => {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerStyle: {
            backgroundColor: '#ffb700',
          },
        }}/>
        <Stack.Screen name="Detail" component={DetailScreen} options={{
          headerStyle: {
            backgroundColor: '#ffb700',
          },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
