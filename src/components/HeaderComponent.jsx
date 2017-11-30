import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '.././styles/styles.scss';

  



class HeaderComponent extends Component {

    
     render() {
         return (
            <div>
                <header style={{backgroundColor: "white"}}>
                    <NavLink to="/" activeClassName="is-active" exact={true}>Login-page</NavLink>
                    <NavLink to="/register" activeClassName="is-active" exact={true}>Register-page</NavLink>
                    <NavLink to="/main" activeClassName="is-active" exact={true}>Main-page</NavLink>
                </header>              
            </div>
         )
    }


}


export default HeaderComponent;