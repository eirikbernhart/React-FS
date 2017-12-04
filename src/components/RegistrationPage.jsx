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
            formIsOk: false
        }

        this.registerUserRedux = this.registerUserRedux.bind(this); //REDUX
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

    }



    registerUser() {
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
        .then(res => res.text())
        .then(token => {
            localStorage.token = token
            console.log("Token from client: " + token);
            if(localStorage.token) {
                this.props.auth(true);
                this.props.history.push("/main");
            }
        });
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
        .then(res => res.text())
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

    


     render() {


        var passCheck;
        if(this.state.password.length < 4) {
            passCheck = ( 
                <p>Password must be atleast 4 characters long!</p>
            );
        } else {
            passCheck = (
                null
            )
        }



         return (
            <div>
                <div className="App-header">
                    <h2>Sign Up!</h2>
                </div>   
                <Form>
                    <FormGroup>
                        <Label for="userName">
                            <strong>Username</strong>
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
                            {passCheck}
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
                        //disabled={!this.state.formIsOk}
                        disabled={false}
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