import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, Text, Alert, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Search from './components/search'
import Main from './components/main'
import ViewExercise from './components/viewExercise'
import Categories from './components/categories'
import Category from './components/category'
import Muscles from './components/muscles'
import Muscle from './components/muscle'
import Favorites from './components/favorites'
const Stack = createStackNavigator();
export default function App() {


  return (
    <NavigationContainer theme={NavigatorTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Muscles" component={Muscles} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name='View exercise' component={ViewExercise} />
        <Stack.Screen name='Exercises in category' component={Category} />
        <Stack.Screen name='Exercises by muscle' component={Muscle} />
        <Stack.Screen name='Favorites' component={Favorites} />

      </Stack.Navigator>
    </NavigationContainer>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const NavigatorTheme = {
  dark: false,
  transparentCard: true,
  colors: {
    primary: 'rgb(255, 255, 255)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(255, 255, 255)',
    notification: 'rgb(255, 69, 58)',
  },
};