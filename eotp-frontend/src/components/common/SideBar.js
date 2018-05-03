import React from 'react';
import SideBarLogedin from '../SideBarLogedin';
import SideBarLogedout from '../SideBarLogedout';
import { slide as Menu } from 'react-burger-menu'
//css
import '../../css/SideBar.css';

class SideBar extends React.Component {
  state = {
    menuOpen: false,
    isLoggedIn: false
  }

  changeLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
  }

  handleStateChange = (state) => {
    this.setState({menuOpen: state.isOpen})  
  }
  
  closeMenu = () => {
    this.setState({menuOpen: false})
  }

  toggleMenu = () => {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render() {
    if(this.state.isLoggedIn) {
      return(
        <div className='sb'>
        <Menu
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state)}
        >
        <SideBarLogedin />
        </Menu>
        </div>
        );
    }
    else {
      return(
        <div className='sb'>
        <Menu
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state)}
        >
        <SideBarLogedout changeLogin={()=>this.changeLogin()}/>
        </Menu>
        </div>
        );
    }
  }
}

export default SideBar;