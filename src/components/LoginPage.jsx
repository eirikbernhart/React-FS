import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
  

const urlUser = "http://localhost:1234/users";

class LoginPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: 'testuser',
            password: 'testpass'
        }

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.login = this.login.bind(this);
    }

    
    login() {

        const urlUserAuth = "http://localhost:1234/usersAuth";

        const body = {
            username: this.state.username,
            password: this.state.password
        }

        fetch(urlUserAuth, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(body)
        })
        .then(res => res.text())
        .then(token => {
            localStorage.token = token

            console.log("Token from client->login " + token)

            if(localStorage.token) {
                this.props.auth(true);
            }
        });
    }




     render() {
         return (
            <div>
                <header>
                    <p><strong>LOGIN</strong></p>
                    <br></br>
                </header>
                <Form>
                    <FormGroup>
                        <Label for="userName">Username</Label>
                        <Input 
                            type="username" 
                            name="username" 
                            id="userName" 
                            placeholder="username..."
                            value={this.state.username}
                            onChange={this.handleUsername}  
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input 
                            type="password" 
                            name="password" 
                            id="examplePassword" 
                            placeholder="password..."
                            value={this.state.password}  
                            onChange={this.handlePassword} 
                        />
                    </FormGroup>
                    <Button 
                        color="danger" 
                        onClick={this.login}>Log in
                    </Button>  
                </Form>
            </div>
         )
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

    


}


export default LoginPage;