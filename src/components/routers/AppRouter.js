import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

//PAGES
import LoginPage from '.././LoginPage';
import RegistrationPage from '.././RegistrationPage';
import MainPage from '.././MainPage';
import NotFoundPage from '.././NotFoundPage';

//COMPONENTS
import HeaderComponent from '.././HeaderComponent';

class AppRouter extends Component {
    render() {
        return (
                    <BrowserRouter>
                        <div>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" component = { LoginPage } exact = { true }/>
                            <Route path="/register" component = { RegistrationPage } exact = { true }/>   
                            <Route path="/main" component = { MainPage } exact = { true }/> 
                            <Route component = { NotFoundPage }/>                
                        </Switch>
                        </div>
                    </BrowserRouter>     
                )
    }
        
    
};

export default AppRouter;


