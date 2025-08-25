import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarHome from './CalendarHome';
import CalendarScreen from './CalendarScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';


const Stack = createStackNavigator();



const Router = () => (
   <SafeAreaView style={styles.container}>
  <NavigationContainer>
    <Stack.Navigator initialRouteName="CalendarHome">
      <Stack.Screen name="CalendarHome" component={CalendarHome} options={{ headerShown: false }} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff', // A softer, more neutral background
  },
  scrollViewContent: {
    padding: 16,
  },
});
export default Router;