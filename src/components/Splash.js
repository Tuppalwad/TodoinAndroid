import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { async } from '../utils';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  const checkLogin = async () => {
    const token = await async.getStringAsync('token');
    return token ? true : false;
  }

  useEffect(() => {
    const verifyLogin = async () => {
      const isLoggedIn = await checkLogin();
      if (isLoggedIn) {
        navigation.navigate('HomeScreen');
      } else {
        navigation.navigate('SendOTP');
      }
    };

    verifyLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>TODO</Text>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  text: {
    fontSize: 28,
    fontWeight: '600',
    color: '#343a40',
    letterSpacing: 1,
  }
});
