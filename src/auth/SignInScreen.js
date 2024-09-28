import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import { auth } from '../services';

const SignInScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    const regx = /^[6-9]\d{9}$/; // Simplified regex for Indian phone numbers
    if (!regx.test(phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }
    if (phoneNumber === '') {
      setError('Please enter phone number');
      return;
    }
    try {
      setLoading(true);
      const phone = "+91" + phoneNumber;
      const response = await auth.sendOTP(phone);
      if (response.status === 200) {
        navigation.navigate('Verify', { phoneNumber });
      }
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>ToDo</Title>
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => {
          setPhoneNumber(text);
          if (error) setError(''); // Clear error on input change
        }}
        keyboardType="phone-pad"
        style={styles.input}
        disabled={loading}
        mode='outlined'
      />
      {error ? <Text style={{ color: 'red', marginHorizontal:4,paddingVertical:5 }}>{error}</Text> : null}
      <Button
        mode="contained"
        onPress={handleSignIn}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        Send OTP
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 5,
  },
  button: {
    marginVertical: 10,
  },
});

export default SignInScreen;
