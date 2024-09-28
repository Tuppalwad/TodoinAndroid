import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Avatar, Button, IconButton, Text, useTheme } from 'react-native-paper';
import AddButton from '../../components/AddButton';
const Profile = () => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Avatar.Image size={100} source={{ uri: 'https://via.placeholder.com/150' }} />
        <IconButton
          icon="pencil"
          size={24}
          onPress={() => console.log('Edit Profile')}
          style={styles.editIcon}
        />
      </View>
      <Text style={styles.name}>John Doe</Text>
      <View style={styles.buttonsContainer}>
        <Button
          icon="cog"
          mode="contained"
          onPress={() => console.log('Settings Pressed')}
          style={styles.button}
        >
          Settings
        </Button>
        <Button
          icon="lock"
          mode="contained"
          onPress={() => console.log('Privacy Pressed')}
          style={styles.button}
        >
          Privacy
        </Button>
        <Button
          icon="logout"
          mode="contained"
          onPress={() => console.log('Logout Pressed')}
          style={styles.button}
        >
          Logout
        </Button>
      </View>
      <AddButton />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 30,
  },
  button: {
    marginVertical: 10,
  },
});
