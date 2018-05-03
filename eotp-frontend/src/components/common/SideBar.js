import React from 'react';
import SideBarLogedout from '../SideBarLogedout';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
//css
import '../../css/SideBar.css';

class SideBar extends React.Component {
  state = {
    menuOpen: false,
    isLoggedIn: false,
  }

  isLoggedIn = () => {
    return this.state.isLoggedIn;
  }

  changeLoginState = () => {
    console.log(this.state.isLoggedIn);
    this.setState({
      isLoggedIn: true,
    })
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
        closeMenu={() => this.closeMenu()}
        >
        <div className="sbli">
          <Link to='/TabelaInicial'>
            <a onClick={() => this.closeMenu()}>Watchlist</a>
          </Link>
          <Link to='/TabelaInvestimento'>
            <a onClick={() => this.closeMenu()}>Portfolio</a>
          </Link>
          <Link to='/TabelaHistorico'>
            <a onClick={() => this.closeMenu()}>Histórico</a>
          </Link>
            <a>Gerir Perfil</a>
        </div>
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
        <SideBarLogedout changeLogin={()=>this.changeLoginState()}/>
        </Menu>
        </div>
        );
    }
  }
}

export default SideBar;