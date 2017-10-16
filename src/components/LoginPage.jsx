import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
  



class LoginPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.login = this.login.bind(this);
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

    login() {
        this.props.loginUser();
    }


}


export default LoginPage;