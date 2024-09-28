import * as React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppNavigator from './src/navigation/AppNavigator';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import { Provider } from "react-redux";
import store from './src/store/store';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
    text: 'black',
  },
};

export default function Main() {
  return (
   <Provider store={store}>
     <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
   </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
