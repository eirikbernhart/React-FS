import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { authenticateUser } from '../actions/auth';
import { connect } from 'react-redux';



const urlUser = "http://localhost:1234/users";
const jwt = require('jwt-simple');



export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.loginRedux = this.loginRedux.bind(this); //REDUX
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    
    loginRedux() {

        const secret = 'topsecret';

        const urlUserAuth = "http://localhost:1234/usersAuth";

        const body = {
            username: this.state.username,
            password: this.state.password
        }

        fetch(urlUserAuth, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if(res.status === 401) {
                console.log("NO SUCH USER FROM CLIENT!")
                window.alert(res.statusText);
                throw 0; 
            } else {
                console.log("USER FOUND, YEY!")
                return res.text()
            }
        })
        .then(token => {
            localStorage.token = token
            const user = jwt.decode(localStorage.token, secret)

            console.log("Token from client->login " + token)

            if(localStorage.token) {
                this.props.dispatch(authenticateUser({
                    username: user.username, 
                    authenticated: true
                }));
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
         return (
            <div>
                <div className="App-header">
                    <h2>Login</h2>
                </div>    
                <Form>
                    <FormGroup>
                        <Label for="userName"><strong>Username</strong></Label>
                        <Input 
                            type="username" 
                            name="username" 
                            id="userName" 
                            placeholder="Username..."
                            value={this.state.username}
                            onChange={this.handleUsername}  
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword"><strong>Password</strong></Label>
                        <Input 
                            type="password" 
                            name="password" 
                            id="examplePassword" 
                            placeholder="Password..."
                            value={this.state.password}  
                            onChange={this.handlePassword} 
                        />
                    </FormGroup>
                    <Button 
                        color="danger" 
                        onClick={this.loginRedux}>Log in
                    </Button>  
                </Form>
            </div>
         )
    }


    
}



export default connect()(LoginPage);