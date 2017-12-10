import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '.././styles/styles.scss';
import './HeaderComponent.css';


  
class HeaderComponent extends Component {
     render() { 

        var linkStyle = {
            margin: 5,
            backgroundColor: '#28292b',
            color: 'white',
            borderColor: 'green'
        }

         return (
            <div>
                <header style={{backgroundColor: "#eeeedf"}}>
                    <NavLink to="/" activeClassName="is-active" className="linkStyle" exact={true}>Login</NavLink>
                    <NavLink to="/register" activeClassName="is-active" className="linkStyle" exact={true}>Sign Up!</NavLink>
                    <NavLink to="/main" activeClassName="is-active" className="linkStyle" exact={true}>Main page</NavLink>
                    <NavLink to="/inspiration" activeClassName="is-active" className="linkStyle" exact={true}>Inspiration page</NavLink>
                    
                </header>              
            </div>
         )
    }
}


export default HeaderComponent;