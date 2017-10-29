import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ListView,
  StatusBar,
  TextInput,
  Button,
  ToastAndroid
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import LoginPage from './LoginPage';
import MainPage from './MainPage';


const Navigation = StackNavigator({
  First: {screen: LoginPage},
  Second: {screen: MainPage},
});


export default Navigation;