import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


const testUser = {
  "username":"testuser",
  "passwordHash":"testpass"
}

class RegistrationPage extends Component {

    constructor(props) {
        super(props);

        this.registerUser = this.registerUser.bind(this);

    }



    registerUser() {

        const urlNewUser = "http://localhost:1234/users"

      fetch(urlNewUser, {
        method: "POST",
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }),
        body: JSON.stringify(testUser)
      })
      .then(res => res.text())
      .then(token => {
        localStorage.token = token
        console.log("Token from client: " + token);
        if(localStorage.token) {
            this.props.auth(true);
        }
      });
    }


     render() {
         return (
            <div>
                <header>
                <p><strong>SIGN UP</strong></p>
                <br></br>
                </header>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="example@mail.com" />
                    </FormGroup>
                    <FormGroup>
                    <Label for="userName">Email</Label>
                    <Input type="username" name="username" id="userName" placeholder="Username..." />
                </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password..." />
                    </FormGroup>
                    <Button 
                        color="danger"
                        onClick={this.registerUser}>
                        Submit   
                    </Button>          
                </Form>
            </div>
         )
    }


}


export default RegistrationPage;