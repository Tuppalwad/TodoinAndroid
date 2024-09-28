import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size="small" color="#fff" />
      <Text style={styles.text}>Loading</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Light dark background
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
  },
});
