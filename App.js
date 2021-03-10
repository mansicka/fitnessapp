import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, Text, Alert, Image, View } from 'react-native';

import Search from './components/search'
import Main from './components/main'
import ViewExercise from './components/viewExercise'
//import ViewExercise from './components/viewExercise-working'
export default function App() {

  return (
    <View>

      <ViewExercise exerciseid='192' />
    </View >
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