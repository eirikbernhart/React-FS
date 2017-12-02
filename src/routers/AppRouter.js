import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import LoginPage  from '../components/LoginPage';
import RegistrationPage from '../components/RegistrationPage';
import MainPage from '../components/MainPage';
import NotFoundPage from '../components/NotFoundPage';
import HeaderComponent from '../components/HeaderComponent';


const AppRouter = () => (
        <BrowserRouter>
            <div>
            <HeaderComponent />
                <Switch>
                    <Route path="/" component={LoginPage} exact={true} />
                    <Route path="/register" component={RegistrationPage} />
                    <Route path="/main" component={MainPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div> 
        </BrowserRouter>
);

export default AppRouter;