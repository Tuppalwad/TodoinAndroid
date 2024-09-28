// AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from '../auth/SignInScreen';
import OtpScreen from '../auth/OtpScreen';
import HomeScreen from '../screens/HomeScreen';
import Splash from '../components/Splash';
import ViewDetails from '../components/ViewDetails';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="SendOTP" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Vefify" component={OtpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ViewDetails" component={ViewDetails} options={{headerShown:true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
