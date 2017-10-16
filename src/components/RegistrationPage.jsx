import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';



class RegistrationPage extends Component {


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
                    <Button color="danger">Submit</Button>          
                </Form>
            </div>
         )
    }


}


export default RegistrationPage;