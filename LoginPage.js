import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    TextInput,
    View,
    Button,
    StatusBar
} from 'react-native';




export default class LoginPage extends Component {

    static navigationOptions = {
        title: 'Login screen',
    }


    constructor() {
        super();

    }

    
      render() {
      var {navigate} = this.props.navigation;
        

        return (
            <View>
               
                <StatusBar hidden />


                <TextInput style={{justifyContent: 'center'}}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    placeholder={"Username..."}
                />
                <TextInput style={{justifyContent: 'center'}}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    placeholder={"Password..."}
                />
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
