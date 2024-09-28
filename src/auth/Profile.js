import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { async } from '../utils';
import { useNavigation } from '@react-navigation/native';
const Profile = () => {
    const navigation = useNavigation();
    const handleLogout = async () => {
        try {
            //   await auth.signOut();
            async.removeItem('token');
            navigation.navigate('SendOTP');
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'SignIn' }],
            // });
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <View>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40,
                    color: 'red',
                }}
                onPress={handleLogout}
            >
                logout
            </Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})