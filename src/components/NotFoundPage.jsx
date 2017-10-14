import React, { Component } from 'react';
import catPic from '.././resources/img/404NotFound.jpeg';
import { Link } from 'react-router-dom'

  



class NotFoundPage extends Component {

    
     render() {
         return (
            <div>
                <Link to="/">Redirect back</Link>
                <img src= { catPic }/>                
            </div>
         )
    }


}


export default NotFoundPage;