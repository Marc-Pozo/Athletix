import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function App() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch('http://192.168.1.65:3000/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error(err);
        setMessage('Failed to connect to backend');
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Hello World</Text>
      {message ? <Text>{message}</Text> : <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  }
});
