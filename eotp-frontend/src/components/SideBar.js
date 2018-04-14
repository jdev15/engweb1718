import React from 'react';
import { slide as Menu } from 'react-burger-menu'
//css
import '../css/SideBar.css';

class SideBar extends React.Component {
  state = {
    menuOpen: false
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
    return(
      <div>
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
        >
        </Menu>
      </div>
    );
  }
}

export default SideBar;