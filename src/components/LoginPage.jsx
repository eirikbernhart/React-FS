import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
  

const urlUser = "http://localhost:1234/users";

class LoginPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: 'testuser',
            password: ''
        }

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.login = this.login.bind(this);
    }

    login(username) {
        fetch(urlUser, {
            headers: {
                'X-Token': localStorage.token,
            }
        })
        .then(res => {
            if(res.status === 200) {
                return res;
            }
        })
        .then(res => {
            console.log("Userinfo/Token: " + JSON.stringify(res));
            this.props.auth(true);
        })
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