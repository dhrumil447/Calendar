import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DateCard from './DateCard';
import CalendarHome from './CalendarHome';
import CalendarScreen from './CalendarScreen';

const Stack = createStackNavigator();



const Router = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="CalendarHome">
      <Stack.Screen name="CalendarHome" component={CalendarHome} options={{ headerShown: false }} />
      <Stack.Screen name="DateCard" component={DateCard} options={{ headerShown: false }} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Router;