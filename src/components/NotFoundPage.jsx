import React, { Component } from 'react';
import catPic1 from '.././resources/img/404NotFound.jpeg';
import heartStone from '.././resources/img/heartstone.jpeg';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom'

  



class NotFoundPage extends Component {

    
     render() {
         return (
            <div>
                <div className="App-header">
                    <h2>Page not found!</h2>
                    <NavLink to="/" activeClassName="is-active" className="linkStyle" exact={true}>
                        <button><img src={heartStone}/></button>
                    </NavLink>
                    
                </div>
                <img src= { catPic1 }/>                
            </div>
         )
    }


}


export default NotFoundPage;