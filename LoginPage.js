import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    TextInput,
    Button,
    View
} from 'react-native';
//import { StackNavigator } from 'react-navigation';
  
//const util = require('util');



export default class LoginPage extends Component {

    static navigationOptions = {
        title: 'Login screen',
    }


    constructor() {
        super();

        this.login = this.login.bind(this);
    }

    

   
    login() {
        
    }
      
    
      render() {
      var {navigate} = this.props.navigation;
        

        return (
            <View style={{backgroundColor: 'red'}}>
                <Text>LoginPage</Text> 
                <Button 
                    title="Log in"
                    value=""
                    onPress={
                        () => navigate("Second", {name: "Admin"})
                    }
                />
            </View>
        );
      }
}
