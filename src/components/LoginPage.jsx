import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
  



class LoginPage extends Component {


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
                        <Input type="username" name="username" id="userName" placeholder="username..." />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password..." />
                    </FormGroup>
                    <Button color="danger">Log in</Button>   
                    <Button color="danger">Sign up!</Button>          
                    
                </Form>
            </div>
         )
    }


}


export default LoginPage;