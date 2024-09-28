// Button.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 10, backgroundColor: 'blue', alignItems: 'center' }}>
      <Text style={{ color: 'white' }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
