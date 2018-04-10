import React, { Component } from 'react';
import ActiveFrame from './ActiveFrame.js';
import HeaderNotLogIn from './HeaderNotLogIn.js';

class PageIndice extends Component{

constructor(props){
  super(props);
  this.state = {
  }
}


	render(){
		return (
      <div>
			 <div className="header_topIndice">
            <HeaderNotLogIn/>
      </div>
      <div className="frameAtivos">
          <ActiveFrame isLoggedIn={this.props.loggedIn}/>
      </div>
      </div>
      );
	}


}


export default PageIndice;