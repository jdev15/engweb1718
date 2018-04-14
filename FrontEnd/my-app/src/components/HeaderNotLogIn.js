import React, { Component } from 'react';
import { Link, WrappedLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './header.css'

class HeaderNotLogIn extends Component{

constructor(props){
  super(props);
  this.state = {
  }
}


	render(){
		return (
      <div id='headerIndice'>
			 <Link to='/Login'>
          <Button>
              <p>Login</p>
          </Button>
        </Link>
        <Link to='/SignIn'>
           <Button type="button">
             <p>Sign In</p>
           </Button>
        </Link>
      </div>
      );
	}


}


export default HeaderNotLogIn;