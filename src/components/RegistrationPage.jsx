import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { authenticateUser } from '../actions/auth';
import { connect } from 'react-redux';


const jwt = require('jwt-simple');

class RegistrationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passIsOk: false,
            usernameIsOk: false
        }

        this.registerUserRedux = this.registerUserRedux.bind(this); //REDUX
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.passValidator = this.passValidator.bind(this);
        this.usernameValidator = this.usernameValidator.bind(this);

    }

    registerUserRedux() {
        
            const secret = 'topsecret';
            const urlNewUser = "http://localhost:1234/users"
    
            const body = {
                    username: this.state.username,
                    password: this.state.password
            }
    
            fetch(urlNewUser, {
                method: "POST",
                headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json'
                }),
                body: JSON.stringify(body)
            })
            .then(res => {
                if(res.status === 401) { 
                    window.alert(res.statusText);
                    throw 0;
                } else {
                    return res.text()
                }
            })
            .then(token => {
                localStorage.token = token
                const user = jwt.decode(localStorage.token, secret)
                if(localStorage.token) {
                    this.props.dispatch(authenticateUser({userName: user.username, authenticated: true}));
                    this.props.history.push("/main");
                }
            });
        }
    handleUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    passValidator() {
        var passCheck;
        if(this.state.password.length < 4) {
            this.state.passIsOk = false;
            return passCheck = ( 
                <p>Password must be atleast 4 characters long!</p>
            );
        } 
        if(this.state.password.length >= 4) {
            this.state.passIsOk = true;
            return passCheck = (
                null
            ) 
        }
    }

    usernameValidator() {
        var usernameCheck;
        if(this.state.username.length < 4) {
            this.state.usernameIsOk = false;
            return usernameCheck = ( 
                <p>Username must be atleast 4 characters long!</p>
            );
        } 
        if(this.state.username.length >= 4) {
            this.state.usernameIsOk = true;
            return usernameCheck = (
                null
            ) 
        }
    }


    

     render() {

         return (
            <div>
                <div className="App-header">
                    <h2>Sign Up!</h2>
                </div>   
                <Form>
                    <FormGroup>
                        <Label for="userName">
                            <strong>Username</strong>
                            {this.usernameValidator()}
                        </Label>
                        <Input 
                            type="username" 
                            name="username" 
                            id="userName" 
                            placeholder="Username..." 
                            onChange={this.handleUsername} 
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="examplePassword">
                            <strong>Password</strong>
                            {this.passValidator()}
                        </Label>
                        <Input 
                            type="password" 
                            name="password" 
                            id="examplePassword" 
                            placeholder="Password..." 
                            onChange={this.handlePassword} 
                        />
                    </FormGroup>
                    <Button 
                        color="danger"
                        onClick={this.registerUserRedux} //REDUX
                        disabled={!this.state.passIsOk || !this.state.usernameIsOk}
                        //disabled={false}
                        >
                        Submit   
                    </Button>          
                </Form>
            </div>
         )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
};


export default connect(mapStateToProps)(RegistrationPage);