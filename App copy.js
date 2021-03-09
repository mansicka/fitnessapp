import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Search from './components/search'

export default function App() {
  const [results, setResults] = useState([]);
  const [searchterm, setSearchterm] = useState('');
  const getSuggestions = () => {
    setSearchterm('bicep');
    setResults(Search(searchterm));
    console.log(results)
  }


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button onPress={getSuggestions} title='Search' />
    </View>
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
