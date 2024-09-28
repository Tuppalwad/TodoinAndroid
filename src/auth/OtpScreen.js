import React, { useState, useEffect, useRef } from 'react';
import { View, PermissionsAndroid, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import RNOtpVerify from 'react-native-otp-verify';
import { auth } from '../services';
import {verifyToken} from '../utils'

const OtpScreen = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const [buttonClicked, setButtonClicked] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [resendEnabled, setResendEnabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const otpInputs = useRef([]);

  useEffect(() => {
    const requestSMSPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            {
              title: 'SMS Permission',
              message: 'This app needs access to your SMS messages to automatically fill OTP.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            SetAutofillOTP();
          } else {
            console.log('SMS permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestSMSPermission();
  }, []);

  useEffect(() => {
    let interval;
    if (!resendEnabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendEnabled(true);
      setTimer(30); // Reset timer for next use
    }
    return () => clearInterval(interval);
  }, [resendEnabled, timer]);

  const SetAutofillOTP = async () => {
    RNOtpVerify.getHash().then((hash) => {
      console.log('Hash: ', hash);
    });

    RNOtpVerify.getOtp()
      .then(p =>
        RNOtpVerify.addListener(message => {
          console.log(message);
          try {
            if (message) {
              const otp = /(\d{4})/g.exec(message)[1];
              setOtp(otp.split(''));
              otpInputs.current[otp.length - 1].focus();
            }
          } catch (error) {
            console.log(error);
          }
        })
      )
      .catch(p => console.log(p));
  };

  const handleVerifyOtp = async () => {
    if (otp.includes('')) {
      setSnackbarMessage('Please enter a valid OTP');
      setVisible(true);
      return;
    }

    setButtonClicked(true);
    try {
      const phone = "+91" + phoneNumber;
      const res = await auth.verifyOTP(phone, otp.join(''));
      if (res.status === 200) {
        await async.setStringAsync('token', res.token);
        const decode = verifyToken(res.token)
        await async.setStringAsync('user',decode.id)
        navigation.navigate('HomeScreen');
        setButtonClicked(false);
      }
      else {
        setSnackbarMessage('Invalid OTP',);
        setVisible(true);
        setButtonClicked(false);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setSnackbarMessage('Error verifying OTP');
      setVisible(true);
      setButtonClicked(false);
    }
  };

  const handleResendOtp = async () => {
    setResendEnabled(false);
    try {
      const phone = "+91" + phoneNumber;
      await auth.sendOTP(phone);
      setTimer(30); // Reset the timer for the next resend
    } catch (error) {
      console.error('Error resending OTP:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(text) => {
              const newOtp = [...otp];
              newOtp[index] = text;
              setOtp(newOtp);
              if (text && index < otpInputs.current.length - 1) {
                otpInputs.current[index + 1].focus();
              }
            }}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            ref={(ref) => otpInputs.current[index] = ref}
          />
        ))}
      </View>
      {visible ? <Text style={{ color: 'red', marginHorizontal: 4, paddingVertical: 5 }}>{snackbarMessage}</Text> : null}
      <Button
        mode="contained"
        onPress={handleVerifyOtp}
        style={styles.button}
        loading={buttonClicked}
        disabled={buttonClicked}
      >
        Verify OTP
      </Button>
      <Button
        mode="outlined"
        onPress={handleResendOtp}
        style={styles.button}
        disabled={!resendEnabled}
      >
        Resend OTP
      </Button>
      {!resendEnabled && <Text style={styles.timerText}>Resend OTP in {timer}s</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    marginBottom: 50,
    alignSelf: 'center',
    color: '#000000',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
  },
  timerText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#000',
  },
});

export default OtpScreen;
