import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
//import { List, ListItem } from 'react-native-elements';



const mockedList = [
    {
        name: 'Volvo',
        model: 'XC90'
    },
    {
        name: 'Audi',
        model: 'R8'
    },
]


export default class MainPage extends Component {
    constructor() {
        super();
       
      }
    
      render() {
        return (
            <View>
                <Text>REACT from external component</Text> 
            </View>
        );
      }
}
//  <Text>React Native er no DRITT!</Text>